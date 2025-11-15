import { createClient } from "@supabase/supabase-js";

/**
 * Crée un client Supabase avec les privilèges administrateur (service_role)
 * pour contourner RLS. À utiliser uniquement dans les API routes côté serveur.
 * 
 * @returns Client Supabase avec privilèges administrateur
 * @throws Error si les variables d'environnement ne sont pas configurées
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Vérifier que les variables d'environnement sont définies
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  }

  if (!publishableKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not configured");
  }

  // Utiliser service_role si disponible, sinon fallback sur publishable (soumis à RLS)
  const supabaseKey = serviceRoleKey || publishableKey;

  if (!serviceRoleKey) {
    console.warn(
      "⚠️ SUPABASE_SERVICE_ROLE_KEY n'est pas défini. L'API utilisera la clé publique qui est soumise à RLS."
    );
    console.warn(
      "⚠️ En production, cela peut causer des erreurs si RLS est activé sur la table User."
    );
  } else {
    console.log("✅ SUPABASE_SERVICE_ROLE_KEY est configuré");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

