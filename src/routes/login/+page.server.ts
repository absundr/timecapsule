import { setSessionTokenCookie, type Session } from '$lib/server/session';
import { login } from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  login: async (event) => {
    try {
      const data = await event.request.formData();
      const auth = data.get('auth') as string;
      const pass = data.get('password') as string;
      const result = await login(auth, pass);
      const { token, session } = result as { token: string; session: Session };
      setSessionTokenCookie(event, token, session.expiresAt);
      return { success: true };
    } catch (e) {
      if (e instanceof Error) {
        return fail(401, { error: e.message });
      }

      return fail(401, { error: 'There was an error signing you in.' });
    }
  },
} satisfies Actions;
