<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils.js';
  import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
  import Calender from 'svelte-radix/Calendar.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });

  type $$Props = HTMLInputAttributes;

  let className: $$Props['class'] = undefined;
  export let value: $$Props['value'] = undefined;
  export { className as class };
  export let readonly: $$Props['readonly'] = undefined;
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        'justify-start text-left font-normal',
        !value && 'text-muted-foreground',
        className,
      )}
      builders={[builder]}
    >
      <input class="hidden" bind:value {readonly} {...$$restProps} />
      <Calender class="mr-2 h-4 w-4" />
      {value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a date'}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar minValue={today(getLocalTimeZone())} bind:value initialFocus />
  </Popover.Content>
</Popover.Root>
