import { FC } from 'react';
import { RecordI } from '../../models/record';

interface props {
  record: RecordI;
}

const SessionRecord: FC<props> = ({ record }) => {
  const recordUpdatedDate = new Date(record.updatedAt);

  return (
    <div className="p-8 flex flex-col shadow-md">
      <div className="flex justify-end items-center">
        <p>
          {recordUpdatedDate.toLocaleDateString()}{' '}
          {recordUpdatedDate.toLocaleTimeString()}
        </p>
      </div>

      <p className="text-xl mt-4">{record.description}</p>

      <div></div>
    </div>
  );
};

export default SessionRecord;
