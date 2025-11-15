import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
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

    // Récupérer les 3 meilleurs scores
    const { data, error } = await supabase
      .from("User")
      .select("username, score")
      .order("score", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return NextResponse.json(
        { error: "Failed to fetch leaderboard", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { leaderboard: data || [] },
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

