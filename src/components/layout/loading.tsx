import { Skeleton } from "../ui/skeleton"

export default function LoadingSkeleton(){
 return (
  <div className="flex flex-col  items-start gap-5 ">
    <Skeleton className="h-15 w-30 rounded-lg" />
    <div className="flex flex-col gap-3">
      <Skeleton className="h-10 w-50 " />
      <div className="flex flex-col gap-3">
      <Skeleton className="h-10 w-50 " /></div>
    </div>
  </div>

 )
}