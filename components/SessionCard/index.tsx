import { FC } from 'react';
import Router from 'next/router';

interface props {
  session: any;
}

const Session: FC<props> = ({ session }) => {
  return (
    <div
      className="p-8 flex flex-col shadow-md text-xl cursor-pointer"
      onClick={() => Router.push(`/sessions/${session._id}`)}
    >
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
        Status:{' '}
        <span className="font-normal">
          {session.active ? 'Active' : 'Inactive'}
        </span>
      </p>
    </div>
  );
};

export default Session;
