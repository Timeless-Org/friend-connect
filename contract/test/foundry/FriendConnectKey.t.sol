// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import { FriendConnectKey } from "../../contracts/FriendConnectKey.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract FriendConnectKeyTest is Test {
    FriendConnectKey friendConnectKey;
    address admin = address(1);
    address user = address(2);
    address other = address(3);
    address nonOwner = address(4);
    address sharesSubject = address(5);

    function setUp() public {
        vm.prank(admin);
        friendConnectKey = new FriendConnectKey("baseURI");

        vm.prank(admin);
        friendConnectKey.grantMintRole(user);
        vm.prank(admin);
        friendConnectKey.grantMintRole(sharesSubject);
        vm.prank(admin);
        friendConnectKey.grantMintRole(other);

        vm.prank(user);
        friendConnectKey.mint(user, user, 1, 1, "");
        assertEq(friendConnectKey.balanceOf(user, 1), 1);
        assertEq(friendConnectKey.keyOwners(user), 1);

        vm.prank(sharesSubject);
        friendConnectKey.mint(sharesSubject, sharesSubject, 2, 1, "");
        assertEq(friendConnectKey.balanceOf(sharesSubject, 2), 1);
        assertEq(friendConnectKey.keyOwners(sharesSubject), 2);
    }

    // Fail: AccessControlUnauthorizedAccount
    function testMintAccessControlUnauthorizedFail() public {
        vm.expectRevert(abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, nonOwner, friendConnectKey.MINTER_ROLE()));
        vm.prank(nonOwner);
        friendConnectKey.mint(sharesSubject, nonOwner, 1, 1, "");
    }

    // Fail: Not SharesSubjectOwner
    function testMintNotOwnerFail() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(FriendConnectKey.NotSharesSubjectOwner.selector, user, other));
        friendConnectKey.mint(other, user, 3, 1, "");
    }

    // Success mint
    function testMintSuccess() public {
        vm.prank(user);
        friendConnectKey.mint(sharesSubject, user, 2, 1, "");
        assertEq(friendConnectKey.balanceOf(user, 2), 1);
    }

    // Success setBaseUri
    function testSetBaseURISuccess() public {
        vm.prank(admin);
        friendConnectKey.setBaseURI("newURI");
        console.log("newURI %s", friendConnectKey.baseUri());
        assertEq(friendConnectKey.baseUri(), "newURI");
    }

    // Fail setBaseUri
    function testSetBaseURINotAdminFail() public {
        vm.expectRevert(abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, nonOwner, friendConnectKey.DEFAULT_ADMIN_ROLE()));
        vm.prank(nonOwner);
        friendConnectKey.setBaseURI("newURI");
    }

    // Success setTokenURI
    function testSetTokenURISuccess() public {
        vm.prank(user);
        string memory newTokenURI = "http://example.com/1.json";
        friendConnectKey.setTokenURI(newTokenURI, 1);
        assertEq(friendConnectKey.tokenURI(1), newTokenURI);
    }

    // Fail setBaseUri
    function testSetTokenURINotAdminFail() public {
        vm.prank(nonOwner);
        string memory newTokenURI = "http://example.com/nonOwner.json";
        vm.expectRevert(abi.encodeWithSelector(FriendConnectKey.NonTokenOwner.selector, nonOwner, 1));
        friendConnectKey.setTokenURI(newTokenURI, 1);
    }

    // Success: updateMaxSupply
    function testUpdateMaxSupplySuccess() public {
        vm.prank(admin);
        friendConnectKey.updateMaxSupply(20000);
        assertEq(friendConnectKey.maxSupply(), 20000);
    }

    // Fail: updateMaxSupply
    function testUpdateMaxSupplyNotAdminFail() public {
        vm.expectRevert(abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, nonOwner, friendConnectKey.DEFAULT_ADMIN_ROLE()));
        vm.prank(nonOwner);
        friendConnectKey.updateMaxSupply(20000);
    }

    // Success: SetTokenRoyalty
    function testSetTokenRoyaltySuccess() public {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 2000; // 1%

        vm.prank(user);
        friendConnectKey.setTokenRoyalty(tokenId, user, royaltyFraction);

        (address royaltyReceiver, uint256 royaltyAmount) = friendConnectKey
            .royaltyInfo(tokenId, 10000);
        assertEq(royaltyReceiver, user);
        assertEq(royaltyAmount, 2000); // 1%
    }

    // Fail: SetTokenRoyalty
    function testSetTokenRoyaltyNotAdminFail() public {
        uint256 tokenId = 2;
        uint96 royaltyFraction = 2000; // 1%

        vm.expectRevert(abi.encodeWithSelector(FriendConnectKey.NonTokenOwner.selector, user, tokenId));

        vm.prank(user);
        friendConnectKey.setTokenRoyalty(tokenId, user, royaltyFraction);
    }

    // Fail: ERC2981InvalidTokenRoyalty
    function testSetTokenRoyaltyERC2981InvalidTokenRoyaltyFail() public {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 20000; // 10%

        vm.expectRevert(abi.encodeWithSelector(ERC2981.ERC2981InvalidTokenRoyalty.selector, tokenId, royaltyFraction, 10000));

        vm.prank(user);
        friendConnectKey.setTokenRoyalty(tokenId, user, royaltyFraction);
    }

    // Fail: ERC2981InvalidDefaultRoyaltyReceiver
    function testSetTokenRoyaltyERC2981InvalidDefaultRoyaltyReceiverFail() public {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 2000; // 1%

        vm.expectRevert(abi.encodeWithSelector(ERC2981.ERC2981InvalidTokenRoyaltyReceiver.selector, tokenId, address(0)));

        vm.prank(user);
        friendConnectKey.setTokenRoyalty(tokenId, address(0), royaltyFraction);
    }
}
