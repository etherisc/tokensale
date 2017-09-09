pragma solidity ^0.4.11;


import 'zeppelin-solidity/contracts/crowdsale/FinalizableCrowdsale.sol';


contract FinalizableCrowdsaleImpl is FinalizableCrowdsale {

  function FinalizableCrowdsaleImpl (
    uint256 _startBlock,
    uint256 _endBlock,
    uint256 _rate,
    address _wallet
  )
    Crowdsale(_startBlock, _endBlock, _rate, _wallet)
    FinalizableCrowdsale() 
  {
  }

}
