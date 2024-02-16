// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./LongStarShareV1Setup.t.sol";

contract LongStarShareV1SellShareTest is Test, LongStarShareV1Setup {
    function buyShares(address subject, uint256 amount) public {
        uint256 subjectPrice = longStarShare.getBuyPrice(
            subject,
            amount
        );

        longStarShare.buyShares{value: subjectPrice}(subject, amount);
    }

    function testSellSharesSuccess() public {
        vm.startPrank(user);
        buyShares(sharesSubjectUser, 1);

        uint256 beforeUserBalance = address(user).balance;
        uint256 beforeOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );
        uint256 sellPrice = longStarShare.getSellPrice(sharesSubjectUser, 1);

        longStarKey.setApprovalForAll(longStarShareAddress, true);
        longStarShare.sellShares(sharesSubjectUser, 1);

        uint256 currentUserBalance = address(user).balance;
        uint256 currentOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );

        assertEq(beforeOwnerAmount - 1, currentOwnerAmount);
        assertEq(beforeUserBalance + sellPrice, currentUserBalance);
        vm.stopPrank();
    }

    function testSellShares2Success() public {
        vm.startPrank(user);
        buyShares(sharesSubjectUser, 5);

        uint256 beforeOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );

        longStarKey.setApprovalForAll(longStarShareAddress, true);
        longStarShare.sellShares(sharesSubjectUser, 3);

        uint256 currentOwnerAmount = longStarShare.sharesSupply(
            sharesSubjectUser
        );

        assertEq(beforeOwnerAmount - 3, currentOwnerAmount);

        vm.stopPrank();
    }

    function testSellSharesFailContractNotApproved() public {
        vm.startPrank(user);
        buyShares(sharesSubjectUser, 1);

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.ContractNotApproved.selector,
                user
            )
        );
        longStarShare.sellShares(sharesSubjectUser, 1);

        vm.stopPrank();
    }

    function testSellSharesFailSubjectDoesNotExist() public {
        vm.startPrank(user);

        buyShares(sharesSubjectUser, 1);
        longStarKey.setApprovalForAll(longStarShareAddress, true);
        uint256 tokenId = longStarKey.keyOwners(admin);

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.SubjectDoesNotExist.selector,
                tokenId
            )
        );
        longStarShare.sellShares(admin, 1);

        vm.stopPrank();
    }

    function testSellSharesFailCannotSellLastShare() public {
        vm.startPrank(user);

        uint256 amount = 5;
        buyShares(sharesSubjectUser, 3);
        longStarKey.setApprovalForAll(longStarShareAddress, true);

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.CannotSellLastShare.selector,
                amount,
                4
            )
        );
        longStarShare.sellShares(sharesSubjectUser, amount);

        vm.stopPrank();
    }

    function testSellSharesFailInsufficientShares() public {
        vm.startPrank(sharesSubjectUser);
        buyShares(sharesSubjectUser, 5);
        vm.stopPrank();

        vm.startPrank(user);
        buyShares(sharesSubjectUser, 3);
        longStarKey.setApprovalForAll(longStarShareAddress, true);

        vm.expectRevert(
            abi.encodeWithSelector(
                ILongStarShareV1.InsufficientShares.selector,
                user,
                4
            )
        );
        longStarShare.sellShares(sharesSubjectUser, 4);

        vm.stopPrank();
    }

}
