<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import Datepicker from '$lib/components/ui/datepicker/datepicker.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Toaster } from '$lib/components/ui/sonner';
  import { Textarea } from '$lib/components/ui/textarea';
  import { parseDate } from '@internationalized/date';
  import { toast } from 'svelte-sonner';
  import type { ActionData, PageData } from './$types';

  const { data, form }: { data: PageData; form: ActionData } = $props();
  if (form?.sucess) {
    toast.success('Timecapsule has been created', {
      description: `You will be notified on ${form.sendOn}`,
    });
    setTimeout(() => browser && goto('/'), 3000);
  }
  if (form?.error) {
    toast.error('Oh no! Something went wrong', {
      description: form.error,
    });
  }
</script>

<Toaster position="bottom-right" class="w-full" />

<section class="flex flex-1">
  <div class="flex flex-1 flex-col p-4 gap-4">
    <h2
      class="scroll-m-20 text-md sm:text-2xl font-bold tracking-tight transition-colors first:mt-0"
    >
      A few details to get you setup
    </h2>
    <form
      method="POST"
      action="?/create"
      enctype="multipart/form-data"
      class="flex flex-1 flex-col space-y-6"
    >
      <div class="flex flex-col gap-4">
        <p class="text-sm italic">Add a memorable title for your timecapsule</p>
        <Input
          name="title"
          type="text"
          value={form?.title}
          placeholder="Eg: A Message for Tomorrow"
          maxlength={100}
          class="border-0 shadow-none border-b rounded-none text-sm focus-visible:ring-0 focus:border-b-[1px] focus:border-b-primary"
        />
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-sm italic">Leave a short message to your future-self</p>
        <Textarea
          name="message"
          value={form?.message}
          required
          maxlength={1000}
          class="border-0 shadow-none border-b rounded-none text-sm min-h-[88px] focus-visible:ring-0 focus:border-b-[1px] focus:border-b-primary"
          placeholder="Eg: Hey future me, I hope life is treating you well. Remember all the goals you set today and keep pushing forward!"
        />
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-sm italic">Add a picture, it's optional</p>
        <Input
          id="picture"
          name="picture"
          type="file"
          accept="image/png, image/jpeg"
          class="border-0 shadow-none border-b rounded-none text-sm focus-visible:ring-0 focus:border-b-[1px] focus:border-b-primary placeholder:text-red-600"
        />
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-sm italic">When would you like to receive this capsule?</p>
        <Datepicker
          name="sendOn"
          required
          value={form?.sendOn ? parseDate(form?.sendOn.toString()) : undefined}
          class="border-0 shadow-none border-b rounded-none text-sm focus-visible:ring-0 focus:border-b-[1px] focus:border-b-primary"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  </div>
</section>
