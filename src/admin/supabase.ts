import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const SUPABASE_BUCKET = (import.meta.env.VITE_SUPABASE_BUCKET as string | undefined) ?? 'post-images';

/** Sem as variáveis do .env.local o painel continua funcionando com o mock em localStorage. */
export const supabaseConfigured = Boolean(url && anonKey);

export const supabase = supabaseConfigured ? createClient(url!, anonKey!) : null;
