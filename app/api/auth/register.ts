import { RegisterUserReqDTO } from "../dtos/authDTO";
import supabase from "@/src/utils/supabase/supabase";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";
import { IUser } from "@/src/types/authType";

// 회원가입 API
export const registerUserAPI = async ({
  name,
  email,
  password,
  display_name,
  message,
}: RegisterUserReqDTO): Promise<IUser> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          display_name,
          message,
          profile_image: DEFAULT_PROFILE_IMAGE_URL,
        },
      },
    });

    if (error) {
      if (error.message === "User already registered") {
        throw new Error("사용 중인 이메일입니다.");
      } else {
        throw new Error(error.message);
      }
    }

    const user = data.user;
    if (!user) {
      throw new Error("사용자 등록에 실패했습니다.");
    }

    const { error: dbError } = await supabase.from("users_info").insert([
      {
        id: user.id,
        display_name,
        profile_image: DEFAULT_PROFILE_IMAGE_URL,
      },
    ]);

    if (dbError) {
      throw new Error(
        "사용자 정보를 저장하는 데 실패했습니다.: " + dbError.message
      );
    }

    return {
      id: user.id,
      name,
      email: user.email,
      display_name,
      message,
      profile_image: DEFAULT_PROFILE_IMAGE_URL,
    } as IUser;
  } catch (error) {
    throw new Error("Unexpected error: " + error);
  }
};
