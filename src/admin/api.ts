/**
 * Camada de dados do painel /admin.
 *
 * Com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local usa o Supabase (login, tabela `posts` e bucket de imagens).
 * Sem elas, cai num mock em localStorage, só para ajustar o front. As telas só usam as funções exportadas aqui.
 */

import { SUPABASE_BUCKET, supabase } from './supabase';

export type PostStatus = 'draft' | 'published';

export interface AdminPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** Texto do artigo. Parágrafos separados por linha em branco. */
  body: string;
  coverUrl?: string;
  linkedinUrl?: string;
  status: PostStatus;
  /** ISO 8601 (data de publicação). */
  publishedAt: string;
  updatedAt: string;
}

export type PostInput = Omit<AdminPost, 'id' | 'updatedAt'> & { id?: string };

export interface Session {
  email: string;
}

/** Linha da tabela `posts` (snake_case). */
interface PostRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  cover_url: string | null;
  linkedin_url: string | null;
  status: PostStatus;
  published_at: string;
  updated_at: string;
}

const fromRow = (r: PostRow): AdminPost => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  summary: r.summary,
  body: r.body,
  coverUrl: r.cover_url ?? undefined,
  linkedinUrl: r.linkedin_url ?? undefined,
  status: r.status,
  publishedAt: r.published_at,
  updatedAt: r.updated_at,
});

const toRow = (p: PostInput) => ({
  slug: p.slug,
  title: p.title,
  summary: p.summary,
  body: p.body,
  cover_url: p.coverUrl ?? null,
  linkedin_url: p.linkedinUrl ?? null,
  status: p.status,
  published_at: p.publishedAt,
});

const POSTS_KEY = 'duall-admin-posts';
const SESSION_KEY = 'duall-admin-session';

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sem armazenamento disponível */
  }
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

/* ---------------------------------- Auth --------------------------------- */

export async function getSession(): Promise<Session | null> {
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    return data.session?.user.email ? { email: data.session.user.email } : null;
  }
  return read<Session | null>(SESSION_KEY, null);
}

export async function signIn(email: string, password: string): Promise<Session> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user?.email) {
      const code = error?.code ?? '';
      if (code === 'email_not_confirmed') throw new Error('Esse usuário ainda não foi confirmado no Supabase (marque "Auto Confirm User" ou confirme o e-mail).');
      if (code === 'invalid_credentials' || !error) throw new Error('E-mail ou senha incorretos.');
      throw new Error(`Falha ao conectar ao Supabase: ${error.message}`);
    }
    return { email: data.user.email };
  }
  if (!email.includes('@') || password.length < 6) throw new Error('E-mail ou senha inválidos.');
  const session = { email };
  write(SESSION_KEY, session);
  return session;
}

export async function signOut(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
    return;
  }
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignora */
  }
}

/* ---------------------------------- Posts -------------------------------- */

export async function listPosts(): Promise<AdminPost[]> {
  if (supabase) {
    const { data, error } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
    if (error) throw new Error('Não foi possível carregar os artigos.');
    return (data as PostRow[]).map(fromRow);
  }
  return read<AdminPost[]>(POSTS_KEY, []).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(id: string): Promise<AdminPost | null> {
  if (supabase) {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error('Não foi possível carregar o artigo.');
    return data ? fromRow(data as PostRow) : null;
  }
  return read<AdminPost[]>(POSTS_KEY, []).find((p) => p.id === id) ?? null;
}

export async function savePost(input: PostInput): Promise<AdminPost> {
  if (supabase) {
    const query = input.id
      ? supabase.from('posts').update(toRow(input)).eq('id', input.id)
      : supabase.from('posts').insert(toRow(input));
    const { data, error } = await query.select().single();
    if (error) {
      if (error.code === '23505') throw new Error('Já existe um artigo com esse endereço (slug). Altere o título ou o slug.');
      throw new Error('Não foi possível salvar o artigo.');
    }
    return fromRow(data as PostRow);
  }
  const posts = read<AdminPost[]>(POSTS_KEY, []);
  const clash = posts.find((p) => p.slug === input.slug && p.id !== input.id);
  if (clash) throw new Error('Já existe um artigo com esse endereço (slug). Altere o título ou o slug.');

  const saved: AdminPost = {
    ...input,
    id: input.id ?? crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  };
  write(POSTS_KEY, [...posts.filter((p) => p.id !== saved.id), saved]);
  return saved;
}

export async function deletePost(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw new Error('Não foi possível excluir o artigo.');
    return;
  }
  write(
    POSTS_KEY,
    read<AdminPost[]>(POSTS_KEY, []).filter((p) => p.id !== id),
  );
}

const MAX_ORIGINAL_BYTES = 15_000_000;
const MAX_WIDTH = 1600;

/** Redimensiona (máx. 1600 px de largura) e converte para WebP antes de enviar: economiza espaço e tráfego. GIFs passam direto. */
async function compressImage(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
  return blob && blob.size < file.size ? blob : file;
}

/** Envia a imagem e devolve o endereço público. */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Envie um arquivo de imagem.');
  if (file.size > MAX_ORIGINAL_BYTES) throw new Error('Imagem muito grande (máx. 15 MB).');
  const blob = await compressImage(file);

  if (supabase) {
    const ext = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : blob.type === 'image/gif' ? 'gif' : 'jpg';
    const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(path, blob, {
      contentType: blob.type,
      cacheControl: '31536000',
    });
    if (error) throw new Error('Não foi possível enviar a imagem.');
    return supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  if (blob.size > 1_500_000) throw new Error('Imagem muito grande para o modo de teste (máx. 1,5 MB).');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.readAsDataURL(blob);
  });
}
