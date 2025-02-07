// Calendar.tsx
import { cn } from "@/src/lib/utils";
import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps
  extends Omit<
    React.ComponentProps<typeof ReactCalendar>,
    "onChange" | "value"
  > {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | null) => void;
  mode?: "single" | "range";
}

export function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const handleDateChange = (
    value: any,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!value) {
      onSelect?.(null);
      return;
    }

    if (mode === "single" && value instanceof Date) {
      onSelect?.(value);
    } else if (Array.isArray(value)) {
      // Handle range selection if needed
      onSelect?.(value[0]);
    }
  };

  return (
    <ReactCalendar
      {...props}
      value={selected}
      onChange={handleDateChange}
      className={cn(
        "p-3 bg-white rounded-lg shadow-lg border border-gray-100",
        className
      )}
      tileClassName={({ date, view }) =>
        cn(
          "rounded-lg text-sm p-2 hover:bg-gray-100 transition-colors",
          view === "month" && "aspect-square",
          "focus:bg-purple-50 focus:text-purple-600 focus:font-medium",
          date.toDateString() === new Date().toDateString() &&
            "bg-purple-50 text-purple-600 font-medium",
          selected?.toDateString() === date.toDateString() &&
            "bg-purple-600 text-white hover:bg-purple-500"
        )
      }
      navigationLabel={({ date }) =>
        date.toLocaleString("default", { month: "long", year: "numeric" })
      }
      nextLabel={
        <svg
          className='w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      }
      prevLabel={
        <svg
          className='w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      }
      view='month'
      minDetail='month'
    />
  );
}
