# Status of Rework 

## Code audit by N.N.

2.1 salvageTokens of token contract not callable  
	--> DONE: resolved by changing ownership of token contract in finalization; test added.

2.2 Reaching minCap is not enforced and not reaching it  
	--> DONE: removed minCap & all references

2.3 MinCapReached will fire continuously after reaching  
	--> DONE: Event removed

2.4 Handling of refunds  
	--> DONE: \_beneficiary will receive refunds

2.5 isActive mentioned in specifications is not implemented  
	--> DONE: removed from specification

2.6 Increase readability of token name by adding space  
	--> DONE: Token name fixed

2.7 Turn contract variables into constants  
	--> DONE

2.8 Extend specifications on available investment amounts  
	--> DONE

2.9 Use explicit uint256 instead of alias uint  
	--> DONE

2.10 Require more recent compiler version  
	--> DONE: updated to Solidity 0.4.15

2.11 Clarify specifications on token fraction  
	--> DONE: specification updated

2.12 Distribution of unsold tokens via vesting contract is not enforced  
	--> DONE: specification clarified

2.13 Simplify if-revert logic to the more readable  
	--> DONE

## Code audit by N.N.

