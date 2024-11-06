import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const { userId, fileName } = params;
  const file = Bun.file(`user-asset/${userId}/${fileName}`);
  return new Response(await file.arrayBuffer(), {
    headers: { 'Content-Type': file.type },
  });
};
