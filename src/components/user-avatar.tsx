import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const UserAvatar = ({
  avatar,
  name,
  onClick = () => {},
}: {
  avatar: string | null;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="none"
      onClick={onClick}
      className="relative cursor-pointer h-9 w-9 p-0 border rounded-full"
    >
      {avatar ? (
        <Image fill src={avatar} alt={name} />
      ) : (
        <span className="bg-background font-bold">
          {name?.charAt(0)?.toUpperCase() ?? "U"}
        </span>
      )}
    </Button>
  );
};

export default UserAvatar;
