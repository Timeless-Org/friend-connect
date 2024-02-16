// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./LongStarShareV1Setup.t.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LongStarShareV1WidthdrawTest is Test, LongStarShareV1Setup {

    function buyShares(address subject, uint256 amount) public returns (uint256) {
        uint256 subjectPrice = longStarShare.getBuyPrice(
            subject,
            amount
        );
        longStarShare.buyShares{value: subjectPrice}(subject, amount);
        return subjectPrice;
    }

    function claimYield() public {
        vm.startPrank(admin);
        address[] memory users = new address[](3);
        users[0] = user;
        users[1] = sharesSubjectUser;
        users[2] = other;
        longStarShare.claimYield(100, users);
        vm.stopPrank();
    }

    function testWidthdrawAdminSuccess() public {
        vm.deal(address(longStarShare), 100 ether);
        uint256 beforeAdminBalance = admin.balance;
        vm.startPrank(admin);
        longStarShare.widthdrawAdmin(100 ether);
        uint256 afterAdminBalance = admin.balance;
        assertEq(beforeAdminBalance + 100 ether, afterAdminBalance);
        vm.stopPrank();
    }

    function testWidthdrawAdminFailInsufficientEth() public {
        vm.deal(address(longStarShare), 100 ether);
        vm.startPrank(admin);
        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.InsufficientEth.selector,
                101 ether,
                100 ether
            )
        );
        longStarShare.widthdrawAdmin(101 ether);
        vm.stopPrank();
    }

    function testWidthdrawAdminFailInsufficientEth2() public {
        vm.deal(address(longStarShare), 100 ether);
        vm.startPrank(user);
        uint256 buyPrice = buyShares(sharesSubjectUser, 3);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 contractBalance = 100 ether + buyPrice;
        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.InsufficientEth.selector,
                contractBalance,
                100 ether
            )
        );
        longStarShare.widthdrawAdmin(contractBalance);
        vm.stopPrank();
    }

    function testWidthdrawSuccess() public {
        claimYield();
        vm.deal(address(longStarShare), 100 ether);
        uint256 claimableYield = longStarShare.readClimableYield(user);
        vm.startPrank(user);
        uint256 beforeUserBalance = user.balance;
        longStarShare.widthdraw(claimableYield);
        uint256 afterUserBalance = user.balance;
        assertEq(beforeUserBalance + claimableYield, afterUserBalance);
        console.log("claimableYield: %s, beforeUserBalance: %s, afterUserBalance: %s", claimableYield, beforeUserBalance, afterUserBalance);
        vm.stopPrank();
    }

    function testWidthdrawFail() public {
        claimYield();
        vm.deal(address(longStarShare), 100 ether);
        uint256 claimableYield = longStarShare.readClimableYield(user);
        vm.startPrank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.InsufficientYield.selector,
                user,
                1,
                2
            )
        );
        longStarShare.widthdraw(claimableYield * 2);
        vm.stopPrank();
    }
}
