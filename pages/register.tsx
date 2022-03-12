import { NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const Register: NextPage = () => {
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const changeRole = (selectedRole: string) => {
    if (selectedRole == role) {
      setRole('');
    } else {
      setRole(selectedRole);
    }
  };

  // @ts-ignore
  const register = async e => {
    e.preventDefault();
    setError('');

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      setError('Please fill out all fields');
      return;
    }

    if (password != passwordConfirm) {
      return setError('Passwords do not match!');
    }

    if (!role) {
      return setError('Please select your role');
    }

    const success = await axios.post('/api/auth/signup', {
      email,
      password,
      firstName,
      lastName,
      role,
    });

    signIn('credentials', { callbackUrl: '/', email, password });
  };

  return (
    <main className="flex justify-center m-20">
      <div className="flex flex-col items-center p-12 bg-alpha rounded-lg border-2 shadow-lg">
        <h1 className="text-3xl md:text-5xl text-center">Create An Account</h1>
        <form
          className="flex flex-col items-start mt-10 p-4 gap-4"
          onSubmit={register}
        >
          <div className="flex flex-col p-2">
            <label htmlFor="firstName" className="text-xl">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="lastName" className="text-xl">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col p-2 w-full">
            <p className="text-xl">I&apos;m a </p>
            <div className="flex justify-between w-full mt-2 gap-2">
              <p
                className={`p-2 flex-grow border-2 rounded-md text-center cursor-pointer ${
                  role == 'patient' ? 'bg-delta shadow-sm' : ''
                }`}
                onClick={() => changeRole('patient')}
              >
                Patient
              </p>
              <p
                className={`p-2 flex-grow border-2 rounded-md text-center cursor-pointer ${
                  role == 'doctor' ? 'bg-delta shadow-sm' : ''
                }`}
                onClick={() => changeRole('doctor')}
              >
                Doctor
              </p>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col p-2 mt-2">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          <div className="flex flex-col p-2 mt-2">
            <label htmlFor="passwordConfirm" className="text-xl">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="confirmPassword"
              className="h-8 mt-2 p-2 border-2 rounded-md"
            />
          </div>
          {error ? (
            <p className="text-red-600 w-full text-center">{error}</p>
          ) : (
            <></>
          )}
          <div className="flex justify-center w-full p-2 mt-2">
            <button
              type="submit"
              className="w-32 h-12 border-2 rounded-md bg-gamma hover:shadow-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
