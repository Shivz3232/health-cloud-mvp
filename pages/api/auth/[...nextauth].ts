import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        // Add logic here to look up the user from the credentials supplied
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Email does not exist');
        }

        const passwordValid = bcrypt.compareSync(
          credentials.password,
          user.password
        );

        if (passwordValid) {
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          };
        } else {
          throw new Error('Invalid password');
        }
      },
    }),
  ],
});
