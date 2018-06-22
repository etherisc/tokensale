# Testing Concept for the DIP Token and Tokensale Contracts

## Contract: DipToken.sol

Mockup Contract: DipTokenMock.sol
Test: DipToken.js

| Description | Outcome |
|-------------|---------|
| should be constructed with the correct parameters | Name, Symbol, Decimals, MAXIMUM_SUPPLY as specified |
| should reject minting more than MAXIMUM_SUPPLY | Trying to mint more than MAXIMUM_SUPPLY should throw |

## Contract: DipTge.sol

| Description | Outcome |
|-------------|---------|
| should throw if rate == 0 | If contract is constructed with `rate = 0`, it should throw. |
| should have the token paused at start | After deployment, token should be in "paused" state. |
| should have state == state.pendingStart at start | After deployment, tokensale contract should be in `state.pending` state. |
| should have correct parameters at start | After deployment, `startBlock`, `startOpenPpBlock`, `startPublicBlock`, `endBlock`, `wallet`, `rate` should fit the deployment parameters. |
| whitelisting process
| should throw if first array has wrong length | if `editContributors` is called with inconsistend array length, it should throw |
| should throw if second array has wrong length | if `editContributors` is called with inconsistend array length, it should throw |
| should yield maxContrib=0 before start | Before start, `maxContrib` should yield 0. |
| should yield maxContrib=allowance in priorityPass phase | In PriorityPass phase, maxContrib should be the priorityPass allowance of the participant  |
| should yield maxContrib=hardCap1 in open priorityPass phase | In open priority Pass phase, maxContrib should be limited by hardCap1 only. |
| should yield maxContrib=hardCap2 in public phase | In public Phase, maxContrib should be limited by hardCap2 only. |
| should yield maxContrib=0 after crowdsale end | After crowdsale ends, maxContrib should yield 0. |
| should reject whitelist participants if not owner | Only owner should be allowed to whitelist participants; throw otherwise. |
| should update participants by owner | Owner should be able to update participants. |
| accepting payments
| should accept payments from priority pass members | Payments by priorityPass members should be accepted and yield the correct amount of tokens. |
| should accept payments from other listed members | Same for other participants. |
| should partially accept payments from priority pass members | If payments succeed allowance, rest should be refunded. |
| should partially accept payments from other listed members | Same for other participants. |
| should limit to hardCap1 in priority Phase for priority pass members | If payment succeed hardCap1, rest should refunded. |
| should limit to hardCap1 in priority Phase for other listed members | Same for other whitelisted participants |
| should accept higher payments from priority pass members in opened phase | In open prioritypass phase, higher payments should be accepted. |
| should accept higher payments from other listed members in opened phase | Same for other whitelisted participants. |
| should accept higher payments from priority pass members in public phase | In public phase, higher payments by pp members should be accepted. |
| should accept higher payments from other listed members in public phase | Same for other whitelisted participants | 
| should accept higher payments from anybody in public phase | Same for anybody. |
| rejecting payments
| should reject payments before start from anybody | Before start, payments should be rejected.  |
| should reject payments before start from whitelisted PP participant | Same for pp members. |
| should reject payments before start from whitelisted other participant | Same for other whitelisted members. |
| should reject payments after end from anybody | After end, payments should be rejected. |
| should reject payments after end from whitelisted PP participant | Same for pp members. |
| should reject payments after end from whitelisted other participant | Same for other whitelisted members. |
| misceallenous tests
| should throw if token doesn't mint | If token doesn't mint for some reason, contract should throw. |
| should throw if beneficiary is 0x0 | If beneficiary is 0x0, contract should throw. |
| should transfer remaining tokens to wallet | At finalizing the contract, all remaining tokens up to MAXIMUM_SUPPLY should be minted to `wallet` |
| should end sale after hardCap2 is reached | After hardCap2 is reached, tokensale should be ended (`state = state.ended`) |
| should salvage tokens which have been sent to contract by mistake | Owner should be able to transfer tokens which have been sent to the contract by mistake. |

