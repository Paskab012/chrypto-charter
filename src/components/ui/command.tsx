"use client";

import * as React from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Dialog, DialogContent } from "./dialog";

type CommandProps = React.ComponentProps<typeof CommandPrimitive>;
type CommandRef = React.ComponentRef<typeof CommandPrimitive>;

const Command = React.forwardRef<CommandRef, CommandProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md  border text-black ",
        className
      )}
      {...props}
    />
  )
);
Command.displayName = "Command";

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='overflow-hidden p-0'>
        <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input> & {
  isLoading?: boolean;
};
type CommandInputRef = React.ComponentRef<typeof CommandPrimitive.Input>;

const CommandInput = React.forwardRef<CommandInputRef, CommandInputProps>(
  ({ className, isLoading, ...props }, ref) => (
    <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
      {isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 shrink-0 animate-spin opacity-50' />
      ) : (
        <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
      )}
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-400",
          className
        )}
        {...props}
      />
    </div>
  )
);
CommandInput.displayName = "CommandInput";

type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>;
type CommandListRef = React.ComponentRef<typeof CommandPrimitive.List>;

const CommandList = React.forwardRef<CommandListRef, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className
      )}
      {...props}
    />
  )
);
CommandList.displayName = "CommandList";

type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>;
type CommandEmptyRef = React.ComponentRef<typeof CommandPrimitive.Empty>;

const CommandEmpty = React.forwardRef<CommandEmptyRef, CommandEmptyProps>(
  (props, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className='p-2 text-center text-sm text-black'
      {...props}
    />
  )
);
CommandEmpty.displayName = "CommandEmpty";

type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>;
type CommandGroupRef = React.ComponentRef<typeof CommandPrimitive.Group>;

const CommandGroup = React.forwardRef<CommandGroupRef, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:text-gray-400",
        className
      )}
      {...props}
    />
  )
);
CommandGroup.displayName = "CommandGroup";

type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>;
type CommandSeparatorRef = React.ComponentRef<
  typeof CommandPrimitive.Separator
>;

const CommandSeparator = React.forwardRef<
  CommandSeparatorRef,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-gray-200", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>;
type CommandItemRef = React.ComponentRef<typeof CommandPrimitive.Item>;

const CommandItem = React.forwardRef<CommandItemRef, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-gray-100 aria-selected:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
        className
      )}
      {...props}
    />
  )
);
CommandItem.displayName = "CommandItem";

interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-gray-900 ",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
};
