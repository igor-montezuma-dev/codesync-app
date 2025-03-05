"use client";

import CommentDialog from "@/components/CommentDialog";
import LoaderUI from "@/components/LoaderUI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INTERVIEW_CATEGORY } from "@/constants";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterwiews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!interviews || !users) return <LoaderUI />;

  const groupedInterviews = groupInterviews(interviews);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Link href="/schedule">
          <Button>Agendar nova entrevista</Button>
        </Link>
      </div>

      <div className="space-y-8">
        {INTERVIEW_CATEGORY.map(
          (category) =>
            groupedInterviews[category.id]?.length > 0 && (
              <section key={category.id}>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <Badge variant={category.variant}>
                    {groupedInterviews[category.id].length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedInterviews[category.id].map(
                    (interview: Interview) => {
                      const candidateInfo = getCandidateInfo(
                        users,
                        interview.candidateId
                      );
                      const startTime = new Date(interview.startTime);

                      return (
                        <Card className="hover:shadow-md hover:border-primary transition-all">
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={candidateInfo.image} />
                                <AvatarFallback>
                                  {candidateInfo.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">
                                  {candidateInfo.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {interview.title}
                                </p>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                {format(startTime, "MMM dd", { locale: ptBR })}
                              </div>
                              <div className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                {format(startTime, "hh:mm a", { locale: ptBR })}
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                            {interview.status === "completed" && (
                              <div className="flex gap-2 w-full">
                                <Button
                                  className="flex-1"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      interview._id,
                                      "succeeded"
                                    )
                                  }
                                >
                                  <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                  Aprovado
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() =>
                                    handleStatusUpdate(interview._id, "failed")
                                  }
                                >
                                  <XCircleIcon className="h-4 w-4 mr-2" />
                                  Reprovado
                                </Button>
                              </div>
                            )}
                            <CommentDialog interviewId={interview._id} />
                          </CardFooter>
                        </Card>
                      );
                    }
                  )}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
export default DashboardPage;
