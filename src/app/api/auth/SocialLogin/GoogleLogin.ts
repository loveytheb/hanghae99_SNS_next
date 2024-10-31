import supabase from "@/src/utils/supabase/supabase";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";
import { googleLoginUserDTO } from "../../dtos/authDTO";

export const GoogleLoginUserAPI = async (): Promise<googleLoginUserDTO> => {
  try {
    const { error: loginError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (loginError) {
      return {
        success: false,
        message: loginError.message || "구글 로그인에 실패했습니다.",
      };
    }

    // 세션 준비 확인
    let attempts = 0;
    const maxAttempts = 10;
    let sessionData;

    while (attempts < maxAttempts) {
      const { data, error } = await supabase.auth.getSession();

      if (!error && data.session?.user) {
        sessionData = data;
        break;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!sessionData) {
      return {
        success: false,
        message: "사용자 정보를 가져오지 못했습니다.",
      };
    }

    const user = sessionData.session.user;

    const { data: existingUser, error: userCheckError } = await supabase
      .from("users_info")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userCheckError && userCheckError.code !== "PGRST116") {
      return {
        success: false,
        message:
          "사용자 정보를 확인하는 데 실패했습니다: " + userCheckError.message,
      };
    }

    if (existingUser) {
      const { error: updateError } = await supabase
        .from("users_info")
        .update({
          display_name:
            user.user_metadata.full_name || existingUser.display_name,
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
      const { error: insertError } = await supabase.from("users_info").insert([
        {
          id: user.id,
          display_name: user.user_metadata.full_name || "익명 사용자",
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
