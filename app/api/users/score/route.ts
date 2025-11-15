import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { points } = await request.json();

    if (typeof points !== "number" || points < 0) {
      return NextResponse.json(
        { error: "Invalid points value" },
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Récupérer le score actuel
    const { data: currentUser, error: fetchError } = await supabase
      .from("User")
      .select("score")
      .eq("username", username)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Ajouter les nouveaux points au score existant
    const newScore = (currentUser.score || 0) + points;

    // Mettre à jour le score
    const { data, error } = await supabase
      .from("User")
      .update({ score: newScore })
      .eq("username", username)
      .select()
      .single();

    if (error) {
      console.error("Error updating score:", error);
      return NextResponse.json(
        { error: "Failed to update score", details: error.message },
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

