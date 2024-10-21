import supabase from "@/src/utils/supabase/supabase";
import { googleLoginUserDTO } from "../dtos/authDTO";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";

// 구글 로그인 API
export const GoogleLoginUserAPI = async (): Promise<googleLoginUserDTO> => {
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

    const { error: dbError } = await supabase.from("users_info").upsert([
      {
        id: user.id,
        display_name: user.user_metadata.full_name,
        profile_image: DEFAULT_PROFILE_IMAGE_URL,
      },
    ]);

    if (dbError) {
      return {
        success: false,
        message: "사용자 정보를 저장하는 데 실패했습니다: " + dbError.message,
      };
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
