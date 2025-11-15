import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    if (!username) {
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

        const { data, error } = await supabase
          .from("User")
          .select("username, score, level")
          .eq("username", decodeURIComponent(username))
          .single();

    if (error) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

