// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import { FriendConnectShareV1Mock } from "../../contracts/Mock/FriendConnectShareV1.sol";
import "../../contracts/FriendConnectKey.sol";
import "../../contracts/interfaces/IFriendConnectShareV1.sol";

contract FriendConnectShareV1Test is Test {
    FriendConnectShareV1Mock friendConnectShare;
    FriendConnectKey friendConnectKey;

    address admin = address(1);
    address user = address(2);
    address sharesSubject = address(3);
    address nonOwner = address(4);
    address other = address(5);

    function setUp() public {
        vm.prank(admin);
        friendConnectKey = new FriendConnectKey("baseURI");
        vm.prank(admin);
        friendConnectShare = new FriendConnectShareV1Mock(address(friendConnectKey));

        vm.prank(admin);
        friendConnectKey.grantMintRole(address(friendConnectShare));

        vm.deal(address(friendConnectShare), 100 ether);
        vm.deal(user, 10 ether);
        vm.deal(sharesSubject, 10 ether);

        vm.prank(user);
        friendConnectShare.buyShares{value: 1 ether}(user, 1);

        vm.prank(sharesSubject);
        friendConnectShare.buyShares{value: 1 ether}(sharesSubject, 1);
    }

    // Success: first buyShares
    function testFirstBuySharesSuccess() public {
        uint256 amount = 1;
        uint256 supply = friendConnectKey.totalSupply(3);
        uint256 price = friendConnectShare.getBuyPriceAfterFee(admin, amount);

        hoax(admin, price);
        friendConnectShare.buyShares{value: price}(admin, amount);

        assertEq(friendConnectKey.balanceOf(admin, 3), amount);
        assertEq(friendConnectShare.sharesSupply(admin), supply + amount);
    }

    // Fail: first buyShares
    function testFirstBuySharesFail() public {
        vm.prank(other);
        uint256 amount = 1;
        uint256 price = friendConnectShare.getBuyPriceAfterFee(nonOwner, amount);

        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.NotAuthorizedToBuyFirstShare.selector, other, nonOwner));
        hoax(other, price);
        friendConnectShare.buyShares{value: price}(nonOwner, amount);
    }

    // Success: buyShares
    function testBuySharesSuccess() public {
        uint256 amount = 2;
        uint256 supply = friendConnectShare.sharesSupply(sharesSubject);
        uint256 userSupply = friendConnectShare.sharesBalance(sharesSubject, other);
        uint256 price = friendConnectShare.getBuyPriceAfterFee(sharesSubject, amount);
        uint256 tokenId = friendConnectKey.keyOwners(sharesSubject);
        uint256 afterSharesSubjectBalance = friendConnectShare.getPrice(supply, amount) * friendConnectShare.subjectFeePercent() / 1 ether + sharesSubject.balance;

        hoax(other, price);
        friendConnectShare.buyShares{value: price}(sharesSubject, amount);

        assertEq(friendConnectKey.balanceOf(other, tokenId), userSupply + amount);
        assertEq(friendConnectShare.sharesSupply(sharesSubject), supply + amount);
        assertEq(sharesSubject.balance, afterSharesSubjectBalance);
    }

    // Fail: buyShares with insufficient payment
    function testBuySharesInsufficientPaymentFail() public {
        uint256 amount = 10;
        uint256 price = friendConnectShare.getBuyPriceAfterFee(sharesSubject, amount);
        uint256 sendPrice = price / 2;

        hoax(other, price);
        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.PaymentInsufficient.selector, sendPrice, price));
        friendConnectShare.buyShares{value: sendPrice}(sharesSubject, amount);

    }

    // Success: sellShares
    function testSellSharesSuccess() public {
        uint256 amount = 10;
        uint256 sellAmount = 5;
        uint256 supply = friendConnectShare.sharesSupply(sharesSubject);
        uint256 price = friendConnectShare.getBuyPriceAfterFee(sharesSubject, amount);
        uint256 tokenId = friendConnectKey.keyOwners(sharesSubject);

        hoax(other, price);
        friendConnectShare.buyShares{value: price}(sharesSubject, amount);

        uint256 afterPrice = friendConnectShare.getSellPriceAfterFee(sharesSubject, sellAmount);

        vm.prank(other);
        friendConnectKey.setApprovalForAll(address(friendConnectShare), true);
        vm.prank(other);
        friendConnectShare.sellShares(sharesSubject, sellAmount);
        assertEq(friendConnectKey.balanceOf(other, tokenId), 5);
        assertEq(friendConnectShare.sharesSupply(sharesSubject), supply + amount - sellAmount);

        assertEq(other.balance, afterPrice);
    }

    // Fail: sellShares more than owned
    function testSellSharesMoreThanOwnedFail() public {
        uint256 amount = 10;
        uint256 supply = friendConnectShare.sharesSupply(sharesSubject);

        vm.prank(other);
        friendConnectKey.setApprovalForAll(address(friendConnectShare), true);
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.CannotSellLastShare.selector, amount, supply));
        friendConnectShare.sellShares(sharesSubject, amount);
    }

    // Fail: sellShares does not exist
    function testSellSharesDoesNotExistFail() public {
        uint256 amount = 10;
        uint256 tokenId = friendConnectKey.keyOwners(nonOwner);

        vm.prank(other);
        friendConnectKey.setApprovalForAll(address(friendConnectShare), true);
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.SubjectDoesNotExist.selector, tokenId));
        friendConnectShare.sellShares(nonOwner, amount);
    }

    // Fail: sellShares cannot sell last share
    function testSellSharesCannotSellLastShareFail() public {
        uint256 amount = 2;
        uint256 sellAmount = 3;
        uint256 price1 = friendConnectShare.getBuyPriceAfterFee(other, 1);

        hoax(other, price1);
        friendConnectShare.buyShares{value: price1}(other, 1);

        uint256 price2 = friendConnectShare.getBuyPriceAfterFee(other, amount);

        hoax(other, price2);
        friendConnectShare.buyShares{value: price2}(other, amount);

        uint256 supply = friendConnectShare.sharesSupply(other);

        vm.prank(other);
        friendConnectKey.setApprovalForAll(address(friendConnectShare), true);
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.CannotSellLastShare.selector, sellAmount, supply));
        friendConnectShare.sellShares(other, sellAmount);
    }

    // Fail: sellShares insufficient shares
    function testSellSharesInsufficientSharesFail() public {
        uint256 amount = 10;
        uint256 sellAmount = 15;
        uint256 price1 = friendConnectShare.getBuyPriceAfterFee(sharesSubject, amount);

        hoax(user, price1);
        friendConnectShare.buyShares{value: price1}(sharesSubject, amount);

        uint256 price2 = friendConnectShare.getBuyPriceAfterFee(sharesSubject, amount);

        hoax(other, price2);
        friendConnectShare.buyShares{value: price2}(sharesSubject, amount);

        vm.prank(other);
        friendConnectKey.setApprovalForAll(address(friendConnectShare), true);
        vm.prank(other);
        vm.expectRevert(abi.encodeWithSelector(IFriendConnectShareV1.InsufficientShares.selector, other, sellAmount));
        friendConnectShare.sellShares(sharesSubject, sellAmount);
    }

    // Success: setFeeDestination
    function testSetFeeDestinationSuccess() public {
        vm.prank(admin);
        friendConnectShare.setFeeDestination(user);
        assertEq(friendConnectShare.protocolFeeDestination(), user);
    }

    // Fail: setFeeDestination by non-owner
    function testSetFeeDestinationNonOwnerFail() public {
        vm.prank(user);
        vm.expectRevert();
        friendConnectShare.setFeeDestination(user);
    }

    // Success: setProtocolFeePercent
    function testSetProtocolFeePercentSuccess() public {
        vm.prank(admin);
        friendConnectShare.setProtocolFeePercent(10);
        assertEq(friendConnectShare.protocolFeePercent(), 10);
    }

    // Fail: setProtocolFeePercent by non-owner
    function testSetProtocolFeePercentNonOwnerFail() public {
        vm.prank(user);
        vm.expectRevert();
        friendConnectShare.setProtocolFeePercent(10);
    }

    // Success: setSubjectFeePercent
    function testSetSubjectFeePercentSuccess() public {
        vm.prank(admin);
        friendConnectShare.setSubjectFeePercent(10);
        assertEq(friendConnectShare.subjectFeePercent(), 10);
    }

    // Fail: setSubjectFeePercent by non-owner
    function testSetSubjectFeePercentNonOwnerFail() public {
        vm.prank(user);
        vm.expectRevert();
        friendConnectShare.setSubjectFeePercent(10);
    }
}
