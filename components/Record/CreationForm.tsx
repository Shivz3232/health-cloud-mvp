import { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface props {
  sessionId: string;
}

const RecordCreationForm: FC<props> = ({ sessionId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // @ts-ignore
  const handler = e => {
    e.preventDefault();
    setLoading(true);

    const description = e.target.description.value;
    const files = e.target.document.files;

    const formData = new FormData();
    formData.append('description', description);

    for (let i = 0; i < files.length; i++) {
      formData.append('documents', files[i]);
    }

    axios
      .post(`/api/record?sessionId=${sessionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        router.push(`/sessions/${sessionId}`);
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
        <label htmlFor="description" className="text-2xl p-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="h-32 text-xl mt-2 p-2 border-2 rounded-md"
        />
      </div>
      <div className="flex flex-col p-2">
        <label htmlFor="Document" className="text-2xl p-2">
          Document
        </label>
        <input
          type="file"
          multiple
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
