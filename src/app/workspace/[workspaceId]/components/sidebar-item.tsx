
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sidebarVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden rounded-md transition",
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

interface SidebarItemProps
  extends VariantProps<typeof sidebarVariants> {
  label: string;
  id: string;
  icon: IconType;
}

export const SidebarItem = ({
  icon: Icon,
  id,
  label,
  variant = "default",
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant="transparent"
      size="sm"
      asChild
      className={sidebarVariants({ variant })}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
