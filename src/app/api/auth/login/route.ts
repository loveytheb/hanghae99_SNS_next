import { NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";
import { IUser } from "@/src/types/authType";
import { loginUserDTO } from "../../dtos/authDTO";

// POST API: 로그인 처리
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

    if (!data.user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user: IUser = {
      id: data.user.id,
      email: data.user.email ?? "",
    };

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Unexpected error: " + error },
      { status: 500 }
    );
  }
};
