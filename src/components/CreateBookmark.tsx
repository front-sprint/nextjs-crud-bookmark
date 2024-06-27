import BookmarkForm from "./ui/BookmarkForm";

// using server action in client component

export default function CreateBookmark() {
  return (
    <div className="fixed h-[228px] rounded-t-md bottom-0 left-0 right-0 bg-gray-600">
      <div className="p-4 container mx-auto">
        <BookmarkForm initialState={{ url: "", desc: "" }} mode="create" />
      </div>
    </div>
  );
}
