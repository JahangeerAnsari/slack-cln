import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Picker  from '@emoji-mart/react';
import data from '@emoji-mart/data'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

import type { Emoji } from "@emoji-mart/data";
import { useState } from "react";
import { TooltipProvider } from "./tooltip";
interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: string) => void;
}
export const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setToolTipOpen] = useState(false);
  const selectEmoji = (emoji:any) =>{
    onEmojiSelect(emoji);
    setPopoverOpen(false);
    setTimeout(() =>{
      setToolTipOpen(false)
    },500)

  }
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip open={tooltipOpen} onOpenChange={setToolTipOpen} delayDuration={50 }>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
          {children}
          </TooltipTrigger>
           </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={selectEmoji}/>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
