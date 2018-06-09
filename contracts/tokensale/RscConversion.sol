pragma solidity 0.4.24;


import "zeppelin-solidity/contracts/token/ERC20.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import "./DipTgeInterface.sol";


contract RscConversion is Ownable {
    using SafeMath for uint256;

    ERC20 RSC; // RSC token contract
    DipTgeInterface DipTge; // DIP tokensale contract
    address wallet; // Wallet to collect RSC tokens
    uint256 DipMaximumSupply = 10**9 * 10**18;
    uint256 RscTotalSupply = 319810895 * 10**3; // TODO: Verify this number.

    event Conversion(address _rsc, uint256 _rscAmount, uint256 _dipAmount);

    constructor(address _rscToken, address _wallet) public {
      require(_rscToken != 0x0);
      require(_wallet != 0x0);

      DipTge = DipTgeInterface(msg.sender);
      RSC = ERC20(_rscToken);
      wallet = _wallet;
    }

    function calculateDipAmount(uint256 _rscAmount) public constant returns (uint256 _dipAmount) {
        _dipAmount = _rscAmount.mul(DipMaximumSupply).div(10).div(RscTotalSupply);
    }

    function convert(uint256 _rscAmount) public {
        require(_rscAmount > 0);
        require(DipTge.conversionIsAllowed(msg.sender));
        require(DipTge.getContributorAllowance(msg.sender) > 0);
        require (RSC.transferFrom(msg.sender, wallet, _rscAmount));

        uint256 dipAmount = calculateDipAmount(_rscAmount);
        DipTge.allocateForExchange(msg.sender, dipAmount);

        emit Conversion(msg.sender, _rscAmount, dipAmount);
    }
}
