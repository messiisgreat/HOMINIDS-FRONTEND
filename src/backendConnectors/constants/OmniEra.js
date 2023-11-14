const OmniEra = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'systemContractAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_eraContractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'value',
        type: 'uint8',
      },
    ],
    name: 'BitcoinCrossChainCall__0',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'tokenId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ask',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__1',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__2',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
    ],
    name: 'BitcoinCrossChainCall__244',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'BitcoinCrossChainCall__255',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ask',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__3',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__4',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerPrice',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__5',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerId',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__6',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerId',
        type: 'uint64',
      },
    ],
    name: 'BitcoinCrossChainCall__7',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'value',
        type: 'uint8',
      },
    ],
    name: 'EVMChainCall__0',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'tokenId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ask',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__1',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__2',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
    ],
    name: 'EVMChainCall__244',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ask',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__3',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__4',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'paymentTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerPrice',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__5',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerId',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__6',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'action',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'listId',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'offerId',
        type: 'uint64',
      },
    ],
    name: 'EVMChainCall__7',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'beneficiary',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
    ],
    name: 'bytesToUint64',
    outputs: [
      {
        internalType: 'uint64',
        name: 'output',
        type: 'uint64',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eraContract',
    outputs: [
      {
        internalType: 'contract ERA',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'origin',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'chainID',
            type: 'uint256',
          },
        ],
        internalType: 'struct zContext',
        name: 'context',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'zrc20',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'onCrossChainCall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'systemContract',
    outputs: [
      {
        internalType: 'contract SystemContract',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

module.exports = OmniEra;
