import { Card } from "@/components/ui/card";

export default function CardProjectCountSkeleton() {
  return (
    <Card className="p-10 min-h-36 animate-pulse flex flex-col items-center">
      <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-5"></div>
      <div className="bg-gray-200 rounded-sm w-6 h-8"></div>
    </Card>
  );
}
