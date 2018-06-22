pragma solidity 0.4.24;


import 'zeppelin-solidity/contracts/lifecycle/Pausable.sol';


// mock class using Pausable
contract PausableMock is Pausable {
  bool public drasticMeasureTaken;
  uint public count;

  constructor() public {
    drasticMeasureTaken = false;
    count = 0;
  }

  function normalProcess() external whenNotPaused {
    count++;
  }

  function drasticMeasure() external whenPaused {
    drasticMeasureTaken = true;
  }

}
