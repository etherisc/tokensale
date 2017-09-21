# Testing Concept for the DIP Token and Tokensale Contracts

## Tests for DIP Token

### DipToken.sol

| Test |   Contract: DipTge
    ✓ should throw if rate == 0 (996ms)
    ✓ should have the token paused at start
    ✓ should have state == state.pendingStart at start
    ✓ should have correct parameters at start (303ms)
    whitelisting process
      ✓ should throw if first array has wrong length
      ✓ should throw if second array has wrong length (41ms)
      ✓ should yield maxContrib=0 before start (158ms)
      ✓ should yield maxContrib=allowance in priorityPass phase (1417ms)
      ✓ should yield maxContrib=hardCap1 in open priorityPass phase (2648ms)
      ✓ should yield maxContrib=hardCap2 in public phase (3869ms)
      ✓ should yield maxContrib=0 after crowdsale end (5290ms)
      ✓ should reject whitelist participants if not owner
      ✓ should update participants by owner (1225ms)
    accepting payments
      ✓ should accept payments from priority pass members (223ms)
      ✓ should accept payments from other listed members (181ms)
      ✓ should partially accept payments from priority pass members (130ms)
      ✓ should partially accept payments from other listed members (114ms)
      ✓ should limit to hardCap1 in priority Phase for priority pass members (174ms)
      ✓ should limit to hardCap1 in priority Phase for other listed members (209ms)
      ✓ should accept higher payments from priority pass members in opened phase (1865ms)
      ✓ should accept higher payments from other listed members in opened phase (1795ms)
      ✓ should accept higher payments from priority pass members in public phase (3089ms)
      ✓ should accept higher payments from other listed members in public phase (3090ms)
      ✓ should accept higher payments from anybody in public phase (3079ms)
    rejecting payments
      ✓ should reject payments before start from anybody (49ms)
      ✓ should reject payments before start from whitelisted PP participant (51ms)
      ✓ should reject payments before start from whitelisted other participant (48ms)
      ✓ should reject payments after end from anybody (5232ms)
      ✓ should reject payments after end from whitelisted PP participant (5252ms)
      ✓ should reject payments after end from whitelisted other participant (5211ms)
    misceallenous tests
      1) should throw if token doesn`t mint
    Events emitted during test:
    ---------------------------
    Pause()
    Pause()
    PublicStarted(_blockNumber: 288)
    Mint(to: <indexed>, amount: 4.2e+27)
    TokenPurchase(purchaser: <indexed>, beneficiary: <indexed>, value: 42000000000000000000, amount: 4.2e+27)
    ---------------------------
      ✓ should throw if beneficiary is 0x0 (1476ms)
      ✓ should transfer remaining tokens to wallet (5515ms)
      ✓ should end sale after hardCap2 is reached (4077ms)
      ✓ should salvage tokens which have been sent to contract by mistake (4102ms)
  Contract: DipTokenMock
    2) should be constructed with the correct parameters
    > No events were emitted
    ✓ should reject minting more than MAXIMUM_SUPPLY (124ms)
  Contract: TokenStakeMock
    ✓ should stake tokens from spender for staker (145ms)
    ✓ should add stake tokens from spender for staker (233ms)
    ✓ should stake tokens from staker for staker (148ms)
    ✓ should add stake tokens from staker for staker (200ms)
    ✓ should release staked tokens from staker for beneficiary (211ms)
    ✓ should partially release staked tokens from staker for beneficiary (279ms)
    ✓ should release staked tokens from staker for staker (207ms)
    ✓ should partially release staked tokens from staker for staker (232ms)
    ✓ should throw if trying to release more than staked tokens from staker for beneficiary (164ms)
    ✓ should throw if trying to release more than staked tokens from staker for staker (158ms)
    ✓ should return false if transferFrom returns false during staking (174ms)
    ✓ should return false if transfer returns false during releasing (272ms)
  Contract: TokenTimelock
    ✓ should set timelock from spender for staker (117ms)
    ✓ should set timelock from staker for staker (116ms)
    ✓ should release timelock from staker for beneficiary (174ms)
    ✓ should release timelock from staker for staker (181ms)
    ✓ should throw if trying to release before releaseTime (161ms)
    ✓ should throw if token is paused during locking (79ms)
    ✓ should return false if token is paused during unlocking (280ms)
  Contract: vestedTokens
    ✓ should grant tokens for beneficiary (596ms)
    ✓ should throw if amount not divisible by periods (250ms)
  Contract: BasicToken
    ✓ should return the correct totalSupply after construction (62ms)
    ✓ should return correct balances after transfer (102ms)
    ✓ should throw an error when trying to transfer more than balance (59ms)
  Contract: Crowdsale
    ✓ should be token owner
    ✓ should be ended only after end (5362ms)
    accepting payments
      ✓ should reject payments before start (65ms)
      ✓ should accept payments after start (2518ms)
      ✓ should reject payments after end (5173ms)
    high-level purchase
      ✓ should log purchase (40ms)
      ✓ should increase totalSupply (71ms)
      ✓ should assign tokens to sender (70ms)
      ✓ should forward funds to wallet (524ms)
    low-level purchase
      ✓ should log purchase (47ms)
      ✓ should increase totalSupply (70ms)
      ✓ should assign tokens to beneficiary (71ms)
      ✓ should forward funds to wallet (543ms)
  Contract: FinalizableCrowdsale
    ✓ cannot be finalized before ending
    ✓ cannot be finalized by third party after ending (5130ms)
    ✓ can be finalized by owner after ending (5116ms)
    ✓ cannot be finalized twice (5397ms)
    ✓ logs finalized (5169ms)
    ✓ finishes minting of token (5186ms)
  Contract: Mintable
    ✓ should start with a totalSupply of 0
    ✓ should return mintingFinished false after construction
    ✓ should mint a given amount of tokens to a given address (67ms)
  Contract: Pausable
    ✓ can perform normal process in non-pause (141ms)
    ✓ can not perform normal process in pause (91ms)
    ✓ can not take drastic measure in non-pause (53ms)
    ✓ can take a drastic measure in a pause (94ms)
    ✓ should resume allowing normal process after pause is over (128ms)
  Contract: Pausabletoken
    ✓ should return paused false after construction
    ✓ should return paused true after pause (50ms)
    ✓ should return paused false after pause and unpause (77ms)
    ✓ should be able to transfer if transfers are unpaused (117ms)
    ✓ should be able to transfer after transfers are paused and unpaused (133ms)
    ✓ should throw an error trying to transfer while transactions are paused (54ms)
    ✓ should throw an error trying to transfer from another account while transactions are paused (56ms)
  Contract: SafeMath
    ✓ multiplies correctly (41ms)
    ✓ adds correctly (38ms)
    ✓ subtracts correctly (40ms)
    ✓ should throw an error if subtraction result would be negative
    ✓ should throw an error on addition overflow
    ✓ should throw an error on multiplication overflow
  Contract: StandardToken
    ✓ should return the correct totalSupply after construction (58ms)
    ✓ should return the correct allowance amount after approval (135ms)
    ✓ should return correct balances after transfer (104ms)
    ✓ should throw an error when trying to transfer more than balance (50ms)
    ✓ should return correct balances after transfering from another account (150ms)
    ✓ should throw an error when trying to transfer more than allowed (85ms)
  105 passing (3m)
  2 failing
  1) Contract: DipTge misceallenous tests should throw if token doesn`t mint:
     AssertionError: assert.fail()
      at it (test-available/etherisc/DipTge.js:683:20)
      at process._tickCallback (internal/process/next_tick.js:109:7)
  2) Contract: DipTokenMock should be constructed with the correct parameters:
      AssertionError: expected '1e+29' to equal '1e+26'
      + expected - actual
      -1e+29
      +1e+26
      
      at it (test-available/etherisc/DipToken.js:35:39)
      at process._tickCallback (internal/process/next_tick.js:109:7)
