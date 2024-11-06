import supabase from "@/src/utils/supabase/supabase";
import { BUCKET_NAME } from "../constants/constants";

export async function uploadImageToStorage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${Math.random()}-${file.name}`.replace(
    /[^a-zA-Z0-9_.-]/g,
    "_"
  );

  try {
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl ?? null;
  } catch (error) {
    console.error("Image upload failed for file:", file.name, error);
    throw new Error("Image upload error");
  }
}
