import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { level } = await request.json();

    if (typeof level !== "number" || level < 1) {
      return NextResponse.json(
        { error: "Invalid level value" },
        { status: 400 }
      );
    }

    // Récupérer le username depuis le cookie
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;

    if (!username) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
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

    // Mettre à jour le niveau (seulement si le nouveau niveau est supérieur)
    const { data: currentUser } = await supabase
      .from("User")
      .select("level")
      .eq("username", username)
      .single();

    const currentLevel = currentUser?.level || 1;
    const newLevel = Math.max(currentLevel, level); // Ne pas revenir en arrière

    const { data, error } = await supabase
      .from("User")
      .update({ level: newLevel })
      .eq("username", username)
      .select()
      .single();

    if (error) {
      console.error("Error updating level:", error);
      return NextResponse.json(
        { error: "Failed to update level", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, user: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

