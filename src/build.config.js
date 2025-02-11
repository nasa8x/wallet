export default {
  defaultAssets: {
    mainnet: [
      'BTC',
      'ETH',
      'DAI',
      'USDC',
      'USDT',
      'WBTC',
      'UNI',
      'RBTC',
      'SOV'
    ],
    testnet: [
      'BTC',
      'ETH',
      'DAI',
      'RBTC',
      'BNB'
    ]
  },
  agentEndpoints: {
    testnet: ['https://liquality.io/swap-testnet/agent'],
    mainnet: ['https://liquality.io/swap/agent']
  },
  telegramUrl: 'https://t.me/liquality',
  networks: ['mainnet', 'testnet'],
  chains: ['BTC', 'ETH', 'RBTC', 'BNB']
}
