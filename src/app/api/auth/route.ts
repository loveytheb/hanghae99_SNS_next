import { NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";

export const GET = async () => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("이벤트:", event, "세션:", session);
    if (event === "SIGNED_IN") {
      console.log("구글 로그인 성공, 사용자 세션:", session);
    } else if (event === "SIGNED_OUT") {
      console.log("사용자가 로그아웃했습니다.");
    }
  });

  return NextResponse.json({ message: "Auth listener registered" });
};
