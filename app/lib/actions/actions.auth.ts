"use server";

import { AuthError } from 'next-auth'
import { signIn, signOut, auth } from '@/auth'
import { insertUser } from '@/app/lib/actions/actions.user';

export async function logOut() {
  try {
    await signOut({ redirect: true, redirectTo: '/login' });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSession() {
  try {
    const session = await auth();
    console.log(await auth());
    if (!session?.user) return null;
    return session;
  } catch (error) {
    throw error;
  }
}

export async function isSession() {
  try {
    const session = await getSession();
    if (!session?.user) return false;
    return true;
  } catch (error) {
    throw error;
  }
}

export async function authenticateWithGithub() {
  try {
    await signIn('github');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    console.error(error);
    throw error;
  }
}

export async function registerUser(formData: FormData) {
  try {
    const response = await insertUser(formData);
    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
}
