import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="h-screen flex flex-col items-center bg-gamma">
      <section className="h-1/2 flex justify-content-center items-center p-10">
        <p className="text-4xl text-center font-bold">
          Simplify and sreamline recordkeeping of your health with Health Cloud!
        </p>
      </section>
      <section className="flex justify-content-center items-center">
        <button
          className="px-10 py-8 border-2 bg-alpha shadow-md rounded-lg text-3xl font-semibold"
          onClick={() => (session ? router.push('/getstarted') : signIn())}
        >
          Begin
        </button>
      </section>
    </main>
  );
};

export default Home;
