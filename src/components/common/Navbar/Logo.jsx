import Link from 'next/link';

const Logo = (props) => {
  return (
    <Link href="/">
      <img className={props.className} src="/assets/navbar-logo/logo.png" alt="Logo" />
    </Link>
  );
};

export default Logo;
