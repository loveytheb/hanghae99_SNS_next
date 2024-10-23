import { NextResponse } from "next/server";
import supabase from "@/src/utils/supabase/supabase";

const GoogleAuthListener = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      console.log("구글 로그인 성공, 사용자 세션:", session);
    }
  });
};

export const GET = async () => {
  GoogleAuthListener();
  return NextResponse.json({ message: "Auth listener registered" });
};
