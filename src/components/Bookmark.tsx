import { selectBookmarks } from "@/db/queries";
import BookmarkItem from "./ui/BookmarkItem";
import { match } from "ts-pattern";
import { ReactNode } from "react";

// 1. emptry data of bookmark
// 2. get bookmark from the database
// 3. add bookmark
// 4. remove bookmark
// 5. modify bookmark
// 6. revalidate bookmark
// 7. show error and loading state

export default async function Bookmark() {
  const bookmarks = await selectBookmarks();
  return (
    <div className="p-4">
      {match({
        bookmarks,
        length: bookmarks.length,
      })
        .returnType<ReactNode>()
        .with(
          {
            length: 0,
          },
          () => <EmptyBookmark />,
        )
        .otherwise(({ bookmarks }) => {
          return (
            <div className="flex flex-col gap-4">
              {bookmarks.map((bookmark) => (
                <BookmarkItem key={bookmark.id} data={bookmark} />
              ))}
            </div>
          );
        })}
    </div>
  );
}

const EmptyBookmark = () => {
  return (
    <div className="mt-[50px]">
      <p className="text-center text-2xl">Empty</p>
    </div>
  );
};
