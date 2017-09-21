pragma solidity ^0.4.11;


import '../../contracts/token/DipToken.sol';


// mock class using BasicToken
contract DipTokenMock {

	DipToken public token;
	bool public result;

	function DipTokenMock() {
		token = new DipToken();
	}

	function mint(address _beneficiary, uint256 _amount) {
		result = token.mint(_beneficiary, _amount);
	}

	function salvageTokens(DipToken _token, address _to) {
		token.salvageTokens(_token, _to);
	}

}
