import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className="h-screen flex flex-col items-center bg-gamma">
      <section className="h-1/2 flex justify-content-center items-center p-14">
        <p className="text-5xl text-center font-bold">
          Simplify and sreamline recordkeeping of your health with Health Cloud!
        </p>
      </section>
      <section className="flex justify-content-center items-center">
        <a>
          <Link href="/getstarted" passHref>
            <button className="px-10 py-8 border-2 bg-alpha shadow-md rounded-lg text-3xl font-semibold">
              Begin
            </button>
          </Link>
        </a>
      </section>
    </main>
  );
};

export default Home;
