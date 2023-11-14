import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { ethers } = require('ethers');
const { eraAbi, paymentTokenAbi } = require('./constants/Era');

const eraContractAddr = process.env.ERAADDRESS || '0x20Db444458edbF36fcA27b26fa368E45ca7A7401';
const paymentTokenAddr = process.env.USDCADDRESS || '0x524D004Bce13D5e455Fbfa048203AdC95987d57A';
const omniEraContractAddr =
  process.env.OMNICHAINERAADDRESS || '0x3229A00d9Ac24e202c97d172f02eB9b8B96DB2a5';
const to = process.env.TOADDRESS || '0x8531a5aB847ff5B22D855633C25ED1DA3255247e';
const { prepareData } = require('./prepareData');

export const requestAccount = async () => {
  try {
    if (typeof provider !== 'undefined') {
      await provider.request({
        method: 'eth_requestAccounts',
        params: [],
      });

      return { success: true };
    } else {
      return {
        success: false,
        msg: 'please connect your wallet',
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

// get provider
function getProvider() {
  const web3Provider = window.bitkeep && window.bitkeep.ethereum;
  const provider = new ethers.providers.Web3Provider(web3Provider);
  if (!provider) {
    window.open('https://web3.bitget.com/en/wallet-download?type=2');
    throw 'Please go to our official website to download!!';
  }
  return { provider: provider, chainId: provider.provider.networkId };
}

// export const storeVal = async () => {
//   try {
//     const { provider, chainId } = getProvider();
//     console.log({ chainId });

//     console.log('p : ', provider);

//     if (typeof provider !== 'undefined') {
//       const signer = provider.getSigner();

//       if (chainId == 7001) {
//         const contract = new ethers.Contract(eraContractAddr, eraAbi, signer);
//         const tx = await contract.storeVal('43');
//         await tx.wait();

//         const val = await contract.value();
//         console.log('Stored value:', val);
//       } else {
//         const data = prepareData(omniEraContractAddr, ['uint8', 'uint8'], ['0', '2']);
//         console.log('data : ', data);
//         const value = ethers.utils.parseEther('0');

//         const tx = await signer.sendTransaction({ data, to, value });
//         await tx.wait();
//       }

//       return {
//         success: true,
//         storedValue: val.toNumber(),
//       };
//     } else {
//       return {
//         success: false,
//         msg: 'Please connect your wallet!',
//       };
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return {
//       success: false,
//       msg: error.message,
//     };
//   }
// };

async function isNFTApproved(signer, contractAddr, nftAddr) {
  const signerAddr = await signer.getAddress();
  const erc721 = new ethers.Contract(
    nftAddr,
    ['function isApprovedForAll(address owner, address operator) view returns (bool)'],
    signer
  );
  return erc721.isApprovedForAll(signerAddr, contractAddr);
}

async function approveNFT(signer, nftAddr, contractAddr) {
  const erc721 = new ethers.Contract(
    nftAddr,
    ['function setApprovalForAll(address operator, bool approved)'],
    signer
  );
  const tx = await erc721.setApprovalForAll(contractAddr, true);
  await tx.wait();
}

export const list = async (prop) => {
  try {
    const { provider, chainId } = getProvider();
    const { nftAddress, tokendId, paymentToken } = prop;
    let ask = ethers.utils.parseEther(prop.ask);

    if (typeof provider !== 'undefined') {
      const signer = provider.getSigner();
      const signerAddr = await signer.getAddress();
      if (chainId == 7001) {
        const contract = new ethers.Contract(eraContractAddr, eraAbi, signer);

        // Check if the NFT is approved and if not, approve it
        const isApproved = await isNFTApproved(signer, eraContractAddr, nftAddress);

        if (!isApproved) {
          await approveNFT(signer, prop.nftAddress, eraContractAddr);
          toast.info('NFT has been approved for listing.', {
            position: 'top-right',
            autoClose: 5000,
          });
        }

        const tx = await contract.list(
          signerAddr,
          nftAddress,
          tokendId.toString(),
          paymentToken,
          ask.toString()
        );
        await tx.wait();

        toast.success('NFT has been successfully listed!', {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        const data = prepareData(
          omniEraContractAddr,
          ['uint8', 'address', 'uint64', 'address', 'uint64'],
          ['1', nftAddress, tokendId, paymentToken, ask.toString()]
        );

        // const value = ethers.utils.parseEther('0');

        const tx = await signer.sendTransaction({ data, to, value: 0 });
        await tx.wait();

        toast.success('NFT has been successfully listed!', {
          position: 'top-right',
          autoClose: 5000,
        });
      }

      return {
        success: true,
      };
    } else {
      toast.error('Please connect your wallet.', {
        position: 'top-right',
        autoClose: 5000,
      });

      return {
        success: false,
        msg: 'Please connect your wallet!',
      };
    }
  } catch (error) {
    toast.error('Error: ' + error.message, {
      position: 'top-right',
      autoClose: 5000,
    });

    return {
      success: false,
      msg: error.message,
    };
  }
};
export const getNftLists = async () => {
  try {
    // const { provider, chainId } = getProvider();
    const rpcUrl = 'https://rpc.ankr.com/zetachain_evm_athens_testnet';
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    console.log('zetachain : ', { provider });

    const signer = provider.getSigner();

    let getAllLists = [];
    const contract = new ethers.Contract(eraContractAddr, eraAbi, provider);

    const tx = await contract.marketplace();
    if (tx[3].toNumber()) {
      let list_length = tx[3].toNumber();
      for (let i = 0; i < list_length; i++) {
        let a = await contract.lists(i);
        getAllLists = [...getAllLists, a];
      }
    }

    console.log('getAllLists : ', { getAllLists });
    return getAllLists;
  } catch (error) {
    toast.error('Error: ' + error.message, {
      position: 'top-right',
      autoClose: 5000,
    });

    return {
      success: false,
      msg: error.message,
    };
  }
};

export const buy = async (id, ask) => {
  try {
    const { provider, chainId } = getProvider();
    const listId = id;

    if (typeof provider !== 'undefined') {
      const signer = provider.getSigner();
      const signerAddr = await signer.getAddress();

      if (chainId == 7001) {
        const contract = new ethers.Contract(eraContractAddr, eraAbi, signer);
        const paymentTokenContract = new ethers.Contract(paymentTokenAddr, paymentTokenAbi, signer);

        // Only for test, should be updated
        await paymentTokenContract.approve(eraContractAddr, ask + 1000);
        const tx = await contract.buy(signerAddr, listId, { gasLimit: 300000 });
        await tx.wait();

        toast.success('NFT has been successfully bought!', {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        const data = prepareData(omniEraContractAddr, ['uint8', 'uint64'], ['4', listId]);

        // const value = ethers.utils.parseEther('0');

        const tx = await signer.sendTransaction({ data, to, value: 0 });
        await tx.wait();

        toast.success('NFT has been successfully bought!', {
          position: 'top-right',
          autoClose: 5000,
        });
      }

      return {
        success: true,
      };
    } else {
      toast.error('Please connect your wallet.', {
        position: 'top-right',
        autoClose: 5000,
      });

      return {
        success: false,
        msg: 'Please connect your wallet!',
      };
    }
  } catch (error) {
    console.log('333333333333333', error);
    toast.error('Error: ' + error.message, {
      position: 'top-right',
      autoClose: 5000,
    });

    return {
      success: false,
      msg: error.message,
    };
  }
};
