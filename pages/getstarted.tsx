import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const GetStarted: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [code, setCode] = useState('');

  useEffect(() => {
    axios
      .post('/api/code')
      .then(res => {
        setCode(res.data.code);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [router, session]);

  return (
    <main className="h-screen flex flex-col items-center bg-gamma">
      <section className="flex justify-content-center items-center p-10">
        <p className="text-5xl text-center font-bold">
          Share the below code with your doctor to get started.
        </p>
      </section>
      <section className="flex justify-content-center items-center p-10">
        {code ? (
          <p className="text-3xl text-center font-bold p-4 bg-white rounded-lg shadow-inner shadow-gamma">
            {code}
          </p>
        ) : (
          <p className="text-3xl text-center font-bold">Loading...</p>
        )}
      </section>
      <section className="p-10">
        <p className="italic">This code is valid only for five minutes</p>
      </section>
    </main>
  );
};

export default GetStarted;
