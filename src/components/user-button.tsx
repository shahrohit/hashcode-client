"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/user-login";

const UserButton = ({ username }: { username: string }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { mutate: logoutUser, isPending } = useLogout();
  return (
    <div className="relative">
      <Button
        className="w-8 h-8 flex items-center  font-bold justify-center rounded-full bg-secondary border"
        onClick={() => setShowProfile(!showProfile)}
      >
        {username?.charAt(0)?.toUpperCase() ?? "U"}
      </Button>
      {showProfile && (
        <div className="flex flex-col gap-2 bg-background border rounded-md absolute top-10 z-10 right-0 w-[200px] p-2">
          <div className="flex items-center gap-2">
            <Button className="w-8 h-8 flex items-center  font-bold justify-center rounded-full bg-secondary border">
              {username?.charAt(0)?.toUpperCase() ?? "U"}
            </Button>
            <span className="text-lg font-semibold">{username}</span>
          </div>
          <Button
            className="w-full"
            size="sm"
            disabled={isPending}
            onClick={() => logoutUser()}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
