import { getInterviewerInfo } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

function CommentDialog({ interviewId }: { interviewId: Id<"interviews"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("3");

  const addComment = useMutation(api.comments.addComment);
  const users = useQuery(api.users.getUsers);
  const existingComments = useQuery(api.comments.getComments, { interviewId });

  const handleSubmit = async () => {
    if (!comment.trim())
      return toast.error("Por favor, adicione um comentário");
    try {
      await addComment({
        interviewId,
        content: comment.trim(),
        rating: parseInt(rating),
      });
      toast.success("Comentário adicionado com sucesso");
      setComment("");
      setRating("3");
      setIsOpen(false);
    } catch (error) {
      toast.error("Falha ao adicionar comentário");
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <StarIcon
          key={starValue}
          size={24}
          className={`size-4 ${starValue <= rating ? "fill-primary text-primary" : "text-muted-foregroun"}`}
        />
      ))}
    </div>
  );

  if (existingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <MessageSquareIcon className="size-4 mr-2" />
          Adicionar comentário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-2-[600px">
        <DialogHeader>
          <DialogTitle>Comentário sobre a entrevista</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {existingComments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Comentários Anteriores</h4>
                <Badge variant="outline">
                  {existingComments.length} Comentário{" "}
                  {existingComments.length > 1 ? "s" : ""}
                </Badge>
              </div>
              <ScrollArea className="h-[240px]">
                <div className="space-y-4">
                  {existingComments.map((comment, index) => {
                    const interviewer = getInterviewerInfo(
                      users,
                      comment.interviewerId
                    );
                    return (
                      <div
                        key={index}
                        className="rounded-lg border p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={interviewer.image} />
                              <AvatarFallback>
                                {interviewer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {interviewer.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(
                                  comment._creationTime,
                                  " d MMM, yyyy • h:mm a",
                                  { locale: ptBR }
                                )}
                              </p>
                            </div>
                          </div>
                          {renderStars(comment.rating)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Avaliação</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      <div className="flex items-center gap-2">
                        {renderStars(value)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Seu comentário</Label>
              <Textarea
                className="h-32"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Adicione um comentário sobre a entrevista"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
