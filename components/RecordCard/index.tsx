import { FC } from 'react';
import { RecordI } from '../../models/record';
import { BsPaperclip } from 'react-icons/bs';
import Router from 'next/router';

interface props {
  record: RecordI;
}

const SessionRecord: FC<props> = ({ record }) => {
  const recordUpdatedDate = new Date(record.updatedAt);
  const numAttachments = record.documents?.length;

  return (
    <div
      className="p-8 flex flex-col shadow-md cursor-pointer"
      onClick={() => Router.push(`/records/${record._id}`)}
    >
      <div className="flex justify-end items-center">
        <p>
          {recordUpdatedDate.toLocaleDateString()}{' '}
          {recordUpdatedDate.toLocaleTimeString()}
        </p>
      </div>

      <div>
        <p className="text-xl mt-4">{record.description}</p>
      </div>

      <div className="mt-4 flex items-center">
        <BsPaperclip />
        <p className="text-lg"> x {numAttachments ? numAttachments : 0}</p>
      </div>
    </div>
  );
};

export default SessionRecord;
