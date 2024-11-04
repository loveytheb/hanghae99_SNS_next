import { NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";
import { IUser } from "@/src/types/authType";
import { loginUserDTO } from "../../dtos/authDTO";

export const POST = async (req: Request) => {
  try {
    const { email, password }: loginUserDTO = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (!data || !data.user || !data.session) {
      // 에러나 데이터 누락 시의 응답을 명확하게 지정
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    const user: IUser = {
      id: data.user.id,
      email: data.user.email ?? "",
      display_name: data.user.user_metadata?.display_name ?? "",
    };

    const response = NextResponse.json(user);

    response.headers.set(
      "Set-Cookie",
      `token=${data.session.access_token}; Path=/; Max-Age=${
        60 * 60 * 24
      }; SameSite=Lax`
    );

    return response;
  } catch (error) {
    console.error("Unexpected server error:", error); // 콘솔에 상세 오류 기록
    return NextResponse.json(
      { message: `Unexpected error: ${String(error)}` }, // 에러 객체를 문자열로 변환
      { status: 500 }
    );
  }
};
