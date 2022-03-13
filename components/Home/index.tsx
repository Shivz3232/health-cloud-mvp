import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Patient from './patient';
import Doctor from './doctor';

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session?.user.role == 'doctor') {
    return <Doctor />;
  } else {
    return <Patient />;
  }
};

export default Home;
