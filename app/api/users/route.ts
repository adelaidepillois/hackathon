import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== "string" || username.trim().length === 0) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Utiliser le service role key pour contourner RLS (uniquement côté serveur)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    
    // Avertir si on utilise la clé publique (soumise à RLS)
    if (!serviceRoleKey) {
      console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY n'est pas défini. L'API utilisera la clé publique qui est soumise à RLS.");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

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
      
      // Message d'erreur pour RLS
      if (error.message?.includes("row-level security") || 
          error.message?.includes("violates row-level security")) {
        const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
        return NextResponse.json(
          { 
            error: "RLS Policy Error", 
            details: `Row Level Security bloque l'opération.`,
            hint: hasServiceRoleKey 
              ? "Le service role key est configuré mais RLS bloque toujours. Essayez de désactiver RLS temporairement ou créez les politiques (voir supabase-rls-policy.sql)"
              : "Solution 1 (recommandé): Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local:\n  1. Allez dans Supabase > Settings > API\n  2. Copiez la 'service_role' key (secret)\n  3. Ajoutez dans .env.local: SUPABASE_SERVICE_ROLE_KEY=votre_key\n  4. Redémarrez le serveur\n\nSolution 2: Désactivez RLS temporairement dans Supabase:\n  ALTER TABLE \"User\" DISABLE ROW LEVEL SECURITY;\n\nSolution 3: Créez les politiques RLS (voir supabase-rls-policy.sql)",
            errorMessage: error.message,
            code: error.code,
            usingServiceRoleKey: hasServiceRoleKey
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
    response.cookies.set('username', username.trim(), {
      maxAge: 30 * 24 * 60 * 60, // 30 jours
      httpOnly: false, // Accessible depuis le client aussi
      secure: process.env.NODE_ENV === 'production',
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

