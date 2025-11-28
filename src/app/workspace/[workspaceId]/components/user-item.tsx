import { Button } from "@/components/ui/button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const userVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden rounded-md transition",
  {
    variants: {
      variant: {
        default: "bg-transparent text-[#f9edffcc] hover:bg-white/5",
        active: "bg-white/90 text-[#481349] hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userVariants>["variant"];
}
export const UserItem = ({
  id,
  image,
  label = "Member",
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparent"
      className={cn(userVariants({ variant: variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
