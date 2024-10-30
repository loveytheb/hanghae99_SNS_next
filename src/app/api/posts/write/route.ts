import supabase from "@/src/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";
import { WritePostsReqDTO } from "../../dtos/postsDTO";

export async function POST(request: NextRequest) {
  try {
    const { title, content }: WritePostsReqDTO = await request.json();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        display_name: user.user_metadata.display_name,
        title,
        content,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
