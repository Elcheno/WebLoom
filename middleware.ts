import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
 
export default NextAuth(authConfig).auth;
 

// Matcher en este caso hace que en todas las rutas que encaje se salte la autorizacion.
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|doc|.*\\.png$).*)'],
};
