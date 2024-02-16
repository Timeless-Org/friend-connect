// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./LongStarShareV1Setup.t.sol";
import "forge-std/console.sol";

contract LongStarShareV1BuyShareTest is Test, LongStarShareV1Setup {
    function testBuySharesSuccess() public {
        vm.startPrank(user);

        uint256 beforeUserBalance = address(user).balance;
        uint256 userSubjectPrice = longStarShare.getBuyPrice(
            sharesSubjectUser,
            1
        );
        uint256 beforeOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );

        longStarShare.buyShares{value: userSubjectPrice}(sharesSubjectUser, 1);

        uint256 currentUserBalance = address(user).balance;
        uint256 currentOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );
        uint256 shares = longStarShare.sharesBalance(sharesSubjectUser, user);

        assertEq(beforeOwnerAmount + 1, currentOwnerAmount);
        assertEq(shares, 1);
        assertEq(beforeUserBalance - userSubjectPrice, currentUserBalance);
        console.log(
            "userSubjectPrice: %s, beforeUserBalance: %s, currentUserBalance: %s",
            userSubjectPrice,
            beforeUserBalance,
            currentUserBalance
        );
        vm.stopPrank();
    }

    function testBuyShares2Success() public {
        vm.startPrank(user);

        uint256 userSubjectPrice = longStarShare.getBuyPrice(
            sharesSubjectUser,
            5
        );
        uint256 beforeOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );

        longStarShare.buyShares{value: userSubjectPrice}(sharesSubjectUser, 5);

        uint256 currentOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );
        uint256 shares = longStarShare.sharesBalance(sharesSubjectUser, user);

        assertEq(beforeOwnerAmount + 5, currentOwnerAmount);
        assertEq(shares, 5);
        vm.stopPrank();
    }

    function testBuySharesFailDueToInsufficientPayment() public {
        vm.startPrank(user);

        uint256 userSubjectPrice = longStarShare.getBuyPrice(
            sharesSubjectUser,
            1
        );
        uint256 halfUserSubjectPrice = userSubjectPrice / 2;

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.PaymentInsufficient.selector,
                halfUserSubjectPrice,
                userSubjectPrice
            )
        );

        longStarShare.buyShares{value: halfUserSubjectPrice}(
            sharesSubjectUser,
            1
        );

        vm.stopPrank();
    }

    function testBuySharesFailNotAuthorizedToBuyFirstShare() public {
        vm.startPrank(user);

        uint256 userSubjectPrice = longStarShare.getBuyPrice(admin, 1);

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.NotAuthorizedToBuyFirstShare.selector,
                user,
                admin
            )
        );

        longStarShare.buyShares{value: userSubjectPrice}(admin, 1);

        vm.stopPrank();
    }
}
