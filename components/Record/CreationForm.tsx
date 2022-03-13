import { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface props {
  sessionId: string;
}

const RecordCreationForm: FC<props> = ({ sessionId }) => {
  console.log(sessionId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // @ts-ignore
  const handler = e => {
    e.preventDefault();
    setLoading(true);

    const description = e.target.description.value;
    const file = e.target.document.files[0];

    axios
      .post(`/api/record?sessionId=${sessionId}`, { description })
      .then(() => {
        router.push(`/session/${sessionId}`);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <form
      className="flex flex-col items-start mt-10 p-4 gap-4"
      onSubmit={handler}
      id="record-form"
    >
      <div className="w-full flex flex-col p-2">
        <label htmlFor="description" className="text-xl p-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="h-8 mt-2 p-2 border-2 rounded-md"
        />
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="Document" className="text-xl p-2">
          Document
        </label>
        <input
          type="file"
          id="document"
          name="document"
          className="h-8 mt-2 p-2"
        />
      </div>
      <div className="flex justify-center w-full p-2 mt-2">
        <button
          type="submit"
          className="w-32 h-12 rounded-md bg-delta shadow-md hover:shadow-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RecordCreationForm;