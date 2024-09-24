import { Card } from "@/components/ui/card";

export default function CardProjectContentSkeleton() {
  return (
    <Card className="p-10 h-[25rem] w-full animate-pulse flex flex-col items-center">
      <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-5"></div>
      <div className="bg-gray-200 rounded-lg w-full h-full"></div>
    </Card>
  );
}
