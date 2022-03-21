// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MaticShiba is Initializable, ERC20CappedUpgradeable, OwnableUpgradeable {

    
    function initialize() initializer public {
        __ERC20_init("MaticShiba", "MSHIBA");
        __ERC20Capped_init(589735030408323 * 10 ** decimals());
        __Ownable_init();
    }

    function privateMint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function mint() external payable {
        require(msg.value > 0 ether, "MATIC amount is incorrect");
        _mint(msg.sender, msg.value * 1000000);
    }
}
