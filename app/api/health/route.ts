import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Route de diagnostic pour vérifier la configuration Supabase en production
 * Accessible via GET /api/health
 */
export async function GET() {
  const checks = {
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasPublishableKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseConnection: "unknown" as "success" | "error" | "unknown",
    tableAccess: "unknown" as "success" | "error" | "unknown",
    error: null as string | null,
  };

  try {
    // Test de connexion Supabase
    try {
      const supabase = createAdminClient();
      checks.supabaseConnection = "success";

      // Test d'accès à la table User
      const { data, error } = await supabase
        .from("User")
        .select("id")
        .limit(1);

      if (error) {
        checks.tableAccess = "error";
        checks.error = error.message;
      } else {
        checks.tableAccess = "success";
      }
    } catch (error) {
      checks.supabaseConnection = "error";
      checks.error = error instanceof Error ? error.message : "Unknown error";
    }

  } catch (error) {
    checks.error = error instanceof Error ? error.message : "Unknown error";
  }

  const allChecksPassed =
    checks.hasSupabaseUrl &&
    checks.hasPublishableKey &&
    checks.hasServiceRoleKey &&
    checks.supabaseConnection === "success" &&
    checks.tableAccess === "success";

  return NextResponse.json(
    {
      status: allChecksPassed ? "healthy" : "unhealthy",
      checks,
      recommendations: !checks.hasServiceRoleKey
        ? [
            "⚠️ SUPABASE_SERVICE_ROLE_KEY n'est pas configuré. Ajoutez-la dans les variables d'environnement de production.",
          ]
        : checks.tableAccess === "error"
        ? [
            "⚠️ L'accès à la table User échoue. Vérifiez que RLS est désactivé ou que SUPABASE_SERVICE_ROLE_KEY est correctement configurée.",
          ]
        : [],
    },
    { status: allChecksPassed ? 200 : 503 }
  );
}

