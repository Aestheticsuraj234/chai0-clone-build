import { Spinner } from "@/components/ui/spinner";


export default function Loading() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
