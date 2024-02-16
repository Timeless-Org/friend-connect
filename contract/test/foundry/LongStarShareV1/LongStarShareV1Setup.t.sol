// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../../contracts/Mock/LongStarShareV1Mock.sol";
import "../../../contracts/ILongStarShareV1.sol";
import "../../../contracts/LongStarKey.sol";

contract MockBlast {
    function configureClaimableYield() external {}

    function claimYield(address, address, uint256) external {}

    function readClaimableYield(address) external pure returns (uint256) {
        return 100 ether;
    }
}

contract LongStarShareV1Setup is Test {
    LongStarShareV1Mock longStarShare;
    LongStarKey longStarKey;
    MockBlast mockBlast;

    address admin = address(1);
    address user = address(2);
    address sharesSubjectUser = address(3);
    address nonOwner = address(4);
    address other = address(5);
    address longStarKeyAddress;
    address longStarShareAddress;
    string baseURI = "https://api.friendconnect.io/v1/";

    function setUp() public {
        vm.startPrank(admin);
        longStarKey = new LongStarKey(baseURI);
        mockBlast = new MockBlast();
        longStarShare = new LongStarShareV1Mock();
        longStarKeyAddress = address(longStarKey);
        longStarShareAddress = address(longStarShare);
        longStarShare.initialize(
            ILongStarShareV1.EditionInitialization(longStarKeyAddress)
        );

        longStarKey.grantMintRole(address(longStarShare));

        vm.deal(address(longStarShare), 100 ether);
        vm.deal(user, 10 ether);
        vm.deal(sharesSubjectUser, 10 ether);

        vm.stopPrank();

        uint256 userSubjectPrice = longStarShare.getBuyPrice(user, 1);
        console.log("userSubjectPrice: %s", userSubjectPrice);
        vm.prank(user);
        longStarShare.buyShares{value: userSubjectPrice}(user, 1);

        uint256 shareSubjectPrice = longStarShare.getBuyPrice(
            sharesSubjectUser,
            1
        );
        console.log("shareSubjectPrice: %s", shareSubjectPrice);
        vm.prank(sharesSubjectUser);
        longStarShare.buyShares{value: shareSubjectPrice}(sharesSubjectUser, 1);

        vm.label(admin, "Admin");
        vm.label(user, "User");
        vm.label(sharesSubjectUser, "SharesSubjectUser");
        vm.label(nonOwner, "NonOwner");
        vm.label(other, "Other");
    }
}
