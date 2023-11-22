import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-3">
      <Spinner size="lg" color="secondary" />
    </div> 
  );
};
