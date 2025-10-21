'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { FieldSet, FieldLegend, FieldDescription, Field, FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const timezones = [
  // 🌍 Universal
  { value: 'UTC', label: 'UTC — Coordinated Universal Time (GMT+0)' },

  // 🇺🇸 North America
  { value: 'America/New_York', label: 'New York, USA (GMT−5)' },
  { value: 'America/Chicago', label: 'Chicago, USA (GMT−6)' },
  { value: 'America/Denver', label: 'Denver, USA (GMT−7)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles, USA (GMT−8)' },
  { value: 'America/Phoenix', label: 'Phoenix, USA (GMT−7)' },
  { value: 'America/Anchorage', label: 'Anchorage, USA (GMT−9)' },
  { value: 'Pacific/Honolulu', label: 'Honolulu, USA (GMT−10)' },
  { value: 'America/Toronto', label: 'Toronto, Canada (GMT−5)' },
  { value: 'America/Vancouver', label: 'Vancouver, Canada (GMT−8)' },
  { value: 'America/Mexico_City', label: 'Mexico City, Mexico (GMT−6)' },

  // 🇧🇷 South America
  { value: 'America/Sao_Paulo', label: 'São Paulo, Brazil (GMT−3)' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires, Argentina (GMT−3)' },
  { value: 'America/Lima', label: 'Lima, Peru (GMT−5)' },
  { value: 'America/Santiago', label: 'Santiago, Chile (GMT−3)' },

  // 🇪🇺 Europe
  { value: 'Europe/London', label: 'London, UK (GMT+0)' },
  { value: 'Europe/Paris', label: 'Paris, France (GMT+1)' },
  { value: 'Europe/Berlin', label: 'Berlin, Germany (GMT+1)' },
  { value: 'Europe/Madrid', label: 'Madrid, Spain (GMT+1)' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam, Netherlands (GMT+1)' },
  { value: 'Europe/Stockholm', label: 'Stockholm, Sweden (GMT+1)' },
  { value: 'Europe/Helsinki', label: 'Helsinki, Finland (GMT+2)' },
  { value: 'Europe/Athens', label: 'Athens, Greece (GMT+2)' },
  { value: 'Europe/Istanbul', label: 'Istanbul, Türkiye (GMT+3)' },
  { value: 'Europe/Moscow', label: 'Moscow, Russia (GMT+3)' },

  // 🌍 Africa
  { value: 'Africa/Cairo', label: 'Cairo, Egypt (GMT+2)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg, South Africa (GMT+2)' },
  { value: 'Africa/Lagos', label: 'Lagos, Nigeria (GMT+1)' },
  { value: 'Africa/Casablanca', label: 'Casablanca, Morocco (GMT+0)' },
  { value: 'Africa/Nairobi', label: 'Nairobi, Kenya (GMT+3)' },

  // 🌏 Asia
  { value: 'Asia/Dubai', label: 'Dubai, UAE (GMT+4)' },
  { value: 'Asia/Karachi', label: 'Karachi, Pakistan (GMT+5)' },
  { value: 'Asia/Kolkata', label: 'Mumbai, India (GMT+5:30)' },
  { value: 'Asia/Dhaka', label: 'Dhaka, Bangladesh (GMT+6)' },
  { value: 'Asia/Bangkok', label: 'Bangkok, Thailand (GMT+7)' },
  { value: 'Asia/Jakarta', label: 'Jakarta, Indonesia (GMT+7)' },
  { value: 'Asia/Singapore', label: 'Singapore (GMT+8)' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)' },
  { value: 'Asia/Taipei', label: 'Taipei, Taiwan (GMT+8)' },
  { value: 'Asia/Shanghai', label: 'Shanghai, China (GMT+8)' },
  { value: 'Asia/Seoul', label: 'Seoul, South Korea (GMT+9)' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Japan (GMT+9)' },
  { value: 'Asia/Vladivostok', label: 'Vladivostok, Russia (GMT+10)' },

  // 🇦🇺 Australia & Oceania
  { value: 'Australia/Perth', label: 'Perth, Australia (GMT+8)' },
  { value: 'Australia/Adelaide', label: 'Adelaide, Australia (GMT+9:30)' },
  { value: 'Australia/Sydney', label: 'Sydney, Australia (GMT+10)' },
  { value: 'Australia/Brisbane', label: 'Brisbane, Australia (GMT+10)' },
  { value: 'Pacific/Auckland', label: 'Auckland, New Zealand (GMT+12)' },
  { value: 'Pacific/Fiji', label: 'Fiji (GMT+12)' },
  { value: 'Pacific/Tahiti', label: 'Tahiti, French Polynesia (GMT−10)' },
  { value: 'Pacific/Guam', label: 'Guam (GMT+10)' },
  { value: 'Pacific/Samoa', label: 'Samoa (GMT+13)' },
];

export function TimezoneSettingsForm() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('UTC');

  const selectedTimezone = timezones.find((timezone) => timezone.value === value);

  return (
    <FieldSet>
      <FieldLegend>Timezone</FieldLegend>
      <FieldDescription>
        Set your timezone to ensure accurate time display and scheduling across the application.
      </FieldDescription>
      <form data-testid="">
        <FieldGroup>
          <Field>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal"
                >
                  {selectedTimezone ? selectedTimezone.label : 'Select timezone...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-[var(--radix-popover-trigger-width)] p-0"
                data-testid="timezone-popover-content"
              >
                <Command>
                  <CommandInput placeholder="Search timezone..." />
                  <CommandList className="w-full">
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandGroup>
                      {timezones.map((timezone) => (
                        <CommandItem
                          key={timezone.value}
                          value={timezone.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === timezone.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {timezone.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>
          <div className="flex justify-start">
            <Button type="submit">Save Timezone</Button>
          </div>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
