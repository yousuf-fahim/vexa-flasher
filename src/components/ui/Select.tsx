import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  placeholder?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled = false,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-900 shadow-sm transition-all",
          "hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          ""
        )}
      >
        {!value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 " />
      {selectedOption?.description && (
        <p className="mt-1.5 text-xs text-gray-500 ">
          {selectedOption.description}
        </p>
      )}
    </div>
  );
}
