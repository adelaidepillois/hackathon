import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== "string" || username.trim().length === 0) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Créer le client Supabase avec privilèges administrateur
    let supabase;
    try {
      supabase = createAdminClient();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Erreur de configuration Supabase:", errorMessage);
      return NextResponse.json(
        { error: "Configuration error", details: errorMessage },
        { status: 500 }
      );
    }

    // Utiliser "User" avec majuscule
    const tableName = "User";
    let data, error;

    // Vérifier d'abord si l'utilisateur existe
    const { data: existingUser } = await supabase
      .from(tableName)
      .select("id, username, score, level")
      .eq("username", username.trim())
      .single();

    if (existingUser) {
      // L'utilisateur existe, mettre à jour
      ({ data, error } = await supabase
        .from(tableName)
        .update({
          score: 0,
          level: 1,
        })
        .eq("username", username.trim())
        .select()
        .single());
    } else {
      // L'utilisateur n'existe pas, créer
      ({ data, error } = await supabase
        .from(tableName)
        .insert({
          username: username.trim(),
          score: 0,
          level: 1,
        })
        .select()
        .single());
    }

    if (error) {
      console.error("Error saving user:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        hint: error.hint,
        details: error.details,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasPublishableKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      });
      
      // Message d'erreur pour RLS
      if (error.message?.includes("row-level security") || 
          error.message?.includes("violates row-level security") ||
          error.code === "42501") {
        const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
        return NextResponse.json(
          { 
            error: "RLS Policy Error", 
            details: `Row Level Security bloque l'opération.`,
            hint: hasServiceRoleKey 
              ? "Le service role key est configuré mais RLS bloque toujours. Vérifiez que SUPABASE_SERVICE_ROLE_KEY est bien configuré dans les variables d'environnement de production (Vercel/Netlify/etc)."
              : "Solution: Ajoutez SUPABASE_SERVICE_ROLE_KEY dans les variables d'environnement de production:\n  1. Allez dans Supabase > Settings > API\n  2. Copiez la 'service_role' key (secret, commence par 'eyJ...')\n  3. Ajoutez dans votre plateforme de déploiement:\n     - Vercel: Settings > Environment Variables > Add\n     - Netlify: Site settings > Environment variables\n  4. Nom: SUPABASE_SERVICE_ROLE_KEY\n  5. Valeur: votre service_role key\n  6. Redéployez l'application",
            errorMessage: error.message,
            code: error.code,
            usingServiceRoleKey: hasServiceRoleKey,
            environment: process.env.NODE_ENV
          },
          { status: 500 }
        );
      }
      
      // Message d'erreur plus clair pour "table not found"
      if (error.message?.includes("Could not find the table") || 
          error.message?.includes("relation") ||
          error.code === "42P01" ||
          error.code === "PGRST116") {
        return NextResponse.json(
          { 
            error: "Table not found", 
            details: `La table 'User' n'existe pas dans Supabase. Veuillez vérifier que la table a été créée correctement.`,
            hint: "Assurez-vous que la table 'User' existe dans votre projet Supabase avec les colonnes: id, username, score, level.",
            errorMessage: error.message,
            code: error.code
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          error: "Failed to save user", 
          details: error.message,
          code: error.code,
          hint: error.hint,
          fullError: JSON.stringify(error, null, 2)
        },
        { status: 500 }
      );
    }

    // Définir un cookie avec le username pour le layout
    const response = NextResponse.json(
      { success: true, user: data },
      { status: 200 }
    );
    
    // Stocker le username dans un cookie (valide 30 jours)
    // En production, utiliser secure: true seulement si HTTPS
    const isProduction = process.env.NODE_ENV === 'production';
    const isSecure = isProduction && (process.env.VERCEL_URL?.startsWith('https') || process.env.NEXT_PUBLIC_VERCEL_URL?.startsWith('https'));
    
    response.cookies.set('username', username.trim(), {
      maxAge: 30 * 24 * 60 * 60, // 30 jours
      httpOnly: false, // Accessible depuis le client aussi
      secure: isSecure, // Secure seulement si HTTPS en production
      sameSite: 'lax',
      path: '/', // Accessible sur tout le site
    });
    
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

