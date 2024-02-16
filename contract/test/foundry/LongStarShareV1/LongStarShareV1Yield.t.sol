// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./LongStarShareV1Setup.t.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LongStarShareV1YieldTest is Test, LongStarShareV1Setup {
    function testReadClimableYield() public {
        uint256 yield = longStarShare.readClimableYield();
        assertEq(yield, 100 ether);
    }

    function testClaimYieldSuccess() public {
        vm.startPrank(admin);
        address[] memory users = new address[](3);
        users[0] = user;
        users[1] = sharesSubjectUser;
        users[2] = other;
        longStarShare.claimYield(100, users);
        vm.stopPrank();
    }

    function testClaimYieldFail() public {
        vm.startPrank(user);
        address[] memory users = new address[](3);
        users[0] = user;
        users[1] = sharesSubjectUser;
        users[2] = other;
        vm.expectRevert(
            abi.encodeWithSelector(
                OwnableUpgradeable.OwnableUnauthorizedAccount.selector,
                user
            )
        );
        longStarShare.claimYield(100, users);
        vm.stopPrank();
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

    function testUserReadClimableYield() public {
        claimYield();
        uint256 yield = longStarShare.readClimableYield(user);
        assertEq(yield, 1);
    }
}
