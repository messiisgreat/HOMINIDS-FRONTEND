import React from 'react';
import Menu from './Menu';
import classes from '@styles/compenentsStyle/common/LeftMenu/LeftMenu.module.css';

const LeftMenu = ({ isShowMenu, setisShowMenu }) => {
  const items = [
    {
      id: 1,
      label: 'Marketplace',
      image: '/assets/LeftMenu/marketPlace.png',
      children: [
        {
          id: 2,
          label: 'Ranking',
          link: '#'
        },
        {
          id: 3,
          label: 'Popular Collection',
          link: '#',
        },
        {
          id: 4,
          label: 'Auction',
          link: '#'
        },
        {
          id: 5,
          label: 'Favorite',
          link: '#',
        },
      ],
    },
    {
      id: 1,
      label: 'Launchpad',
      image: '/assets/LeftMenu/launchpad.png',
      children: [
        {
          id: 2,
          label: 'Apply To Launchpad',
          link: '#'
        },
        {
          id: 3,
          label: 'Upcoming Drop',
          link: '#',
        },
        {
          id: 4,
          label: 'Lottery Drops',
          link: '#'
        },
        {
          id: 5,
          label: 'NFT Airdrop',
          link: '#',
        },
      ],
    },
    {
      id: 1,
      label: 'Games',
      image: '/assets/LeftMenu/games.png',
      children: [
        {
          id: 2,
          label: 'Quests & Adventures',
          link: '#'
        },
        {
          id: 3,
          label: 'Player-Owned Assets',
          link: '#',
        },
        {
          id: 4,
          label: 'Connect To Homiverse',
          link: '#'
        },
        {
          id: 5,
          label: 'Discover WEB3 Game',
          link: '#',
        },
      ],
    },
    {
      id: 1,
      label: 'Creators',
      image: '/assets/LeftMenu/creator.png',
      children: [
        {
          id: 2,
          label: 'NFT Bundles',
          link: '#'
        },
        {
          id: 3,
          label: 'Verified Creators',
          link: '#',
        },
        {
          id: 4,
          label: 'NFT Fractionalization',
          link: '#'
        },
        {
          id: 5,
          label: 'AI-Generated Art',
          link: '#',
        },
      ],
    },
    {
      id: 6,
      label: 'Cross-Chain Hub',
      image: '/assets/LeftMenu/crosschain.png',
      children: [
        {
          id: 7,
          label: 'Secure Asset Vault',
          children: [
            {
              id: 8,
              label: 'Instant Deposit',
              link: '#',
            },
            {
              id: 9,
              label: 'Fiat On-Ramp',
              link: '#',
            },
            {
              id: 10,
              label: 'Liquidity Pool Deposits',
              link: '#',
            },
            {
              id: 10,
              label: 'Automated Diversification',
              link: '#',
            },
          ],
        },
        {
          id: 10,
          label: 'Multi-Chain Deposits',
          children: [
            {
              id: 8,
              label: 'Seamless Swaps',
              link: '#',
            },
            {
              id: 9,
              label: 'Liquidity Optimization',
              link: '#',
            },
            {
              id: 10,
              label: 'Cross-Chain Yield Farming',
              link: '#',
            },
            {
              id: 10,
              label: 'Stablecoin Swaps',
              link: '#',
            },
          ],
        },
        {
          id: 10,
          label: 'Multi-Chain Deposits',
          children: [
            {
              id: 8,
              label: 'Cold Wallet Integration',
              link: '#',
            },
            {
              id: 9,
              label: 'Multi-Signature Transactions',
              link: '#',
            },
            {
              id: 10,
              label: 'Privacy-Enhanced Transfers',
              link: '#',
            },
            {
              id: 10,
              label: 'Escrow Services',
              link: '#',
            },
          ],
        },
        {
          id: 10,
          label: 'Multi-Chain Deposits',
          children: [
            {
              id: 8,
              label: 'Chain Performance Metrics',
              link: '#',
            },
            {
              id: 9,
              label: 'Historical Data Analysis',
              link: '#',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      label: 'Community Hub',
      image: '/assets/LeftMenu/community.png',
      children: [
        {
          id: 2,
          label: 'Collectors Spotlight',
          link: '#'
        },
        {
          id: 3,
          label: 'NFT Education Hub',
          link: '#',
        },
        {
          id: 4,
          label: 'NFT Voting',
          link: '#'
        },
      ],
    },
    {
      id: 1,
      label: 'Support',
      image: '/assets/LeftMenu/support.png',
      children: [
        {
          id: 2,
          label: 'Customer Service',
          link: '#'
        },
        {
          id: 3,
          label: 'Policy updates',
          link: '#',
        },
      ],
    },
  ];

  return (
    <div
      className={`${isShowMenu ? "w-[310px]" : "w-[63px]"
        } transition-width bg-black/10 h-screen overflow-auto fixed shadow top-0 left-0 z-20 py-20 border-r border-[#333] ${classes.scroll} px-3`}

      onMouseEnter={() => setisShowMenu(true)}
      onMouseLeave={() => setisShowMenu(false)}
    >

      <div
        className={classes['left-menu']}
      >
        <ul>
          <Menu items={items} isShow={isShowMenu} classes={classes} />
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
