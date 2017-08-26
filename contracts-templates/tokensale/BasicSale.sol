/**
 * @title DIP Token
 * @dev The Decentralized Insurance Platform Token. 
 * @author Christoph Mussenbrock
 * @copyright 2017 Etherisc GmbH
 */

@@include('./util/snippets/templatewarning.txt')

pragma solidity @@include('./util/snippets/solidity_version_string.txt');

import "../../installed_contracts/zeppelin/contracts/token/MintableToken.sol";

contract BasicSale {
    using SafeMath for uint256;

    // the token being sold
    MintableToken public token;

    // address where funds are collected
    address public wallet;

    // amount of tokens emitted per wei
    uint256 public rate;

    // amount of raised money in wei
    uint256 public weiRaised;

    event TokenPurchase(address indexed investor, address indexed beneficiary, uint256 weiAmount, uint256 tokens);

    function BasicSale(
        uint256 _rate,
        address _wallet,
        MintableToken _token
    ) {
        require(_rate != 0);
        require(_wallet != 0);
        // require(address(token) != 0x0);

        // rate is expected to be >= 100 (calculated at USD/ETH = 250 and best case)
        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    function() payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        require(beneficiary != 0x0);
        require(msg.value != 0);

        processPurchase(beneficiary);
    }

    function processPurchase(address beneficiary) internal {
        uint256 weiAmount = msg.value;

        // calculate token amount to be created 
        uint256 tokens = weiAmount.mul(rate);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();

    }

    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }
}