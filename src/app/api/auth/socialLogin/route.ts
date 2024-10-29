import { NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";
import { googleLoginUserDTO } from "../../dtos/authDTO";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";

// 구글 로그인 API
export const POST = async (): Promise<NextResponse<googleLoginUserDTO>> => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message || "구글 로그인에 실패했습니다.",
      });
    }

    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "사용자 정보를 가져오지 못했습니다.",
      });
    }

    const { data: existingUser } = await supabase
      .from("users_info")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingUser) {
      const { error: updateError } = await supabase
        .from("users_info")
        .update({
          display_name: user.user_metadata.full_name,
          profile_image: DEFAULT_PROFILE_IMAGE_URL,
        })
        .eq("id", user.id);

      if (updateError) {
        return NextResponse.json({
          success: false,
          message:
            "사용자 정보를 업데이트하는 데 실패했습니다: " +
            updateError.message,
        });
      }
    } else {
      const { error: insertError } = await supabase.from("users_info").insert([
        {
          id: user.id,
          display_name: user.user_metadata.full_name,
          profile_image: DEFAULT_PROFILE_IMAGE_URL,
        },
      ]);

      if (insertError) {
        return NextResponse.json({
          success: false,
          message:
            "사용자 정보를 저장하는 데 실패했습니다: " + insertError.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "구글 로그인에 성공하였습니다.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Unexpected error: " + (error as Error).message,
    });
  }
};
