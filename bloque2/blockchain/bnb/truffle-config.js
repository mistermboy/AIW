const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider({
   privateKeys: ['18b0d7072d738b7ebf575886e911921d6b5501d8428771ef95b2f2a0e5d1a5d5'],
   providerOrUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',

})


module.exports = {
  networks: {
    binanceTestnet: {
      provider: () => provider,
      network_id: "97",
      gas: 1000000
    },
    develop: {
      port: 8545
    }
  }
};
