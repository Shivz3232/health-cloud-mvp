import { NextPage } from 'next';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import SessionCard from '../../components/SessionCard';
import { useRouter } from 'next/router';

const Sessions: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/session/mysessions')
      .then(res => {
        setSessions(res.data.sessions);

        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (!session) {
    signIn();
  }

  return (
    <main className="h-screen flex flex-col bg-gamma">
      <div className="p-10 shadow-md">
        <h1 className="text-4xl">Your sessions</h1>
        <button
          className="px-8 py-3 bg-delta rounde-lg mt-4 shadow-md text-xl"
          onClick={() => router.push(`/`)}
        >
          New
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4 p-8 flex flex-col gap-2 flex-grow-0 overflow-y-auto">
          {/* @ts-ignore */}
          {sessions.map((session, index: number) => (
            <SessionCard key={index} session={session} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Sessions;
