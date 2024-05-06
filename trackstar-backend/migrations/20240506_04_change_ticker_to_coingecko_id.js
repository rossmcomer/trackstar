module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('favorites', 'ticker', 'coingecko_id')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('favorites', 'coingecko_id', 'ticker')
  },
}
