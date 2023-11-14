'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { ethers } = require('ethers');

const prepareData = (contract, types, args) => {
  const params = prepareParams(types, args);
  return `${contract}${params.slice(2)}`;
};

const prepareParams = (types, args) => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  for (let i = 0; i < args.length; i++) {
    if (types[i] === 'bytes32') {
      args[i] = ethers.utils.hexlify(ethers.utils.zeroPad(args[i], 32));
    }
  }
  return abiCoder.encode(types, args);
};

module.exports = { prepareData };
