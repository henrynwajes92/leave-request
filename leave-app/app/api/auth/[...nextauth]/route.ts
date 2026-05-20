import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 🔐 SECURITY: Only emails added here will be permitted to access the Admin Panel view.
const ADMIN_WHITELIST = [
  "henry.nwajes92@gmail.com", // 💡 Change this to your real Google or login email address
  "sogidi@otincubator.com",
  "jpl@cobaltspeech.com",
  "scott@cobaltspeech.com"
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // NextAuth matches these parameters to look at inputs submitted via our custom login form
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        role: { type: "text" } 
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // Clean up the email formatting to avoid accidental space matching bugs
        const email = credentials.email.toLowerCase().trim();
        const selectedRole = credentials.role?.toUpperCase() || "EMPLOYEE";

        // 🛡️ Admin Verification Check
        if (selectedRole === "ADMIN") {
          if (!ADMIN_WHITELIST.includes(email)) {
            // Throwing an explicit error pushes the message safely back to our custom page state
            throw new Error("ACCESS_DENIED");
          }
          return { 
            id: `admin_${Date.now()}`, 
            name: "System Admin", 
            email: email, 
            role: "ADMIN" 
          };
        }

        // 👥 Standard Employee Fallback Route
        // For development, any non-whitelisted email logging in under Employee slides through automatically
        const formattedName = email.split('@')[0];
        const readableName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

        return { 
          id: `emp_${Date.now()}`, 
          name: readableName, 
          email: email, 
          role: "EMPLOYEE" 
        };
      }
    })
  ],
  session: {
    strategy: "jwt", // Secures our user payloads via lightweight, signed browser cookies
  },
  callbacks: {
    // 1. Intercepts the authentication data and saves the user role flag into the token
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    // 2. Extracts the role parameter out of the encrypted token cookie and gives it to client components
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
    // 3. Automated Route Controller: Dictates where users land instantly when authorization processes complete
    async redirect({ token, baseUrl }: any) {
      if (token?.role === "ADMIN") {
        return `${baseUrl}/admin`;
      }
      return baseUrl; // Employee landing viewport at /
    }
  },
  // Tells NextAuth to look for our custom interface rather than using its built-in grey template
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };