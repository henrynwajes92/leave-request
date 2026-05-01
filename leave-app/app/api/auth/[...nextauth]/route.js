import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // Fake users (replace with DB later)
        const users = [
          { id: 1, email: "user@test.com", role: "employee" },
          { id: 2, email: "admin@test.com", role: "approver" },
        ];

        const user = users.find(u => u.email === credentials.email);

        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
});

export { handler as GET, handler as POST };