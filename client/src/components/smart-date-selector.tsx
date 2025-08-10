
import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SmartDateSelectorProps {
  value: {
    year?: string;
    month?: string;
    day?: string;
  };
  onChange: (value: { year?: string; month?: string; day?: string }) => void;
  label?: string;
  errors?: {
    year?: string;
    month?: string;
    day?: string;
  };
}

export function SmartDateSelector({ value, onChange, label = "Date", errors }: SmartDateSelectorProps) {
  // Check if a year is a leap year
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Get number of days in a month for a specific year
  const getDaysInMonth = (year: number, month: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (month === 2 && isLeapYear(year)) {
      return 29; // February in leap year
    }
    
    return daysInMonth[month - 1] || 31;
  };

  // Generate year options (18 to 80 years old)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 63 }, (_, i) => currentYear - 18 - i);

  // Month options
  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  // Generate day options based on selected year and month
  const getDayOptions = (): number[] => {
    if (!value.year || !value.month) return [];
    
    const year = parseInt(value.year);
    const month = parseInt(value.month);
    const daysInSelectedMonth = getDaysInMonth(year, month);
    
    return Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);
  };

  const handleYearChange = (newYear: string) => {
    const updatedValue = { ...value, year: newYear };
    
    // Reset month and day when year changes
    if (value.month || value.day) {
      updatedValue.month = undefined;
      updatedValue.day = undefined;
    }
    
    onChange(updatedValue);
  };

  const handleMonthChange = (newMonth: string) => {
    const updatedValue = { ...value, month: newMonth };
    
    // Reset day when month changes and validate if current day is valid for new month
    if (value.day && value.year) {
      const year = parseInt(value.year);
      const month = parseInt(newMonth);
      const currentDay = parseInt(value.day);
      const maxDaysInNewMonth = getDaysInMonth(year, month);
      
      if (currentDay > maxDaysInNewMonth) {
        updatedValue.day = undefined;
      }
    }
    
    onChange(updatedValue);
  };

  const handleDayChange = (newDay: string) => {
    onChange({ ...value, day: newDay });
  };

  const dayOptions = getDayOptions();

  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <div className="grid grid-cols-3 gap-4">
        {/* Year Selection */}
        <FormItem>
          <Select onValueChange={handleYearChange} value={value.year || ""}>
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.year && <FormMessage>{errors.year}</FormMessage>}
        </FormItem>

        {/* Month Selection */}
        <FormItem>
          <Select 
            onValueChange={handleMonthChange} 
            value={value.month || ""} 
            disabled={!value.year}
          >
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder={value.year ? "Month" : "Select Year First"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.month && <FormMessage>{errors.month}</FormMessage>}
        </FormItem>

        {/* Day Selection */}
        <FormItem>
          <Select 
            onValueChange={handleDayChange} 
            value={value.day || ""} 
            disabled={!value.year || !value.month}
          >
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder={
                  !value.year ? "Select Year First" :
                  !value.month ? "Select Month First" :
                  "Day"
                } />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {dayOptions.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.day && <FormMessage>{errors.day}</FormMessage>}
        </FormItem>
      </div>
      
      {/* Show selected date information */}
      {value.year && value.month && (
        <div className="text-xs text-muted-foreground">
          {value.month === "2" && isLeapYear(parseInt(value.year)) && (
            <span className="text-blue-600">Leap year - February has 29 days</span>
          )}
          {value.year && value.month && !value.day && (
            <span>
              {monthOptions.find(m => m.value === value.month)?.label} {value.year} has {getDaysInMonth(parseInt(value.year), parseInt(value.month))} days
            </span>
          )}
        </div>
      )}
    </div>
  );
}
