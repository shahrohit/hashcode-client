"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/user-login";
import { AuthUser } from "@/types/response-type";
import UserAvatar from "./user-avatar";

const UserButton = ({ user }: { user: AuthUser }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { mutate: logoutUser, isPending } = useLogout();

  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="relative">
      <UserAvatar
        name={user.username}
        avatar={user.avatar}
        onClick={handleClick}
      />
      {showProfile && (
        <div className="flex flex-col gap-2 bg-background border rounded-md absolute top-12 z-10 right-0 w-[300px] p-2">
          <div className="flex items-center gap-2">
            <UserAvatar name={user.username} avatar={user.avatar} />
            <span className="text-lg text font-semibold overflow-hidden">
              {user.name}
            </span>
          </div>
          <div className="text-center text-muted-foreground">{user.email}</div>
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
