"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";

import LoaderUI from "@/components/LoaderUI";
import MeetingModal from "@/components/MeetingModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;

      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase().replace(" ", "-")}`);
        break;
    }
  };

  if (isLoading) {
    return <LoaderUI />;
  }

  return (
    <div className="container max-w-7xl mx-auto p-6 ">
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Bem vindo de volta!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Gerencie suas entrevistas e candidatos de forma eficiente"
            : "Acesse suas próximas entrevistas e prepare-se para brilhar"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={
              modalType === "join" ? "Junte-se à entrevista" : "Nova reunião"
            }
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div>Painel do candidato é aqui</div>
        </>
      )}
    </div>
  );
}
