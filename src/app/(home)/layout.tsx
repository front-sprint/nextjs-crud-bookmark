import CreateBookmark from "@/components/CreateBookmark";
import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <CreateBookmark />
    </>
  );
}
