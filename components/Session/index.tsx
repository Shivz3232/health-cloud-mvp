import { FC } from 'react';

interface props {
  session: any;
}

const Session: FC<props> = ({ session }) => {
  return (
    <div className="p-8 flex flex-col shadow-md text-xl">
      <p className="font-semibold">
        Name:{' '}
        <span className="font-normal">
          {session.patientId.firstName} {session.patientId.lastName}
        </span>
      </p>
      <p className="font-semibold">
        Created At:{' '}
        <span className="font-normal">
          {new Date(session.createdAt).toLocaleDateString()}
        </span>
      </p>
      <p className="font-semibold">
        Status: <span className="font-normal">{session.status}</span>
      </p>
    </div>
  );
};

export default Session;
