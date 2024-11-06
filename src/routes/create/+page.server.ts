import { createCapsule, type NewCapsule } from '$lib/server/capsules';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const MAX_SIZE = 20000000;

//TODO:
// 1. Compress file
export const actions = {
  create: async ({ locals, request }) => {
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
      return { sucess: true, ...newCapsule };
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        return fail(400, { error: e.message, ...newCapsule });
      }

      return fail(400, { error: 'Something went wrong', ...newCapsule });
    }
  },
} satisfies Actions;
