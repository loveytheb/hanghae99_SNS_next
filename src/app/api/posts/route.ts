import supabase from "@/src/utils/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase.from("posts").select(`
        *,
        users_info (
          profile_image
        )
      `);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
