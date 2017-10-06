# DIP token and TGE Specification.
This is the final and authoritative description of the DIP Token and TGE.

## Contracts Specification

### General
1. All math is done with the SafeMath lib.

### Specificaton of DIP Token.
1. Symbol of DIP token is "DIP".
1. Name of DIP token is "Decentralized Insurance Protocol" .
1. Decimals is 18. 1 DIP is represented by the `uint256 1000000000000000000`. 
1. Maximum Supply is 1.000.000.000 (1 Billion).
1. The Token Contract implements ERC20 Specification according to https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md.

### Specification of general TGE parameters
1. TGE starts at block `startTime` (inclusive).
1. TGE ends no later then `endTime` (inclusive).
1. A maximum of `hardcap2` wei is raised.
1. A maximum of `hardcap1` is raised in the priorityPass phase (`now >= startTime && now < startPublicTime`). 
(if there is no public sale, `hardcap1 == hardcap2`)
1. All ether values are stored in `uint256` as wei.
1. All DIP token values are stored in `uint256` as 1E-18 fractions of tokens. 
1. Conversion from ETH to DIP is done via a parameter `uint256 rate`. 
Conversion is calculated as follows: # of DIP tokens = Amount in ETH * `rate`. Therefore, 1E-18 DIP = 1 wei * `rate`.

### PriorityPass Members and selected individuals
1. PriorityPass members and selected individuals are registered and stored in a mapping `contributorList`.
1. Elements of this mapping are `struct`s with fields, all of which default to zero:
    - `uint256 priorityPassAllowance`;
    - `uint256 otherAllowance`;
    - `uint256 contributionAmount`;
    - `uint256 tokensIssued`;
1. The `owner` of the TGE contract can fill and modify this list at any time by calling a function with 3 parameters.
The first parameter is an array of `address`es, the second an array of `priorityPassAllowance`s, the third parameter is an array of `otherAllowance`s.
For each `address` in the first parameter, the list is modified according to the second and third parameter.
The three arrays must have the same length, otherwise the function will throw.
1. A "PriorityPass Member" is an address with `priorityPassAllowance > 0`.
1. A "Selected Individual" is an address with `otherAllowance > 0`. 
1. During the TGE, the `contributionAmount` and `tokensIssued` are updated according to the investment made.

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
1. In what follows, "invest/investment" means that the default function or the function `buyTokens` is called, the possible investment is calculated, 
the respective number of tokens is minted, and a possible surplus of funds is returned,
in case the `msg.value` is greater then the possible investment. "Participants" means distinct addresses.
1. Participants can invest in one or more transactions. The contract keeps track of the amount invested so far in a field `contributionAmount` per participant.
1. Before the start of the TGE (in phase `state.pendingStart`), no investment is possible and the default function will throw.
1. After end of TGE (in phase `state.crowdsaleEnded`), no investment is possible and the default function will throw.
1. During the `priorityPass` phase, PriorityPass Members and selected individuals can invest less or equal to the sum of their `priorityPassAllowance` and `otherAllowance` (in wei).
1. During the `openedPriorityPass` phase, PriorityPass members and selected individuals can invest unlimited amounts.
"unlimited" means "any amount that is greater zero and less or equal to `hardcap2 - weiRaised`"
1. During the `crowdsale` phase, everybody can invest unlimited amounts.
1. INVARIANTS: After each transaction, the following condition hold for all addresses `A`:
```
(

  now < startTime 
  && state == state.pendingStart 
  && weiRaised == 0

) && ( 
  
  now >= startTime && now < startOpenPpTime  
  && state == state.priorityPass 
  && weiRaised <= hardCap1 
  && contributionAmount[A] <= priorityPassAllowance[A] + otherAllowance[A]

) && ( 

  now >= startOpenPpTime  && now < startPublicTime
  && state == state.openedPriorityPass 
  && weiRaised <= hardCap2

) && (
  
  now >= startPublicTime  && now <= endTime
  && state == state.crowdsale 
  && weiRaised <= hardCap2

) && (

  now > endTime
  && state == state.crowdsaleEnded 
  && weiRaised <= hardCap2

) && (

  weiRaised == sum(all x, contributionAmount[x])

)
```    
### Vested tokens
1. The finalization function mints the remaining tokens and transfers it to a special multiSig address, from which
vested tokens are distributed. The vesting itself is not enforced. The following specification describes the vesting contract to be used.
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


### Miscellaneous functions
1. The DipToken.sol and DipTge.sol contracts both contain a `salvageTokens` function. 
For the DipTge.sol contract, it can be called by the owner to return tokens which have been sent to these contracts by mistake.
For the DipToken.sol, the owner of the DipToken.sol contract is changed in the finalization function of DipTge.sol to 
the owner of the DipTge.sol contract, who then can perform the function if necessary.
