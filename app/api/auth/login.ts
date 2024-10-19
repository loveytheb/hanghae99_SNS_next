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

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("User not found");
    }

    return {
      id: data.user.id,
      email: data.user.email ?? "",
    };
  } catch (error) {
    throw new Error("Unexpected error: " + error);
  }
};
