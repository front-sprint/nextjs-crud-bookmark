"use server";

import { revalidatePath } from "next/cache";
import { deleteBookmark, insertBookmark, updateBookmark } from "@/db/queries";
import { z } from "zod";
import { redirect } from "next/navigation";

const bookmarkFormSchema = z.object({
  url: z.string().url(),
  desc: z.string().min(1),
});

export async function createBookmarkAction(formState: {
  url: string;
  desc: string;
}) {
  const validated = bookmarkFormSchema.safeParse(formState);
  if (!validated.success) {
    throw new Error("Invalid form data");
  }

  const res = await insertBookmark(validated.data);
  console.log("Bookmark created!");
  revalidatePath("/");
  return res;
}

export async function updateBookmarkAction(
  id: number,
  formState: { url: string; desc: string },
) {
  const validated = bookmarkFormSchema.safeParse(formState);
  if (!validated.success) {
    throw new Error("Invalid form data");
  }

  await updateBookmark(id, validated.data);
  console.log("Bookmark created!");
  revalidatePath("/");
  redirect("/");
}

export async function deleteBookmarkAction(id: number) {
  await deleteBookmark(id);
  console.log("Bookmark deleted!");
  revalidatePath("/");
}
