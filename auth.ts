import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getUserByEmail } from "@/app/lib/data/data.users";
import { registerUser } from "@/app/lib/actions/actions.auth";

// # Documentacion de NextAuth 5
// https://authjs.dev/getting-started/migrating-to-v5

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    signIn: async ({ user, account, profile, email, credentials }: any) => {
      try {
        // console.log(user, account, profile, email, credentials);
        const { email: userEmail, name, image: avatar_url } = user;
        const username: string | undefined = profile?.login as string ?? undefined;
        if (!userEmail || !name || !username) return false;
        const existUser = await getUserByEmail(userEmail);
  
        // console.log(existUser);
        if (existUser) {
          user.id = existUser.id;
          user.name = existUser.simple_username;

        } else {
          const formData = new FormData();
          formData.append('email', userEmail);
          formData.append('name', name);
          formData.append('username', username);
          if (avatar_url) formData.append('avatar_url', avatar_url);
          const response = await registerUser(formData);
          user.id = response.id;
          user.name = response.simple_username;
        }
        
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    jwt: async (data: any) => {
      // console.log(data);
      return data.token;
    },
    session: async ({session, token}: any) => {
      // console.log(session, token);
      session.user.id = token.sub ?? '';
      return session;
    }
  }
})
