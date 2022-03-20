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

  const endSession = () => {
    axios
      .post('/api/session/end', {
        sessionId,
      })
      .then(res => {
        router.push('/sessions');
      })
      .catch(err => {
        setError(err.message);
      });
  };

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

        <div className="mt-4">
          <p className="font-semibold">
            Started:{' '}
            <span className="font-light">
              {new Date(sessionData.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        {!sessionData.active && (
          <div className="mt-4">
            <p className="font-semibold">
              Ended:{' '}
              <span className="font-light">
                {new Date(sessionData.updatedAt).toLocaleString()}
              </span>
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            className="px-8 py-3 bg-delta rounde-lg shadow-md text-xl disabled:bg-slate-300"
            onClick={() =>
              router.push(`/records/create?sessionId=${sessionId}`)
            }
            disabled={!sessionData.active}
          >
            New
          </button>
        </div>

        <div className="mt-4">
          <button
            className="px-8 py-3 bg-red-400 rounde-lg shadow-md text-xl disabled:bg-slate-300"
            onClick={endSession}
            disabled={!sessionData.active}
          >
            End Session
          </button>
        </div>
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
