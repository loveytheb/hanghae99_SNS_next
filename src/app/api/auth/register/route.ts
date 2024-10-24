import { NextRequest, NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/src/constants/constants";
import { IUser } from "@/src/types/authType";
import { RegisterUserReqDTO } from "../../dtos/authDTO";

// 회원가입 API 핸들러
export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password, display_name, message }: RegisterUserReqDTO =
      await req.json();

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
        return NextResponse.json(
          { message: "사용 중인 이메일입니다." },
          { status: 400 }
        );
      } else {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    const user = data.user;
    if (!user) {
      return NextResponse.json(
        { message: "사용자 등록에 실패했습니다." },
        { status: 500 }
      );
    }

    const { error: dbError } = await supabase.from("users_info").insert([
      {
        id: user.id,
        display_name,
        profile_image: DEFAULT_PROFILE_IMAGE_URL,
      },
    ]);

    if (dbError) {
      return NextResponse.json(
        {
          message: "사용자 정보를 저장하는 데 실패했습니다: " + dbError.message,
        },
        { status: 500 }
      );
    }

    const responseData: IUser = {
      id: user.id,
      name,
      email: user.email || "",
      display_name,
      message,
      profile_image: DEFAULT_PROFILE_IMAGE_URL,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unexpected error: " + error },
      { status: 500 }
    );
  }
};
