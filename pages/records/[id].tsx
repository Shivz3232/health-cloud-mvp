import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsDownload } from 'react-icons/bs';

const Record = () => {
  const router = useRouter();
  const [record, setRecord] = useState<any>();

  useEffect(() => {
    const recordId = router.query.id as string;

    if (!recordId) return;

    axios
      .get(`/api/record?recordId=${recordId}`)
      .then(res => {
        setRecord(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [router]);

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-beta p-6">
      <div className="flex flex-col gap-10 p-4 shadow-lg ">
        <div>
          <h3 className="text-3xl">Description</h3>
          <p className="mt-2 text-xl text-justify">{record.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-3xl">Documents</h3>
          {record.documents.map((document: any, index: number) => (
            <div key={index}>
              <p>{document.createdAt}</p>
              {document.type == 'image' && (
                <div className="relative">
                  <img
                    src={document.url}
                    alt="image document"
                    className="w-full h-full"
                  />
                  <div className="absolute w-full h-14 p-4 flex justify-between items-center bg-gray-500 bg-opacity-50 bottom-0">
                    <p className="font-bold text-lg opacity-">
                      {document.name}
                    </p>
                    <button>
                      <BsDownload />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Record;
