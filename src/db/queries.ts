"use server";

import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { InsertBookmark } from "./schema";
import { bookmarksTable } from "./schema";

// Queries for bookmarks table
export async function insertBookmark(data: InsertBookmark) {
  return await db.insert(bookmarksTable).values(data).returning();
}

// Select all bookmarks
export async function selectBookmarks() {
  return await db.select().from(bookmarksTable);
}

// Select bookmark by id
export async function selectBookmarkById(id: number) {
  return await db.query.bookmarksTable.findFirst({
    where: eq(bookmarksTable.id, id),
  });
}

// Update

export async function updateBookmark(id: number, data: InsertBookmark) {
  return await db
    .update(bookmarksTable)
    .set(data)
    .where(eq(bookmarksTable.id, id));
}

export async function deleteBookmark(id: number) {
  return await db.delete(bookmarksTable).where(eq(bookmarksTable.id, id));
}
