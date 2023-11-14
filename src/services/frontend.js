export const getCollectionList = async () => {
  const mockData = [
    {
      id: 1,
      name: 'Hominid #1',
      image: '/assets/images/1.jpg',
      price: '15 $HOMI'
    },
    {
      id: 2,
      name: 'Hominid #2',
      image: '/assets/images/1.jpg',
      price: '10 $HOMI'
    },
    {
      id: 3,
      name: 'Hominid #3',
      image: '/assets/images/1.jpg',
      price: '20 $HOMI'
    },
    {
      id: 4,
      name: 'Hominid #4',
      image: '/assets/images/1.jpg',
      price: '30 $HOMI'
    },
  ];

  const data = await new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
  return data;
};

export const formatAddress = (address) => {
  if (!address) return '';
  return address.substring(0, 7) + '...' + address.substring(address.length - 4);
};

export const getIpfsUrl = (tokenURI) => {
  if (!tokenURI) return '';
  return tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
};
