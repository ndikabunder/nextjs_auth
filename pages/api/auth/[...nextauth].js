import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: 'Connection Failed';
        });

        // Check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error('No user Found with email Please Sign Up');
        }

        // Compare Password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // Incorrect Password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Passsword doesn't match");
        }

        return result;
      },
    }),
  ],
  secret: 'G3tK6c60nhXQsAWzaVCLTfzdX8pX6byCx/NXTxllPfI=',
});
