import supabase from "@/src/utils/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";
import { WritePostsReqDTO } from "../../dtos/postsDTO";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString(); // 제목
    const content = formData.get("content")?.toString(); // 내용
    const images = formData.getAll("images"); // 이미지 파일 배열

    if (!images || !images.length) {
      console.log("No images provided");
      // 필요한 경우 여기서 처리
    }

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

    // 이미지 URL 배열 생성
    const photoUrls: string[] = [];

    for (const image of images) {
      const file = image as File; // 타입 단언
      const fileName = `${Date.now()}-${Math.random()}-${file.name}`.replace(
        /[^a-zA-Z0-9_.-]/g,
        "_"
      );

      // File을 ArrayBuffer로 변환하여 업로드
      const fileBuffer = await file.arrayBuffer(); // await 추가
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("post_upload_images")
        .upload(fileName, fileBuffer, {
          // 수정된 부분
          contentType: file.type, // 이미지의 MIME 타입
          cacheControl: "3600",
          upsert: false,
        });

      console.log(fileBuffer);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 업로드한 이미지의 공개 URL 생성 및 배열에 추가
      const {
        data: { publicUrl },
      } = supabase.storage.from("post_upload_images").getPublicUrl(fileName);
      if (publicUrl) {
        photoUrls.push(publicUrl);
      }
    }

    // WritePostsReqDTO 타입을 만족하는 객체 생성
    const postData: WritePostsReqDTO = {
      user_id: user.id,
      display_name: user.user_metadata.display_name,
      title,
      content,
      photo_urls: photoUrls,
    };

    const { data, error } = await supabase.from("posts").insert([postData]);

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
