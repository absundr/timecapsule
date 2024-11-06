import { fail, redirect } from '@sveltejs/kit';

import { getCapsules } from '$lib/server/capsules';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user === null) {
    redirect(307, '/login');
  }
  const capsules = getCapsules(event.locals.user.id);
  return { user: event.locals.user, capsules };
};

export const actions: Actions = {
  default: async (event) => {
    if (event.locals.user === null) {
      throw fail(401);
    }
  },
};
