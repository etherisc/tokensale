# DIP token and TGE Specification.
This is the final and authoritative description of the DIP Token and TGE.

## Contracts Specification

### General
1. All math is done with the SafeMath lib.

### Specificaton of DIP Token.
1. Symbol of DIP token is "DIP".
1. Name of DIP token is "Decentralized Insurance Platform Token" .
1. Decimals is 18. 1 DIP is represented by the `uint256 1000000000000000000`. 
1. Maximum Supply is 100.000.000.000 (100 Billions).
1. The Token Contract implements ERC20 Specification according to [cite].

### Specification of general TGE parameters
1. TGE starts at block `startTime` (inclusive).
1. TGE ends no later then `endTime` (inclusive).
1. A maximum of `hardcap2` wei is raised.
1. A maximum of `hardcap1` is raised in the priorityPass phase (`now >= startTime && now < startPublicTime`). 
(if there is no public sale, `hardcap1 == hardcap2`)
1. All ether values are stored in `uint256` as wei.
1. All DIP token values are stored in `uint256` as 10E-18 fractions of tokens. 
1. Conversion from ETH to DIP is done via a parameter `uint256 rate`. 
Conversion is calculated as follows: # of DIP tokens = Amount in ETH * `rate`. Therefore, 10^-18 DIP = 1 wei * `rate`.

### PriorityPass Members and selected individuals
1. PriorityPass members and selected individuals are registered and stored in a data structure `contributorList`.
1. The index of the first entry is 0. 
1. Elements of this list are `struct`s with fields, all of which default to zero:
    - `uint256 priorityPassAllowance`;
    - `uint256 otherAllowance`;
    - `bool isActive`;
    - `uint256 contributionAmount`;
    - `uint256 tokensIssued`;
1. The `owner` of the TGE contract can fill and modify this list at any time by calling a function with 3 parameters.
The first parameter is an array of `address`es, the second an array of `priorityPassAllowance`s, the third parameter is an array of `otherAllowance`s.
For each `address` in the first parameter, the list is modified according to the second and third parameter and the field `isActive` set to `true`.
The three arrays must have the same length, otherwise the function will throw.
1. During the TGE, the `contributionAmount` and `tokensIssued` are registered.

### TGE phases
1. The phases of the TGE are delimited by the following parameters, denoted as `uint256`:
    - `startTime`
    - `startOpenPpTime`
    - `startPublicTime`
    - `endTime`
1. Accordingly, the TGE has 5 phases: 
    - `pendingStart`:             after deployment, before `startTime`
    - `priorityPass`:             including and after `startTime`, before `startOpenPpTime`
    - `openedPriorityPass`:       including and after `startOpenPpTime`, before `startPublicTime`
    - `crowdsale`:                including and after `startPublicTime`, before and including `endTime`
    - `crowdsaleEnded`:           after `endTime`
1. The state of the contract is reflected in the `state` variable, which is an `enum` with possible values  
`{ pendingStart, priorityPass, openedPriorityPass, crowdsale, crowdsaleEnded }`.
1. If `startPublicTime > endTime`, there is no public sale.
1. At every transaction, the state is checked and set according to the above conditions.
1. If `state = state.crowdsaleEnded` is set, a finalization function is called, which mints and distributes the remaining tokens.

### Investments 
1. In what follows, "invest/investment" means that the default function is called, the possible investment is calculated, 
the respective number of tokens is minted, and a possible surplus of funds is returned,
in case the `msg.value` is greater then the possible investment.
1. Participants can invest in one or more transactions.
1. Before the start of the TGE (in phase `state.pendingStart`), no investment is possible and the default function will throw.
1. After end of TGE (in phase `state.crowdsaleEnded`), no investment is possible and the default function will throw.
1. PriorityPass members and selected individuals can invest after `startTime` (inclusive)
1. PriorityPass members can invest less or equal to their `priorityPassAllowance` (in wei).
1. Selected individuals can invest less or equal to their `otherAllowance` (in wei).
1. PriorityPass members and selected individuals can invest unlimited amounts after `startOpenPpTime` (inclusive).  
"unlimited" means "any amount that is greater zero and less or equal to `hardcap2 - weiRaised`"
1. Unregistered individuals can invest unlimited amounts after `startPublicTime` (inclusive).
1. INVARIANT: After each transaction, the following conditions hold:
    - `now < startTime                                             && state == state.pendingStart`
    - `now >= startTime        && now < startOpenPpTime  && state == state.priorityPass`
    - `now >= startOpenPpTime  && now < startPublicTime  && state == state.openedPriorityPass`
    - `now >= startPublicTime  && now <= endTime         && state == state.crowdsale`
    - `now > endTime                                               && state == state.crowdsaleEnded`

### Vested tokens
1. The finalization function mints the remaining tokens and transfers it to a special multiSig address, from which
vested tokens are distributed.
1. The Vesting contract VestedTokens.sol extends the TokenTimelock.sol contract, which in turn extends the TokenStake.sol contract.
1. The TokenStake contract locks tokens. The sequence of transactions is as follows:
    - The original owner of tokens approves the TokenStake contract to transfer tokens.
    - The TokenStake contracts public `stakeFor` or `stake` function is called from the original owner. 
    - These functions return `false` if the transfer is not approved.
    - If `stake` is called, the tokens are staked for the original owner.
    - If `stakeFor` is called, the tokens are staked for someone else (any given address)
    - The TokenStake contract has two other internal functions `release` and `releaseFor` which are complementary to the `stake` and `stakeFor` functions.
    - Because the functions are internal, tokens transfered to the contract via `stake` and `stakeFor` are "locked" ("staked").
    - Contracts extending the TokenStake contract can provide public functions which make the `release` and `releaseFor` functions accessible, mostly by checking some condition.
1. The TokenTimelock.sol contract extends the TokenStake.sol contract. It introduces a table where for any tuple (address, releaseTime) a certain amount of tokens can be released.
1. Token are locked by calling `setTimelock` or `setTimelockFor`. 
1. The VestedTokens.sol contract automates the setting of Timelocks for vested Tokens. For a certain beneficiary, tokens are vested by setting individual timelocks for a portion of granted tokens. The `vestingPeriod` is divided in `numberOfPeriods` individual periods of length `cliff`.  The granted amount of tokens has to be divisible by `numberOfPeriods`. For every individual period, a timelock is set in the underlying TokenTimelock.sol contract. Every grant triggers a GrantGiven Event to record the grants.


### Miscellenaous functions
1. The DipToken.sol and DipTge.sol contracts both contain a `salvageTokens` function. 
It can be called by the owner to return tokens which have been sent to these contracts by mistake.

## Test Concept

(see separate document testing.md)