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

    if (!data.user || !data.session) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user: IUser = {
      id: data.user.id,
      email: data.user.email ?? "",
      display_name: data.user.user_metadata?.display_name ?? "",
    };

    const response = NextResponse.json(user);
    response.cookies.set("token", data.session.access_token, {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Unexpected error: " + error },
      { status: 500 }
    );
  }
};
