const UserButton = ({ username }: { username: string }) => {
  return (
    <div className="w-8 h-8 flex items-center  font-bold justify-center rounded-full bg-secondary border">
      {username?.charAt(0)?.toUpperCase() ?? "U"}
    </div>
  );
};

export default UserButton;
