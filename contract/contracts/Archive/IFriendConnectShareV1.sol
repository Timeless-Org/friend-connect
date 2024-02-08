// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IFriendConnectShareV1 {

    // =============================================================
    //                            ERROR
    // =============================================================

    error NotAuthorizedToBuyFirstShare(address caller, address sharesSubject);

    error PaymentInsufficient(uint256 sent, uint256 required);

    error SubjectDoesNotExist(uint256 tokenId);

    error CannotSellLastShare(uint256 amount, uint256 supply);

    error InsufficientShares(address holder, uint256 amount);

    // =============================================================
    //                           STORAGE
    // =============================================================

    struct EditionInitialization {
        address keyNft;
        uint256 protocolFeePercent;
        uint256 subjectFeePercent;
    }

    // =============================================================
    //                         EXTERNAL WRTIE
    // =============================================================

    function setFeeDestination(address _feeDestination) external;

    function setProtocolFeePercent(uint16 _feePercent) external;

    function setSubjectFeePercent(uint16 _feePercent) external;

    function buyShares(address sharesSubject, uint256 amount) external payable;

    function sellShares(address sharesSubject, uint256 amount) external payable;

    // =============================================================
    //                         EXTERNAL VIEW
    // =============================================================

    function getPrice(uint256 supply, uint256 amount) external view returns (uint256);

    function getBuyPrice(address sharesSubject, uint256 amount) external view returns (uint256);

    function getSellPrice(address sharesSubject, uint256 amount) external view returns (uint256);

    function getBuyPriceAfterFee(address sharesSubject, uint256 amount) external view returns (uint256);

    function getSellPriceAfterFee(address sharesSubject, uint256 amount) external view returns (uint256);

    function sharesBalance(address, address) external view returns (uint256);

    function sharesSupply(address) external view returns (uint256);

    // =============================================================
    //                            EVENTS
    // =============================================================

    event Trade(
        address indexed trader,
        address indexed subject,
        bool isBuy,
        uint256 shareAmount,
        uint256 ethAmount,
        uint256 protocolEthAmount,
        uint256 subjectEthAmount,
        uint256 supply
    );
}
