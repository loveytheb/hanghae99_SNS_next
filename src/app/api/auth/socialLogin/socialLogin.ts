import supabase from "@/src/utils/supabase/supabase";
import { googleLoginUserDTO } from "../../dtos/authDTO";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";

// 구글 로그인 API
export const GoogleLoginUserAPI = async (): Promise<googleLoginUserDTO> => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/login",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message || "구글 로그인에 실패했습니다.",
      };
    }

    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      return {
        success: false,
        message: "사용자 정보를 가져오지 못했습니다.",
      };
    }

    // 사용자의 정보를 확인하여 삽입 또는 업데이트
    const { data: existingUser } = await supabase
      .from("users_info")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingUser) {
      // 기존 사용자 정보가 있으면 업데이트
      const { error: updateError } = await supabase
        .from("users_info")
        .update({
          display_name: user.user_metadata.full_name,
          profile_image: DEFAULT_PROFILE_IMAGE_URL,
        })
        .eq("id", user.id);

      if (updateError) {
        return {
          success: false,
          message:
            "사용자 정보를 업데이트하는 데 실패했습니다: " +
            updateError.message,
        };
      }
    } else {
      // 새로운 사용자 정보 추가
      const { error: insertError } = await supabase.from("users_info").insert([
        {
          id: user.id,
          display_name: user.user_metadata.full_name,
          profile_image: DEFAULT_PROFILE_IMAGE_URL,
        },
      ]);

      if (insertError) {
        return {
          success: false,
          message:
            "사용자 정보를 저장하는 데 실패했습니다: " + insertError.message,
        };
      }
    }

    return {
      success: true,
      message: "구글 로그인에 성공하였습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unexpected error: " + (error as Error).message,
    };
  }
};
