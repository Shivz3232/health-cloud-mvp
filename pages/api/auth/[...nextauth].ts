import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import dbConnect from '../../../utils/dbConnect';

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
        await dbConnect();
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
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account && user) {
        const userDoc = await User.findOne(
          { email: token.email },
          '-password -createdAt -updatedAt -__v'
        );

        if (!userDoc) {
          throw new Error("User doesn't exist");
        }

        token.user = userDoc.toObject();

        return token;
      } else {
        return token;
      }
    },
    async session({ session, user, token }) {
      if (token) {
        // @ts-ignore
        session.user = token.user;
      }

      return session;
    },
  },
});
