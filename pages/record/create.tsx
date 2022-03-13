import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import RecordCreationForm from '../../components/Record/CreationForm';

const CreateRecord: NextPage = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    setSessionId(router.query.sessionId as string);
  }, [router]);

  return (
    <main className="h-screen flex justify-center items-center p-8 bg-gamma">
      <div className="flex-grow p-2 shadow-lg rounded-md">
        <h1 className="w-full text-center text-3xl">Upload new record</h1>
        {/* @ts-ignore */}
        <RecordCreationForm sessionId={sessionId} />
      </div>
    </main>
  );
};

export default CreateRecord;