## Contract: TokenStakeMock

| Description | Outcome |
|-------------|---------|
| should stake tokens from spender for staker |  |
| should add stake tokens from spender for staker |  |
| should stake tokens from staker for staker |  |
| should add stake tokens from staker for staker |  |
| should release staked tokens from staker for beneficiary |  |
| should partially release staked tokens from staker for beneficiary |  |
| should release staked tokens from staker for staker |  |
| should partially release staked tokens from staker for staker |  |
| should throw if trying to release more than staked tokens from staker for beneficiary |  |
| should throw if trying to release more than staked tokens from staker for staker |  |
| should return false if transferFrom returns false during staking |  |
| should return false if transfer returns false during releasing |  |

## Contract: TokenTimelock

| Description | Outcome |
|-------------|---------|
| should set timelock from spender for staker |  |
| should set timelock from staker for staker |  |
| should release timelock from staker for beneficiary |  |
| should release timelock from staker for staker |  |
| should throw if trying to release before releaseTime |  |
| should throw if token is paused during locking |  |
| should return false if token is paused during unlocking |  |

## Contract: vestedTokens

| Description | Outcome |
|-------------|---------|
| should grant tokens for beneficiary |  |
| should throw if amount not divisible by periods |  |

## Contract: BasicToken

| Description | Outcome |
|-------------|---------|
| should return the correct totalSupply after construction |  |
| should return correct balances after transfer |  |
| should throw an error when trying to transfer more than balance |  |
 
## Contract: Crowdsale

| Description | Outcome |
|-------------|---------|
| should be token owner
| should be ended only after end |  |
| accepting payments
| should reject payments before start
| should accept payments after start |  |
| should reject payments after end |  |
| high-level purchase
| should log purchase |  |
| should increase totalSupply |  |
| should assign tokens to sender |  |
| should forward funds to wallet |  |
| low-level purchase
| should log purchase |  |
| should increase totalSupply |  |
| should assign tokens to beneficiary |  |
| should forward funds to wallet |  |
 
## Contract: FinalizableCrowdsale

| Description | Outcome |
|-------------|---------|
| cannot be finalized before ending
| cannot be finalized by third party after ending |  |
| can be finalized by owner after ending |  |
| cannot be finalized twice |  |
| logs finalized |  |
| finishes minting of token |  |
 
## Contract: Mintable

| Description | Outcome |
|-------------|---------|
| should start with a totalSupply of 0
| should return mintingFinished false after construction
| should mint a given amount of tokens to a given address |  |
 
## Contract: Pausable

| Description | Outcome |
|-------------|---------|
| can perform normal process in non-pause |  |
| can not perform normal process in pause |  |
| can not take drastic measure in non-pause |  |
| can take a drastic measure in a pause |  |
| should resume allowing normal process after pause is over |  |
 
## Contract: Pausabletoken

| Description | Outcome |
|-------------|---------|
| should return paused false after construction |  |
| should return paused true after pause |  |
| should return paused false after pause and unpause |  |
| should be able to transfer if transfers are unpaused |  |
| should be able to transfer after transfers are paused and unpaused |  |
| should throw an error trying to transfer while transactions are paused |  |
| should throw an error trying to transfer from another account while transactions are paused |  |
 
## Contract: SafeMath

| Description | Outcome |
|-------------|---------|
| multiplies correctly |  |
| adds correctly |  |
| subtracts correctly |  |
| should throw an error if subtraction result would be negative
| should throw an error on addition overflow
| should throw an error on multiplication overflow
 
## Contract: StandardToken

| Description | Outcome |
|-------------|---------|
| should return the correct totalSupply after construction |  |
| should return the correct allowance amount after approval |  |
| should return correct balances after transfer |  |
| should throw an error when trying to transfer more than balance |  |
| should return correct balances after transfering from another account |  |
| should throw an error when trying to transfer more than allowed |  |
 
