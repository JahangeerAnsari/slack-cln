import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface HintProps{
    label:string;
    children:React.ReactNode;
    side?:"left" | "right" |"top" | "bottom";
    align?:"start" | "center" |"end" ;

}
export const Hint = ({children,label,align,side}:HintProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}  align={align} className="bg-black text-white border border-white/5">
        <p className="font-medium text-xs">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};
