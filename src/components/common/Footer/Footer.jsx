import Link from 'next/link';
import { FaDiscord,FaInstagram } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';

const footerLinks = [
  {
    title: 'Marketplace',
    links: [
      {
        text: 'Explore',
        link: 'explore',
      },
      {
        text: 'Fan Pass',
        link: '/',
      },
      {
        text: '$Homi token',
        link: '/',
      },
      {
        text: 'Copyright Policy',
        link: '/',
      },
    ],
  },
  {
    title: 'My Account',
    links: [
      {
        text: 'Profile',
        link: '/',
      },
      {
        text: 'Favorites',
        link: '/',
      },
      {
        text: 'Watchlist',
        link: '/',
      },
      {
        text: 'Settings',
        link: '/',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Contact Us',
        link: 'emailto:',
      },
      {
        text: 'Partners',
        link: 'https://hominids.io/partners/',
      },
      {
        text: 'Docs',
        link: 'https://hominids.gitbook.io/hominids/',
      },
      {
        text: 'FAQs',
        link: 'https://hominids.io/faq/',
      },
    ],
  },
];

const FooterCol = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-40">
      {footerLinks.map((footerLink) => (
        <ul key={footerLink.title}>
          <li className="pb-2 capitalize">{footerLink.title}</li>
          {footerLink.links.map((link) => (
            <li key={link.link} className="mt-4 text-sm capitalize opacity-70">
              <Link href={link.link} className=" gradient-text">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-32 border-t border-[#343434] pt-12 pb-56">
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center justify-between">
        <ul className="flex flex-col gap-5">
          <li>
            <Link href="https://discord.gg/hominids" className="gradient-text flex flex-row items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865f2]">
                <FaDiscord className="text-base text-main" />
              </span>
              Discord
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/_hominids_/" className="gradient-text flex flex-row items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a99ec]">
                <AiOutlineTwitter className="text-base text-main" />
              </span>
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com/_hominids" className="gradient-text flex flex-row items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2197d4]">
                <FaInstagram className="text-base text-main" />
              </span>
              Instagram
            </Link>
          </li>
        </ul>
        <div className='mt-12'>
          <FooterCol />
        </div>
      </div>
    </div>
  );
};

export default Footer;
