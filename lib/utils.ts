import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  KLabel extends keyof T,
  KValue extends keyof T
>(
  items: T[] | undefined | null,
  labelKey: KLabel,
  valueKey: KValue
): { label: string; value: string }[] {
  return (
    items?.map((item) => ({
      label: String(item[labelKey]),
      value: String(item[valueKey]),
    })) ?? []
  );
}
