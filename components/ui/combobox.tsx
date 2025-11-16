"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Option } from "@/types";


interface ComboboxProps {
    options: Option[];
    placeholder?: string;
    value?: string | null;
    onChange?: (value: string | null) => void;
    name?: string;
}

export function ComboBox({ options, placeholder, value, onChange, name }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // se o valor for controlado externamente, busca o objeto correspondente
    const selectedOption = options.find((opt) => opt.value === value) || null;

    function handleSelect(selectedValue: string) {
        const selected = options.find((o) => o.value === selectedValue) || null;
        onChange?.(selected ? selected.value : null);
        setOpen(false);
    }

    const displayLabel = selectedOption ? selectedOption.label : placeholder;

    const list = (
        <StatusList options={options} setOpen={setOpen} onSelect={handleSelect} />
    );

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {displayLabel}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    {list}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {displayLabel}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">{list}</div>
            </DrawerContent>
        </Drawer>
    );
}
function StatusList({
  setOpen,
  options,
  onSelect,
}: {
  setOpen: (open: boolean) => void;
  options: Option[];
  onSelect: (value: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search anything..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((opt) => (
            <CommandItem
              key={opt.value}
              value={opt.value}
              onSelect={(v) => {
                onSelect(v);
                setOpen(false);
              }}
            >
              {opt.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
