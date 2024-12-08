import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <Link href="/problemset" className="text-primary font-semibold">
        Go to Problem Page
      </Link>
    </div>
  );
};

export default NotFound;
