export const QUERY_KEY = {
  COLLECTION_LIST: 'COLLECTION_LIST',
};

export const RPC_TESTNET = {
  fullnode: 'https://fullnode.testnet.sui.io/',//'https://rpc-testnet.suiscan.xyz/',
  faucet: 'https://explorer-rpc.testnet.sui.io/gas',
  websocket: 'wss://rpc-testnet.suiscan.xyz/websocket'
};

export const RPC = {
  fullnode: 'https://fullnode.mainnet.sui.io/',//'https://rpc-testnet.suiscan.xyz/', //'http://0.0.0.0:9000',
  faucet: 'https://explorer-rpc.testnet.sui.io/gas',
  websocket: 'wss://sui-mainnet-endpoint.blockvision.org/websocket'
};

const STAKING_CONTRACT = '0x86fb9a85e3cfcc990f784ec8728bed55736adffea8c3b63f9dfb650957aabb40';

const LOCAL_MARKETPLACE_CONTRACT = '0xd269c3b7ce2938849940542386940886e5a755f70cc45a6193fcc508cc52f9fa';

export const SMART_CONTRACTS = {
  NFT_TYPE: '0xc3fa73e68e5324871e0c9b2e67f61c3a594a62ab4b1128e781c5280f2702d116::bluemove_launchpad::HOMINIDS',
  COIN_TYPE: '0xf6e7fcac642280ba427bc1b3e158a169fa0624cad36cd79fc931aba3502880a5::homi::HOMI',
	STAKE_FUNCTION: STAKING_CONTRACT+'::staking::stake',
  UNSTAKE_FUNCTION: STAKING_CONTRACT+'::staking::unstake',
  CLAIM_FUNCTION: STAKING_CONTRACT+'::staking::claim_rewards',
  RECEIPT_TYPE: STAKING_CONTRACT+'::staking::StakeReceipt',
  VAULT_ADDRESS: '0x9b717a01b11b1eb14ce7e97c8c9432cef97f2574fb6fe6124280b901d9b7e6f3',
  CLOCK_ADDRESS: '0x0000000000000000000000000000000000000000000000000000000000000006',
  
  RAFFLE_ADDRESS: '0x42a47f1af43a4d031779fe13dca4da18e0c773f09a8dc5ef29e831cfd65f6080',
  JOIN_RAFFLE_FUNCTION: '0x42a47f1af43a4d031779fe13dca4da18e0c773f09a8dc5ef29e831cfd65f6080::raffle::join_raffle',
  

  LOCAL_MARKETPLACE_ID: '0x944a34a441e3afbbb27924648023998ccabad99ba719df4f5310ef4034178472',
  LOCAL_ROYALTY_ID: '0x2b10096708612f076c54d70c7e9ca800b61b055d3faa9587e75906c5e8d6c6bd',

  LOCAL_LIST_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::list',
  LOCAL_BUY_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::buy_and_take',
  LOCAL_DELIST_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::delist_and_take',
  LOCAL_CHANGE_PRICE_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::change_price',

  LOCAL_MAKE_OFFER_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::make_offer',
  LOCAL_ACCEPT_OFFER_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::accept_offer',
  LOCAL_REMOVE_OFFER_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::remove_offer',

  LOCAL_AUCTION_LIST_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::listAuction',
  LOCAL_AUCTION_BID_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::bid',
  LOCAL_AUCTION_END_FUNCTION: LOCAL_MARKETPLACE_CONTRACT+'::marketplace::end_auction',

  COINS:{
    "SUI": "0x2::sui::SUI",
    "HOMITOKEN": "0xee5b1b2f649d0531d909b620e7141751a828eb26b5cbb7fc87722e72cd54586f::homitoken::HOMITOKEN",
    "HOMI": "0xf6e7fcac642280ba427bc1b3e158a169fa0624cad36cd79fc931aba3502880a5::homi::HOMI",
  },

  MINT_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::public_mint',
  WHITELIST_MINT_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::whitelist_mint',
  FREEMINT_MINT_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::free_mint',
  NFT_COLLECTION_ADDRESS: '0x2c65738e33e0dbd2504f9c89832862934779ca267c32ab5de40f30388bc6486e',
  DEPLOY_RARITIES_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::deploy_rarity',
  DEPLOY_WHITELIST_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::add_whitelist',
  DEPLOY_FREEMINT_FUNCTION: '0xabcfb562f26105ca94443d628d8d3d96f7c6dcb8983fb1bebfa5a539d204fcc0::hominidscradle::add_freemint',

};