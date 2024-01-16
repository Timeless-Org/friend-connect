// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "forge-std/console.sol";

contract FriendConnectKey is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply, ERC1155URIStorage, ERC2981, AccessControl {
    using Strings for uint256;

    // =============================================================
    //                           STORAGE
    // =============================================================

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public maxSupply;

    uint256 private _tokenIdCounter;

    string public baseUri;

    // SharesSubject => tokenId
    mapping(address => uint256) public keyOwners;

    // =============================================================
    //                            ERROR
    // =============================================================

    error InvalidMaxSupply(uint256 newMaxSupply, uint256 currentMaxSupply);

    error NotSharesSubjectOwner(address caller, address sharesSubject);

    error MaxSupplyExceeded(uint256 tokenId, uint256 requestedAmount, uint256 maxSupply);

    error NonTokenOwner(address caller, uint256 tokenId);

    // =============================================================
    //                            EVENTS
    // =============================================================

    event MaxSupplyUpdated(address indexed updater, uint256 newMaxSupply);

    event BaseURISet(string baseURI);

    // =============================================================
    //                            MODIFIER
    // =============================================================

    modifier tokenOwner(uint256 tokenId) {
        if (_tokenIdCounter <= tokenId || keyOwners[msg.sender] != tokenId) {
            revert NonTokenOwner(msg.sender, tokenId);
        }
        _;
    }

    // =============================================================
    //                          CONSTRUCTOR
    // =============================================================

    constructor(string memory _baseURI) ERC1155(_baseURI) Ownable(msg.sender) {
        maxSupply = 16000;
        baseUri = _baseURI;
        unchecked {
            _tokenIdCounter += 1;
        }
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // =============================================================
    //                         EXTERNAL WRTIE
    // =============================================================

    /// @notice Set the new base URI for the token.
    /// @dev Only the DEFAULT_ADMIN_ROLE can update the URI.
    /// @param newUri The new URI.
    function setBaseURI(string memory newUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        baseUri = newUri;
        emit BaseURISet(newUri);
    }

    /// @notice Set the new URI for the token.
    /// @dev Only the token owner can update the URI.
    /// @param newUri The new URI.
    /// @param _tokenId The token id to update.
    function setTokenURI(string memory newUri, uint256 _tokenId) external tokenOwner(_tokenId) {
        _setURI(_tokenId, newUri);
    }

    /// @notice Update the max supply of the token.
    /// @dev Only the DEFAULT_ADMIN_ROLE can update the max supply.
    /// @param newMaxSupply The new max supply.
    function updateMaxSupply(uint256 newMaxSupply) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newMaxSupply == 0 || maxSupply >= newMaxSupply) {
            revert InvalidMaxSupply(newMaxSupply, maxSupply);
        }
        maxSupply = newMaxSupply;
        emit MaxSupplyUpdated(msg.sender, newMaxSupply);
    }

    /// @notice Mints a new token.
    /// @dev Only the minter can mint.
    /// @param sharesSubject The address of the shares' subject.
    /// @param account The address of the minter.
    /// @param id The token id to mint.
    /// @param amount The amount of tokens to mint.
    /// @param data Any extra data to include in the transfer.
    function mint(address sharesSubject, address account, uint256 id, uint256 amount, bytes memory data)
        external
        onlyRole(MINTER_ROLE)
    {
        uint256 keyOwnerTokenId = keyOwners[sharesSubject];
        if (keyOwnerTokenId == 0) {
            if (sharesSubject != account) {
                revert NotSharesSubjectOwner(account, sharesSubject);
            }
            uint256 currentTokenId = _tokenIdCounter;
            keyOwners[sharesSubject] = currentTokenId;
            unchecked {
                _tokenIdCounter += 1;
            }
            _setURI(currentTokenId, string.concat(baseUri, currentTokenId.toString(), ".json"));
            _mint(account, currentTokenId, 1, data);
        } else {
            if (totalSupply(id) + amount > maxSupply) {
                revert MaxSupplyExceeded(id, amount, maxSupply);
            }
            _mint(account, id, amount, data);
        }
    }

    function grantMintRole(address to) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, to);
    }

    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) public tokenOwner(tokenId) {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    // =============================================================
    //                          INTERNAL WRITE
    // =============================================================

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    // =============================================================
    //                         EXTERNAL VIEW
    // =============================================================

    function tokenURI(uint256 tokenId) public view virtual returns (string memory) {
        return uri(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, ERC2981, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function uri(uint256 tokenId) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }
}
