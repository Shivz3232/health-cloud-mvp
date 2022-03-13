import { NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignIn: NextPage = () => {
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  // @ts-ignore
  const hanlder = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn('credentials', { redirect: false, email, password }).then(
      (data: any) => {
        if (data.error) {
          setError(data.error);
        } else {
          router.push('/');
        }
      }
    );
  };

  return (
    <main className="flex justify-center m-20">
      <div className="flex flex-col items-center p-12 bg-alpha rounded-lg border-2 shadow-lg">
        <form
          className="flex flex-col items-start mt-10 p-4 gap-4"
          onSubmit={hanlder}
        >
          <div className="flex flex-col p-2">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col p-2 mt-2">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          {error ? (
            <p className="text-red-600 w-full text-center">{error}</p>
          ) : (
            <></>
          )}
          <div className="flex justify-center w-full p-2 mt-2">
            <button
              type="submit"
              className="w-32 h-12 border-2 rounded-md bg-gamma hover:shadow-md"
            >
              Login In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
