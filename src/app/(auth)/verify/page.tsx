import VerifyCard from "@/components/auth/verify-card";
import { notFound } from "next/navigation";

const VerifyPage = ({
  searchParams,
}: {
  searchParams: { email: string | undefined };
}) => {
  const email = searchParams.email;

  if (!email) return notFound();
  return (
    <div>
      <VerifyCard email={email} />
    </div>
  );
};

export default VerifyPage;
