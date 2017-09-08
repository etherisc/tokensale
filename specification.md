# DIP token and TGE Specification.
This is the final and authoritative description of the DIP Token and TGE.

## General
1. All math is done with the SafeMath lib.

## Specificaton of DIP Token.
1. Symbol of DIP token is "DIP".
1. Name of DIP token is "Decentralized Insurance Platform Token" .
1. Decimals is 18. 1 DIP is represented by the `uint256 1000000000000000000`. 
1. Maximum Supply is 100.000.000 (100 Millions).

## Specification of general TGE parameters
1. TGE starts at block `startBlock` (inclusive).
1. TGE ends no later then `endBlock` (inclusive).
1. A maximum of `hardcap2` wei is raised.
1. A maximum of `hardcap1` is raised in the priorityPass phase (`block.number >= startBlock && block.number < startPublicBlock`). 
(if there is no public sale, `hardcap1 == hardcap2`)
1. All ether values are stored in `uint256` as wei.
1. All DIP token values are stored in `uint256` as 10E-18 fractions of tokens. 
1. Conversion from ETH to DIP is done via a parameter `uint256 rate`. 
Conversion is calculated as follows: # of DIP tokens = Amount in ETH * `rate`. Therefore, 10^-18 DIP = 1 wei * `rate`.

## PriorityPass Members and selected individuals
1. PriorityPass members and selected individuals are registered and stored in a data structure `contributorList`.
1. The index of the first entry is 0. The total number of contributors is kept in a variable `nextContributorIndex`.
1. Elements of this list are `struct`s with fields, all of which default to zero:
    - `uint256 priorityPassAllowance`;
    - `uint256 otherAllowance`;
    - `bool isActive`;
    - `uint256 contributionAmount`;
    - `uint256 tokensIssued`;
1. The `owner` of the contract can fill and modify this list at any time by calling a function with 3 parameters.
The first parameter is an array of `address`es, the second an array of `priorityPassAllowance`s, the third parameter is an array of `otherAllowance`s.
For each `address` in the first parameter, the list is modified according to the second and third parameter and the field `isActive` set to `true`.
The three arrays must have the same length, otherwise the function will throw.
1. During the TGE, the `contributionAmount` and `tokensIssued` are registered.
1. INVARIANT: After each transaction, and for all members of the list, the following is true: If any field of the struct is non-zero, `isActive` is always `true`.

## TGE phases
1. The phases of the TGE are delimited by the following parameters, denoted as `uint256`:
    - `startBlock`
    - `startOpenPpBlock`
    - `startPublicBlock`
    - `endBlock`
1. Accordingly, the TGE has 5 phases: 
    - `pendingStart`:             after deployment, before `startBlock`
    - `priorityPass`:             including and after `startBlock`, before `startOpenPpBlock`
    - `openedPriorityPass`:       including and after `startOpenPpBlock`, before `startPublicBlock`
    - `crowdsale`:                including and after `startPublicBlock`, before and including `endBlock`
    - `crowdsaleEnded`:           after `endBlock`
1. The state of the contract is reflected in the `state` variable, which is an `enum` with possible values  
`{ pendingStart, priorityPass, openedPriorityPass, crowdsale, crowdsaleEnded }`.
1. If `startPublicBlock > endBlock`, there is no public sale.
1. At every transaction, the state is checked and set according to the above conditions.
1. If `state = state.crowdsaleEnded` is set, a finalization function is called, which mints and distributes the remaining tokens.

## Investments 
1. In what follows, "invest/investment" means that the default function is called, the possible investment is calculated, 
the respective number of tokens is minted, and a possible surplus of funds is returned,
in case the `msg.value` is greater then the possible investment.
1. Participants can invest in one or more transactions.
1. Before the start of the TGE (in phase `state.pendingStart`), no investment is possible and the default function will throw.
1. After end of TGE (in phase `state.crowdsaleEnded`), no investment is possible and the default function will throw.
1. PriorityPass members and selected individuals can invest after `startBlock` (inclusive)
1. PriorityPass members can invest less or equal to their `priorityPassAllowance` (in wei).
1. Selected individuals can invest less or equal to their `otherAllowance` (in wei).
1. PriorityPass members and selected individuals can invest unlimited amounts after `startOpenPpBlock` (inclusive).  
"unlimited" means "any amount that is greater zero and less or equal to `hardcap2 - weiRaised`"
1. Unregistered individuals can invest unlimited amounts after `startPublicBlock` (inclusive).
1. INVARIANT: After each transaction, the following conditions hold:
    - `block.number < startBlock                                             && state == state.pendingStart`
    - `block.number >= startBlock        && block.number < startOpenPpBlock  && state == state.priorityPass`
    - `block.number >= startOpenPpBlock  && block.number < startPublicBlock  && state == state.openedPriorityPass`
    - `block.number >= startPublicBlock  && block.number <= endBlock         && state == state.crowdsale`
    - `block.number > endBlock                                               && state == state.crowdsaleEnded`

## Vested tokens
1. The finalization function mints the remaining tokens and transfers it to a special multiSig address, from which