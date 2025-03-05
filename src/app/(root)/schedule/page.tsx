"use client";

import InterviewScheduleUI from "@/app/(root)/schedule/InterviewScheduleUI";
import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

const Schedule = () => {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) {
    return <LoaderUI />;
  }

  if (!isInterviewer) {
    router.push("/login");
    return <LoaderUI />;
  }

  return <InterviewScheduleUI />;
};

export default Schedule;
