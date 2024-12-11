"use client";
import { TExecutionJob } from "@/types/types";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import SubmitResult from "./submitResult";

type Props = {
  data: TExecutionJob;
};

const ResponseTab = ({ data }: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      setLoading(false);
    };

    fetch();
  }, []);
  if (loading) return <Loading />;
  return <SubmitResult data={data} />;
};

export default ResponseTab;
