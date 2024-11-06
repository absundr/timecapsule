import type { User } from '$lib/server/session';
import { register } from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  signup: async ({ request }) => {
    const data = await request.formData();
    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    } as Omit<User, 'id'>;
    try {
      await register(user);
      return { success: true };
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        return fail(403, { ...user, error: e.message });
      }

      return fail(403, { ...user, error: 'Unknown error has occoured. Please try again.' });
    }
  },
} satisfies Actions;
