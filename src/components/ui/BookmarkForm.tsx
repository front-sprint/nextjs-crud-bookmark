"use client";

import { createBookmarkAction, updateBookmarkAction } from "@/lib/actions";
import { useState, useTransition } from "react";
type FormState = {
  url: string;
  desc: string;
};
interface BookmarkFormProps {
  id?: string;
  initialState: FormState;
  mode: "create" | "edit";
}

export default function BookmarkForm({
  id,
  initialState,
  mode,
}: BookmarkFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState(initialState);

  const handlers = {
    create: () => {
      startTransition(async () => {
        const res = await createBookmarkAction(formState);
        console.log("Bookmark created!", res);
        setFormState({
          url: "",
          desc: "",
        });
      });
    },
    edit: () => {
      startTransition(async () => {
        if (!id) return;
        await updateBookmarkAction(Number(id), formState);
        setFormState({
          url: "",
          desc: "",
        });
      });
    },
  };

  const handleClick = async () => {
    const handler = handlers[mode];
    handler();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label className="text-lg font-bold" htmlFor="url">
          URL
        </label>
        <input
          id="url"
          name="url"
          className="rounded-md p-2 text-black"
          type="text"
          value={formState.url}
          onChange={(e) => {
            setFormState({ ...formState, url: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-bold" htmlFor="desc">
          Description
        </label>
        <input
          className="rounded-md p-2 text-black"
          id="desc"
          name="desc"
          type="text"
          value={formState.desc}
          onChange={(e) => {
            setFormState({ ...formState, desc: e.target.value });
          }}
        />
      </div>
      <div>
        <button
          onClick={handleClick}
          className="w-full text-lg font-bold bg-sky-700 rounded-md p-1"
        >
          {
            {
              create: "Create",
              edit: "Edit",
            }[mode]
          }
        </button>
      </div>
    </div>
  );
}
