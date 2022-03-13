import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Doctor = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  // @ts-ignore
  const handler = async e => {
    e.preventDefault();

    const code = e.target.code.value;

    if (!code) {
      return setError('Please enter a code');
    }

    const result = await axios
      .post('/api/session/create', { code })
      .then(res => {
        return {
          success: true,
          data: res.data,
        };
      })
      .catch(err => {
        return {
          success: false,
          data: err,
        };
      });

    if (!result.success) {
      return setError(
        'Failed to initiate session, make sure the code is valid.'
      );
    }

    router.push(`/session/${result.data.session.id}`);
  };

  return (
    <main className="h-screen bg-gamma">
      <div className="flex justify-center items-center p-10">
        <p className="text-4xl font-semibold">Enter Code</p>
      </div>
      <form className="flex flex-col gap-10 items-center" onSubmit={handler}>
        <input
          type="text"
          id="code"
          name="code"
          placeholder="a8dku8"
          className="w-1/2 h-14 text-2xl p-6"
          maxLength={6}
        />
        {error ? (
          <p className="text-red-600 w-full text-center">{error}</p>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="text-xl border-2 bg-alpha shadow-md px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Doctor;
