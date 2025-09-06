import { supabase } from "./supabase";

export async function getGalleryImages() {
  const { data, error } = await supabase.storage
    .from("assets")
    .list("gallery", { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error("Error loading gallery:", error);
    return [];
  }

  // convert ke full URL
  return data.map(
    (file) =>
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/gallery/${file.name}`
  );
}
