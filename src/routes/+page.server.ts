import { createCapsule, getCapsules, type NewCapsule } from '$lib/server/capsules';
import { deleteSessionTokenCookie } from '$lib/server/session';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const MAX_SIZE = 20000000;

export const load: PageServerLoad = async (event) => {
  if (event.locals.user === null) {
    redirect(307, '/login');
  }
  const capsules = getCapsules(event.locals.user.id);
  return { user: event.locals.user, capsules };
};

//TODO:
// 1. Compress file
export const actions = {
  create: async ({ locals, request }) => {
    if (locals.user === null) {
      throw fail(401);
    }
    const data = await request.formData();
    const newCapsule = {
      userId: locals.user.id,
      title: data.get('title'),
      message: data.get('message'),
      sendOn: data.get('sendOn'),
      picture: null,
    } as NewCapsule;
    try {
      const user = locals.user.id;
      const file = data.get('picture') as File;
      if (file.size) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          throw new Error('Invalid file type');
        }
        if (file.size > MAX_SIZE) {
          throw new Error('Max file size 20MB');
        }

        const type = file.type.split('/')[1];
        const fileName = crypto.randomUUID() + '.' + type;
        await Bun.write(`./user-asset/${user}/${fileName}`, await file.arrayBuffer(), {
          createPath: true,
        });
        newCapsule.picture = fileName;
      }
      createCapsule(newCapsule);
      return { sucess: true };
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        return fail(400, { error: e.message, ...newCapsule });
      }

      return fail(400, { error: 'Something went wrong', ...newCapsule });
    }
  },
  logout: async (event) => {
    deleteSessionTokenCookie(event);
    return { logout: true };
  },
} satisfies Actions;
