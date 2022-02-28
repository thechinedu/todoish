import Logo from "@components/Icons/Logo";

import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <Link href="/login">
          <a>Log in</a>
        </Link>

        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
