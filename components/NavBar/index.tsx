import type { NextPage } from 'next';
import NavLink from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const NavBar: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="antialiased bg-alpha border-b-2 shadow-sm">
      <header className="lg:px-16 px-6 bg-bloack flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <a className="inline-flex items-center py-6 px-3 text-beta text-4xl font-bold cursive tracking-widest">
            <NavLink href="/">Health Cloud</NavLink>
          </a>
        </div>

        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input type="checkbox" className="hidden" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
              <li>
                <a className="my-6 inline-flex items-center py-3 px-3 rounded font-bold hover:text-beta">
                  <NavLink href="/">Home</NavLink>
                </a>
              </li>
              <li>
                {session ? (
                  <button
                    className="my-6 inline-flex items-center py-3 px-3 rounded font-bold hover:text-beta"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="my-6 inline-flex items-center py-3 px-3 rounded font-bold hover:text-beta"
                    onClick={() => signIn()}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
