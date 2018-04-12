module.exports = {

    networks: {
        mainnet: {
            network_id: 1, // Ethereum public network
            host: 'localhost',
            port: 8545,
            from: '0xfee595b6b4a30bfa12604a5ec92156f1b5a1607f',
            from2: '0xb77f7f6c5c916899ed6b40ee9b2bd05f8e71044c', // to unlock second account in parity
            gas: 6700000,
        },
        ropsten: {
            network_id: 3, // Official Ethereum test network
            host: 'localhost',
            port: 8545,
            from: '0xd70c89ba0b2ba918e23cb1ba73f7454da0e075d7',
            from2: '0xd70c89ba0b2ba918e23cb1ba73f7454da0e075d7', // to unlock second account in parity
            gas: 4700000,
        },
        kovan: {
            network_id: 42, // custom private network
            host: 'localhost',
            port: 8545,
            from: '0xd70c89ba0b2ba918e23cb1ba73f7454da0e075d7',
            from2: '0xd70c89ba0b2ba918e23cb1ba73f7454da0e075d7', // to unlock second account in parity
            gas: 6000000,
        },
        development: {
            // host: 'docker.for.mac.localhost',
            host: 'localhost',
            port: 9545,
            network_id: '*',
            // gas: 6000000,
        },
    },
};
