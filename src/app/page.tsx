import TopicCreateForm from "@/components/topic/topic-create-form";
import TopicList from "@/components/topic/topic-list";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1>Top Posts</h1>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-4 border shadow py-4 px-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Topics</h2>
            <TopicCreateForm />
          </div>
          <Divider className="my-2" />
          <TopicList />
        </div>
      </div>
    </div>
  );
}
