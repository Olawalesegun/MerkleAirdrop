// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AirdropToken is ERC20("AirdropToks", "ADT"){
  address public owner;

  constructor() {
    owner = msg.sender;
    _mint(msg.sender, 100e18);
  }

}