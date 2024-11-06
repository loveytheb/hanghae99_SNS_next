import supabase from "@/src/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";
import { WritePostsReqDTO } from "../../dtos/postsDTO";
import { uploadImageToStorage } from "@/src/utils/uploadImageToStorage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const images = formData.getAll("images");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(
      token
    );

    if (userError || !userData.user) {
      console.error("User retrieval error:", userError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const photoUrls: string[] = [];

    for (const image of images) {
      const file = image as File;
      try {
        const photoUrl = await uploadImageToStorage(file);
        if (photoUrl) {
          photoUrls.push(photoUrl);
        }
      } catch (error) {
        console.error("Image upload failed for file:", file.name, error);
        throw new Error("Image upload error");
      }
    }

    const postData: WritePostsReqDTO = {
      user_id: userData.user.id,
      display_name: userData.user.user_metadata.display_name,
      title,
      content,
      photo_urls: photoUrls,
    };

    const { data, error } = await supabase.from("posts").insert([postData]);

    if (error) {
      console.error("Database insert error:", error.message);
      throw new Error("Failed to create post");
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unhandled error in POST handler:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
