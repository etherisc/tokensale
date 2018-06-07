pragma solidity 0.4.24;


import '../../contracts/token/DipToken.sol';


// mock class using BasicToken
contract DipTokenMock {

	DipToken public token;
	bool public result;

	constructor() public {
		token = new DipToken();
	}

	function mint(address _beneficiary, uint256 _amount) public {
		result = token.mint(_beneficiary, _amount);
	}

	function salvageTokens(DipToken _token, address _to) public {
		token.salvageTokens(_token, _to);
	}

}
