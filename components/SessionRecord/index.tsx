import { FC } from 'react';

interface props {
  record: {
    description: string;
  };
}

const SessionRecord: FC<props> = ({ record }) => {
  return (
    <div className="p-8 flex flex-col shadow-md">
      <p className="text-xl">{record.description}</p>
    </div>
  );
};

export default SessionRecord;
