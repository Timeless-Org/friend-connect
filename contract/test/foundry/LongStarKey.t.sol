// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {LongStarKey} from "../../contracts/LongStarKey.sol";
import {ILongStarKey} from "../../contracts/ILongStarKey.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract LongStarKeyTest is Test {
    LongStarKey longStarKey;
    address admin = address(1);
    address user = address(2);
    address other = address(3);
    address nonOwner = address(4);
    address sharesSubject = address(5);
    string baseURI = "https://api.friendconnect.io/v1/";

    function setUp() public {
        vm.startPrank(admin);
        longStarKey = new LongStarKey(baseURI);

        longStarKey.grantMintRole(user);
        longStarKey.grantMintRole(sharesSubject);
        longStarKey.grantMintRole(other);

        vm.stopPrank();

        vm.prank(user);
        longStarKey.mint(user, user, 1, 1, "");
        assertEq(longStarKey.balanceOf(user, 1), 1);
        assertEq(longStarKey.keyOwners(user), 1);

        vm.prank(sharesSubject);
        longStarKey.mint(sharesSubject, sharesSubject, 2, 1, "");
        assertEq(longStarKey.balanceOf(sharesSubject, 2), 1);
        assertEq(longStarKey.keyOwners(sharesSubject), 2);
    }

    // Fail: AccessControlUnauthorizedAccount
    function testMintAccessControlUnauthorizedFail() public {
        vm.expectRevert(
            abi.encodeWithSelector(
                IAccessControl.AccessControlUnauthorizedAccount.selector,
                nonOwner,
                longStarKey.MINTER_ROLE()
            )
        );
        vm.prank(nonOwner);
        longStarKey.mint(sharesSubject, nonOwner, 1, 1, "");
    }

    // Fail: Not SharesSubjectOwner
    function testMintNotOwnerFail() public {
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarKey.NotSharesSubjectOwner.selector,
                user,
                other
            )
        );
        longStarKey.mint(other, user, 3, 1, "");
    }

    // Success mint
    function testMintSuccess() public {
        vm.prank(user);
        longStarKey.mint(sharesSubject, user, 2, 1, "");
        assertEq(longStarKey.balanceOf(user, 2), 1);
    }

    // Success setBaseUri
    function testSetBaseURISuccess() public {
        vm.prank(admin);
        longStarKey.setBaseURI("newURI");
        console.log("newURI %s", longStarKey.baseUri());
        assertEq(longStarKey.baseUri(), "newURI");
    }

    // Fail setBaseUri
    function testSetBaseURINotAdminFail() public {
        vm.expectRevert(
            abi.encodeWithSelector(
                IAccessControl.AccessControlUnauthorizedAccount.selector,
                nonOwner,
                longStarKey.DEFAULT_ADMIN_ROLE()
            )
        );
        vm.prank(nonOwner);
        longStarKey.setBaseURI("newURI");
    }

    // Success setTokenURI
    function testSetTokenURISuccess() public {
        vm.prank(user);
        string memory newTokenURI = "http://example.com/1.json";
        longStarKey.setTokenURI(newTokenURI, 1);
        assertEq(longStarKey.tokenURI(1), newTokenURI);
    }

    // Fail setBaseUri
    function testSetTokenURINotAdminFail() public {
        vm.prank(nonOwner);
        string memory newTokenURI = "http://example.com/nonOwner.json";
        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarKey.NonTokenOwner.selector,
                nonOwner,
                1
            )
        );
        longStarKey.setTokenURI(newTokenURI, 1);
    }

    // Success: updateMaxSupply
    function testUpdateMaxSupplySuccess() public {
        vm.prank(admin);
        longStarKey.updateMaxSupply(20000);
        assertEq(longStarKey.maxSupply(), 20000);
    }

    // Fail: updateMaxSupply
    function testUpdateMaxSupplyNotAdminFail() public {
        vm.expectRevert(
            abi.encodeWithSelector(
                IAccessControl.AccessControlUnauthorizedAccount.selector,
                nonOwner,
                longStarKey.DEFAULT_ADMIN_ROLE()
            )
        );
        vm.prank(nonOwner);
        longStarKey.updateMaxSupply(20000);
    }

    // Success: SetTokenRoyalty
    function testSetTokenRoyaltySuccess() public {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 2000; // 1%

        vm.prank(user);
        longStarKey.setTokenRoyalty(tokenId, user, royaltyFraction);

        (address royaltyReceiver, uint256 royaltyAmount) = longStarKey
            .royaltyInfo(tokenId, 10000);
        assertEq(royaltyReceiver, user);
        assertEq(royaltyAmount, 2000); // 1%
    }

    // Fail: SetTokenRoyalty
    function testSetTokenRoyaltyNotAdminFail() public {
        uint256 tokenId = 2;
        uint96 royaltyFraction = 2000; // 1%

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarKey.NonTokenOwner.selector,
                user,
                tokenId
            )
        );

        vm.prank(user);
        longStarKey.setTokenRoyalty(tokenId, user, royaltyFraction);
    }

    // Fail: ERC2981InvalidTokenRoyalty
    function testSetTokenRoyaltyERC2981InvalidTokenRoyaltyFail() public {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 20000; // 10%

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC2981.ERC2981InvalidTokenRoyalty.selector,
                tokenId,
                royaltyFraction,
                10000
            )
        );

        vm.prank(user);
        longStarKey.setTokenRoyalty(tokenId, user, royaltyFraction);
    }

    // Fail: ERC2981InvalidDefaultRoyaltyReceiver
    function testSetTokenRoyaltyERC2981InvalidDefaultRoyaltyReceiverFail()
        public
    {
        uint256 tokenId = 1;
        uint96 royaltyFraction = 2000; // 1%

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC2981.ERC2981InvalidTokenRoyaltyReceiver.selector,
                tokenId,
                address(0)
            )
        );

        vm.prank(user);
        longStarKey.setTokenRoyalty(tokenId, address(0), royaltyFraction);
    }
}
