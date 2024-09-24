import { Card } from "@/components/ui/card";

export default function CardUserSkeleton() {
  return (
    <Card className="p-10 min-h-36 animate-pulse flex justify-between">
      <div className="flex flex-col justify-around gap-1">
        <div className="bg-gray-200 rounded-lg w-28 h-2.5"></div>
        <div className="bg-gray-200 rounded-lg w-60 h-2.5"></div>
      </div>
      <div className="h-[60px] flex items-center">
        <div className="bg-gray-200 rounded-full w-[60px] h-full"></div>
      </div>
    </Card>
  );
}
