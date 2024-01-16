// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "solady/src/utils/SafeTransferLib.sol";
import "../interfaces/IFriendConnectShareV1.sol";
import "../FriendConnectKey.sol";
import "forge-std/console.sol";

contract FriendConnectShareV1Mock is IFriendConnectShareV1, Ownable {
    // =============================================================
    //                           STORAGE
    // =============================================================

    using SafeTransferLib for address;

    FriendConnectKey public keyNft;

    address public protocolFeeDestination;
    uint256 public protocolFeePercent;
    uint256 public subjectFeePercent;

    // SharesSubject => (Holder => Balance)
    mapping(address => mapping(address => uint256)) public sharesBalance;

    // SharesSubject => Supply
    mapping(address => uint256) public sharesSupply;

    // =============================================================
    //                          CONSTRUCTOR
    // =============================================================

    constructor(address keyNftAddress) Ownable(msg.sender) {
        keyNft = FriendConnectKey(keyNftAddress);
        protocolFeeDestination = msg.sender;
        protocolFeePercent = (1 ether * 5) / 100;
        subjectFeePercent = (1 ether * 5) / 100;
    }

    // =============================================================
    //                         EXTERNAL WRTIE
    // =============================================================

    /// @notice update protocol fee destination.
    /// @dev Only the owner can update the protocol fee destination.
    /// @param _feeDestination The new protocol fee destination.
    function setFeeDestination(address _feeDestination) public onlyOwner {
        protocolFeeDestination = _feeDestination;
    }

    /// @notice update protocol fee percent.
    /// @dev Only the owner can update the protocol fee percent.
    /// @param _feePercent The new protocol fee percent.
    function setProtocolFeePercent(uint16 _feePercent) public onlyOwner {
        protocolFeePercent = _feePercent;
    }

    /// @notice update subject fee percent.
    /// @dev Only the owner can update the subject fee percent.
    /// @param _feePercent The new subject fee percent.
    function setSubjectFeePercent(uint16 _feePercent) public onlyOwner {
        subjectFeePercent = _feePercent;
    }

    /// @notice Buy Key NFT shares.
    /// @dev Only one initial Key NFT Mint can be executed.
    /// @param sharesSubject Subject address of the Key NFT you wish to buy.
    /// @param amount The amount of tokens to buy.
    function buyShares(address sharesSubject, uint256 amount) public payable {
        uint256 tokenId = keyNft.keyOwners(sharesSubject);
        uint256 supply = keyNft.totalSupply(tokenId);
        if (tokenId == 0 && sharesSubject != msg.sender) {
            revert NotAuthorizedToBuyFirstShare(msg.sender, sharesSubject);
        }
        uint256 price = getPrice(supply, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        if (msg.value < price + protocolFee + subjectFee) {
            revert PaymentInsufficient(
                msg.value,
                price + protocolFee + subjectFee
            );
        }
        sharesBalance[sharesSubject][msg.sender] =
            sharesBalance[sharesSubject][msg.sender] +
            amount;
        sharesSupply[sharesSubject] = supply + amount;
        keyNft.mint(sharesSubject, msg.sender, tokenId, amount, "");
        emit Trade(
            sharesSubject,
            msg.sender,
            true,
            amount,
            price,
            protocolFee,
            subjectFee,
            supply + amount
        );

        if (subjectFee > 0)
            SafeTransferLib.safeTransferETH(sharesSubject, subjectFee);
        if (protocolFee > 0)
            SafeTransferLib.safeTransferETH(
                protocolFeeDestination,
                protocolFee
            );
    }

    /// @notice Sell Key NFT shares.
    /// @param sharesSubject Subject address of the Key NFT you wish to sell.
    /// @param amount The amount of tokens to sell.
    function sellShares(address sharesSubject, uint256 amount) public payable {
        uint256 tokenId = keyNft.keyOwners(sharesSubject);
        if (tokenId == 0) {
            revert SubjectDoesNotExist(tokenId);
        }
        uint256 supply = keyNft.totalSupply(tokenId);
        if (supply <= amount) {
            revert CannotSellLastShare(amount, supply);
        }
        uint256 price = getPrice(supply - amount, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        if (sharesBalance[sharesSubject][msg.sender] < amount) {
            revert InsufficientShares(msg.sender, amount);
        }
        sharesBalance[sharesSubject][msg.sender] =
            sharesBalance[sharesSubject][msg.sender] -
            amount;
        sharesSupply[sharesSubject] = supply - amount;
        keyNft.burn(msg.sender, tokenId, amount);
        emit Trade(
            msg.sender,
            sharesSubject,
            false,
            amount,
            price,
            protocolFee,
            subjectFee,
            supply - amount
        );

        SafeTransferLib.safeTransferETH(
            msg.sender,
            price - protocolFee - subjectFee
        );
        SafeTransferLib.safeTransferETH(protocolFeeDestination, protocolFee);
        SafeTransferLib.safeTransferETH(sharesSubject, subjectFee);
    }

    // =============================================================
    //                         EXTERNAL VIEW
    // =============================================================

    /// @notice Get the price of the Key NFT you want to buy or sell.
    /// @param supply The current supply of the token.
    /// @param amount The amount of tokens to buy or sell.
    /// @return The price of the Key NFT you want to buy or sell.
    function getPrice(
        uint256 supply,
        uint256 amount
    ) public pure returns (uint256) {
        uint256 sum1 = supply == 0
            ? 0
            : ((supply - 1) * (supply) * (2 * (supply - 1) + 1)) / 6;
        uint256 sum2 = supply == 0 && amount == 1
            ? 0
            : ((supply - 1 + amount) *
                (supply + amount) *
                (2 * (supply - 1 + amount) + 1)) / 6;
        uint256 summation = sum2 - sum1;
        return (summation * 1 ether) / 16000;
    }

    /// @notice Get the price of the Key NFT you want to buy.
    /// @param sharesSubject Subject address of the Key NFT you wish to buy.
    /// @param amount The amount of tokens to buy.
    /// @return The price of the Key NFT you want to buy.
    function getBuyPrice(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        return getPrice(sharesSupply[sharesSubject], amount);
    }

    /// @notice Get the price of the Key NFT you want to sell.
    /// @param sharesSubject Subject address of the Key NFT you wish to sell.
    /// @param amount The amount of tokens to sell.
    /// @return The price of the Key NFT you want to sell.
    function getSellPrice(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        return getPrice(sharesSupply[sharesSubject] - amount, amount);
    }

    /// @notice get the price of the Key NFT you want to buy sell after fee.
    /// @param sharesSubject Subject address of the Key NFT you wish to buy.
    /// @param amount The amount of tokens to buy.
    /// @return Price after Key NFT fees are added.
    function getBuyPriceAfterFee(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        uint256 price = getBuyPrice(sharesSubject, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        return price + protocolFee + subjectFee;
    }

    /// @notice get the price of the Key NFT you want to sell after fee.
    /// @param sharesSubject Subject address of the Key NFT you wish to sell.
    /// @param amount The amount of tokens to sell.
    /// @return Key NFT prices after fee deductions.
    function getSellPriceAfterFee(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        uint256 price = getSellPrice(sharesSubject, amount);
        uint256 protocolFee = (price * protocolFeePercent) / 1 ether;
        uint256 subjectFee = (price * subjectFeePercent) / 1 ether;
        return price - protocolFee - subjectFee;
    }

    fallback() external payable {}

    receive() external payable {}
}
