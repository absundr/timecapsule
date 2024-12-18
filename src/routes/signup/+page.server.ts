import type { User } from '$lib/server/session';
import { register, verify } from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

async function sendCode(code: string, email: string) {
  if (process.platform === 'win32') {
    await Bun.$`wsl -e bash src/scripts/verification-code-mailer.sh ${email} ${code}`;
  } else {
    await Bun.$`bash src/scripts/verification-code-mailer.sh ${email} ${code}`;
  }
}

export const actions = {
  signup: async ({ request }) => {
    const data = await request.formData();
    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    } as Omit<User, 'id'>;
    try {
      const { code } = await register(user);
      await sendCode(code, user.email);
      return { success: true, step: 'verify', ...user };
    } catch (e) {
      if (e instanceof Error) {
        return fail(403, { ...user, step: 'register', error: e.message });
      }

      return fail(403, {
        ...user,
        step: 'register',
        error: 'Unknown error has occoured. Please try again.',
      });
    }
  },
  verify: async ({ request }) => {
    const data = await request.formData();
    const { email, otp } = { email: data.get('email'), otp: data.get('otp') } as {
      email: string;
      otp: string;
    };
    try {
      const res = verify(email, otp);
      if (!res) {
        throw null;
      }
      return { success: true, step: 'verified' };
    } catch (e) {
      if (e instanceof Error) {
        return fail(403, {
          email,
          otp,
          step: 'verify',
          error: e.message,
        });
      }
      return fail(403, {
        email,
        otp,
        step: 'verify',
        error: 'Verification failed. Please try again',
      });
    }
  },
} satisfies Actions;
