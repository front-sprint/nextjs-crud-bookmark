"use client";
import { deleteBookmarkAction } from "@/lib/actions";
import Link from "next/link";

type BookmarkType = {
  id: number;
  url: string;
  desc: string;
  createdAt: string;
  updatedAt: Date | null;
};

interface BookmarkItemProps {
  data: BookmarkType;
}

export default function BookmarkItem({ data }: BookmarkItemProps) {
  const { url, desc, id } = data;

  const onClickDelete = async () => {
    await deleteBookmarkAction(id);
  };

  return (
    <div className="border border-white p-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <a className="text-sky-300 text-lg" href={url}>
            {url}
          </a>
          <p className="text-white text-lg font-bold">{desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/bookmark/${id}`}
            className="bg-sky-500 font-bold px-2 py-1 rounded-md"
          >
            Edit
          </Link>
          <button
            onClick={onClickDelete}
            className="bg-red-500 font-bold px-2 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
