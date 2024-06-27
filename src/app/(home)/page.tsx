import Bookmark from "@/components/Bookmark";

export default function Page() {
  return (
    <div className="h-[calc(100vh-228px-60px)] overflow-y-auto">
      <div className="container mx-auto">
        <Bookmark />
      </div>
    </div>
  );
}
