import BookmarkForm from "@/components/ui/BookmarkForm";
import { selectBookmarkById } from "@/db/queries";

interface PageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: PageProps) {
  const { id } = params;
  const result = await selectBookmarkById(parseInt(id));
  console.log("result", result);
  return (
    <div className="pt-[30px] px-4">
      <div className="border rounded-md p-3">
        <BookmarkForm
          id={id}
          mode="edit"
          initialState={
            result ?? {
              url: "",
              desc: "",
            }
          }
        />
      </div>
    </div>
  );
}
