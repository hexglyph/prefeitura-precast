import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = (profile as any)?.email || (profile as any)?.preferred_username
      if (!email) return false
      const domain = email.split("@")[1]?.toLowerCase()
      const allowed = ["prodam.sp.gov.br", "prefeitura.sp.gov.br"]
      return allowed.includes(domain)
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
})

export { handler as GET, handler as POST }
