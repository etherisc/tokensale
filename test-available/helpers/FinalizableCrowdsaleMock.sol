pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/crowdsale/FinalizableCrowdsale.sol';


contract FinalizableCrowdsaleMock is FinalizableCrowdsale {

  constructor (
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    address _wallet
  ) Crowdsale(_startTime, _endTime, _rate, _wallet)
    FinalizableCrowdsale()
    public
  {
  }

  function finalization() internal {
    token.finishMinting();
    super.finalization();
  }

}
