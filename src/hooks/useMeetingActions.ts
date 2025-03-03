import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useMeetingActioins = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeeting = async () => {
    if (!client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Reunião instantânea",
          },
        },
      });
      router.push(`/meeting/${call.id}`);
      toast.success("Reunião criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reunião");
    }
  };

  const joinMeeting = async (callId: string) => {
    if (!client)
      return toast.error(
        "Erro ao entrar na reunião. Por favor, tente novamente."
      );
    router.push(`/meeting/${callId}`);
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActioins;
