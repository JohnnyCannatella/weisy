import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_WAITLIST_TABLE = process.env.SUPABASE_WAITLIST_TABLE || "waitlist";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim().toLowerCase();
    const source = body?.source || "landing";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email non valida" },
        { status: 400 }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Supabase non configurato. Imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY." },
        { status: 500 }
      );
    }

    const endpoint = `${SUPABASE_URL}/rest/v1/${SUPABASE_WAITLIST_TABLE}?on_conflict=email`;
    const payload = {
      email,
      source,
      created_at: new Date().toISOString(),
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(errorBody || "Errore Supabase");
    }

    return NextResponse.json({
      ok: true,
      message: "Aggiunto alla waitlist.",
    });
  } catch (error) {
    console.error("Waitlist API error", error);
    return NextResponse.json(
      { error: error.message || "Errore interno, riprova più tardi." },
      { status: 500 }
    );
  }
}
