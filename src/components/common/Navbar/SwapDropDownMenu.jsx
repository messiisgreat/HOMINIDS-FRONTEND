import Link from 'next/link';

// import { BiChevronDown } from 'react-icons/bi';

import classes from '@styles/compenentsStyle/common/Navbar/DropDownMenu.module.css';

const SwapDropDownMenu = () => {
  return (
    <div className={classes['menu-area']}>
      <p className="hover:text-secondary text-[14px]">
        Swap
        {/* <BiChevronDown className={classes.icon} /> */}
      </p>
      <ul>
        <li>
          <Link href="/raffle" className="hover:text-secondary">
            NFT_Transfer
          </Link>
        </li>
        <li>
          <Link href="/raffle" className="hover:text-secondary">
            Switch_Token
          </Link>
        </li>
        <li>
          <Link href="/raffle" className="hover:text-secondary">
            Bridge
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SwapDropDownMenu;

{
  /* <div className="dropdown">
<label tabIndex={0} className="cursor-pointer hover:text-secondary focus:text-secondary">
  Swap <BiChevronDown className="inline-block align-top text-2xl" />
</label>
<ul tabIndex={0} className="dropdown-content menu rounded-2xl bg-[#252525] p-3">
  <li className="whitespace-nowrap">
    <Link href="/raffle" className="hover:text-secondary">
      Airdrop
    </Link>
  </li>
  <li className="whitespace-nowrap">
    <Link href="/raffle" className="hover:text-secondary">
      Raffle
    </Link>
  </li>
</ul>
</div> */
}
