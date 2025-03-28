"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/src/lib/utils";

type ScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
>;
type ScrollAreaRef = React.ElementRef<typeof ScrollAreaPrimitive.Root>;

const ScrollArea = React.forwardRef<ScrollAreaRef, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = "ScrollArea";

type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  orientation?: "vertical" | "horizontal";
};
type ScrollBarRef = React.ElementRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

const ScrollBar = React.forwardRef<ScrollBarRef, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical"
          ? "h-full w-2.5 border-l border-l-transparent p-[1px]"
          : "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-gray-200 dark:bg-gray-800' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
