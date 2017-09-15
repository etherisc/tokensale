pragma solidity ^0.4.11;


contract MappingTest {

	mapping(uint => mapping(uint => uint)) public myMapping;

	function MappingTest() {
		myMapping[1][2] = 3;
	}

}
