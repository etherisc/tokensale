#!/usr/bin/env node

const Ganache = require('ganache-cli');
const log = require('../util/logger');

const options = {
    port: 9545,
    accounts: [
        { secretKey: '0xfbdab455fa027cfcc5b847b4541f0d9b3ee9f176bcc2dd60acdbb26c30e00001', balance: 1000000000000000000000000, }, // 0
        { secretKey: '0xcba39ec99dfca0db448b4bafad7049b7a504c6557a53c65bb4ef0cc219300001', balance: 1000000000000000000000000, }, // 1
        { secretKey: '0x7e2b1d0ae9f7bb8e935ac215ab42e8342bd31830a570cf08c9c2a2a5a4400002', balance: 1000000000000000000000000, }, // 2
        { secretKey: '0xee49329dbe74c4d2866a7d0278b3110749fa03e7404021d2d15810c1b8f00003', balance: 1000000000000000000000000, }, // 3
        { secretKey: '0x945377fad41211126252e15f9390dd20ffb43f4d637eda54b8e6b9c10eb00004', balance: 1000000000000000000000000, }, // 4
        { secretKey: '0x945377fad41211126252e15f9390dd20ffb43f4d637eda54b8e6b9c10eb00005', balance: 1000000000000000000000000, }, // 5
        { secretKey: '0x945377fad41211126252e15f9390dd20ffb43f4d637eda54b8e6b9c10eb00007', balance: 1000000000000000000000000, }, // 6
    ],
    // debug: true,
    logger: { log: log.info, },
    blocktime: 0,
    vmErrorsOnRPCResponse: true,
};

const server = Ganache.server(options);

server.listen(options.port, (err, result) => {
    if (err) {
        log.error(err);
    } else {
        const state = result || server.provider.manager.state;
        log.info('EthereumJS TestRPC');

        log.info('Accounts:');
        Object.keys(state.accounts).forEach((address, index) =>
            log.info(`(${index}) ${address}${state.isUnlocked(address) === false ? ' 🔒' : ''}, pKey: ${state.accounts[address].secretKey.toString('hex')}`));

        log.info(`Listening on ${(options.hostname || 'localhost')}:${options.port}`);
    }
});
