import { IUser } from "@/types/authType";
import { loginUserDTO } from "../dtos/authDTO";
import supabase from "@/app/utils/supabase/supabase";

export const loginUserAPI = async ({
  email,
  password,
}: loginUserDTO): Promise<IUser> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error) {
    throw new Error("Unexpected error: " + error);
  }
};
