import { put } from '@vercel/blob';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }
  // Opzionale: validazione tipo e dimensione
  if ((file as File).size > 2 * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'File troppo grande (max 2MB)' }), { status: 400 });
  }
  const blob = await put((file as File).name, file as File, {
    access: 'public',
  });
  return Response.json({ url: blob.url });
}
