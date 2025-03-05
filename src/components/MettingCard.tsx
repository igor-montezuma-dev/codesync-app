import useMeetingActioins from "@/hooks/useMeetingActions";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Interview = Doc<"interviews">;

function MettingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActioins();

  const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE, MMMM d · h:mm a",
    { locale: ptBR }
  );

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="size-4" />
            {formattedDate}
          </div>

          <Badge
            variant={
              status === "live"
                ? "default"
                : status === "upcoming"
                  ? "secondary"
                  : "outline"
            }
          >
            {status === "live"
              ? "Ao vivo"
              : status === "upcoming"
                ? "Agendada"
                : "Concluída"}
          </Badge>
        </div>
        <CardTitle>{interview.title}</CardTitle>
        {interview.description && (
          <CardDescription className="line-clamp-2">
            {interview.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {status === "live" && (
          <Button
            className="w-full"
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Juntar-se à reunião
          </Button>
        )}
        {status === "upcoming" && (
          <Button className="w-full" variant="outline" disabled>
            Aguardando Início
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default MettingCard;
