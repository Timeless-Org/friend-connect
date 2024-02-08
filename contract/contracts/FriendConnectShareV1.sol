// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { SafeTransferLib } from "solady/src/utils/SafeTransferLib.sol";
import { IFriendConnectShareV1 } from "./IFriendConnectShareV1.sol";
import { FriendConnectKey } from "./FriendConnectKey.sol";
import { IBlast } from "./IBlast.sol";

contract FriendConnectShareV1 is IFriendConnectShareV1, Initializable, OwnableUpgradeable {
    // =============================================================
    //                           STORAGE
    // =============================================================

    using SafeTransferLib for address;

    FriendConnectKey public keyNft;

    // SharesSubject => (Holder => Balance)
    mapping(address => mapping(address => uint256)) public sharesBalance;

    // SharesSubject => Supply
    mapping(address => uint256) public sharesSupply;

    mapping(address => uint256) public claimableAmount;

    // =============================================================
    //                          INITIALIZER
    // =============================================================

    function initialize(EditionInitialization memory init) public initializer {
        __Ownable_init(msg.sender); // Ownableの初期化

        keyNft = FriendConnectKey(init.keyNft);
        IBlast(0x4300000000000000000000000000000000000002).configureAutomaticYield();
    }

    // =============================================================
    //                         EXTERNAL WRTIE
    // =============================================================

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
        if (msg.value < price) {
            revert PaymentInsufficient(
                msg.value,
                price
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
            supply + amount
        );
    }

    /// @notice Sell Key NFT shares.
    /// @param sharesSubject Subject address of the Key NFT you wish to sell.
    /// @param amount The amount of tokens to sell.
    function sellShares(address sharesSubject, uint256 amount) public payable {
        keyNft.setApprovalForAll(address(this), true);
        uint256 tokenId = keyNft.keyOwners(sharesSubject);
        if (tokenId == 0) {
            revert SubjectDoesNotExist(tokenId);
        }
        uint256 supply = keyNft.totalSupply(tokenId);
        if (supply <= amount) {
            revert CannotSellLastShare(amount, supply);
        }
        uint256 price = getPrice(supply - amount, amount);
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
            supply - amount
        );
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

    fallback() external payable {}

    receive() external payable {}
}
