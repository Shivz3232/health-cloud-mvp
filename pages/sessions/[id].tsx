import { NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import RecordCard from '../../components/RecordCard';

const Session: NextPage = () => {
  const router = useRouter();
  const { id: sessionId } = router.query;

  const [sessionData, setSessionData] = useState<any>();
  const [sessionRecords, setSessionRecords] = useState<[]>([]);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId)
      axios
        .get('/api/session', {
          params: {
            sessionId,
          },
        })
        .then(res => {
          setSessionData(res.data.sessionData);
          setSessionRecords(res.data.sessionRecords);

          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
  }, [sessionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="h-screen flex flex-col bg-gamma">
      <div className="p-10 shadow-md">
        <h1 className="text-4xl">
          {sessionData.patientId.firstName} {sessionData.patientId.lastName}
          &apos;s records
        </h1>
        <p className="mt-4 font-semibold">
          Started:{' '}
          <span className="font-light">
            {new Date(sessionData.createdAt).toLocaleDateString()}
          </span>
        </p>
        <button
          className="px-8 py-3 bg-delta rounde-lg mt-4 shadow-md text-xl"
          onClick={() => router.push(`/record/create?sessionId=${sessionId}`)}
        >
          New
        </button>
      </div>
      <div className="mt-4 p-8 flex flex-col gap-2 flex-grow-0 overflow-y-auto">
        {/* @ts-ignore */}
        {sessionRecords.map((record, index: number) => (
          <RecordCard key={index} record={record} />
        ))}
      </div>
    </main>
  );
};

export default Session;
