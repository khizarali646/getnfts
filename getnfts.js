require('dotenv').config();
const {Network, Alchemy} = require("alchemy-sdk");
const CHAINS = [
    Network.ETH_MAINNET,
    Network.ETH_GOERLI,
    Network.MATIC_MAINNET,
    Network.MATIC_MUMBAI
]

/**
 *
 * @param ownerAddress
 * @returns {Promise<{}>}
 */
const getNFTs = async ({ownerAddress}) => {
    const nftList = {};

    for (const CHAIN of CHAINS) {
        try {
            const config = {
                apiKey: process.env[CHAIN],
                network: CHAIN,
            };

            const alchemy = new Alchemy(config);
            const nfts = await alchemy.nft.getNftsForOwner(ownerAddress);
            console.log(nfts);
            nftList[CHAIN] = {
                totalCount: nfts["totalCount"],
                nfts: nfts["ownedNfts"]
            }
        } catch (e) {
            console.log(e)
        }
    }

    return nftList;
};


module.exports = {
    getNFTs
}