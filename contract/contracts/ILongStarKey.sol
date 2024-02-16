// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ILongStarKey {
    // =============================================================
    //                            ERROR
    // =============================================================

    error InvalidMaxSupply(uint256 newMaxSupply, uint256 currentMaxSupply);

    error NotSharesSubjectOwner(address caller, address sharesSubject);

    error MaxSupplyExceeded(
        uint256 tokenId,
        uint256 requestedAmount,
        uint256 maxSupply
    );

    error NonTokenOwner(address caller, uint256 tokenId);

    // =============================================================
    //                            EVENTS
    // =============================================================

    event MaxSupplyUpdated(address indexed updater, uint256 newMaxSupply);

    event BaseURISet(string baseURI);

    // =============================================================
    //                         EXTERNAL WRTIE
    // =============================================================

    function setBaseURI(string memory newUri) external;

    function setTokenURI(string memory newUri, uint256 _tokenId) external;

    function updateMaxSupply(uint256 newMaxSupply) external;

    function mint(
        address sharesSubject,
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function grantMintRole(address to) external;

    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) external;

    // =============================================================
    //                         EXTERNAL VIEW
    // =============================================================

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
