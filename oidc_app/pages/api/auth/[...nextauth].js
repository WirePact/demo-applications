import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    {
      id: 'oidc',
      name: 'oidc-provider',
      type: 'oauth',
      version: '2',
      wellKnown: process.env.OIDC_ISSUER,
      authorization: { params: { scope: 'openid' } },
      idToken: true,
      checks: ['state'],
      profile: ({ sub }) => ({
        id: sub,
        name: sub,
      }),
      clientId: process.env.OIDC_CLIENT_ID,
      clientSecret: process.env.OIDC_CLIENT_SECRET,
    },
  ],
  secret: process.env.OIDC_CLIENT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
