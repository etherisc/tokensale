module.exports = {
    networks: {
        mainnet: {
            network_id: 1, // Ethereum public network
            host: 'localhost',
            port: 8545,
            from: '0xd4d3e122ba3e69b8b42505a89c73dee03b72e31e',
            gas: 6700000,
            gasPrice: 60000000000,
        },
        ropsten: {
            network_id: 3, // Official Ethereum test network
            host: 'localhost',
            port: 8545,
            from: '0xd4d3e122ba3e69b8b42505a89c73dee03b72e31e',
            gas: 6600000,
        },
        kovan: {
            network_id: 42, // custom private network
            host: 'localhost',
            port: 8545,
            from: '0xd4d3e122ba3e69b8b42505a89c73dee03b72e31e',
            gas: 4700000,
        },
        development: {
            host: 'localhost',
            gas: 6600000,
            port: 9545,
            network_id: '*',
        },
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
};
