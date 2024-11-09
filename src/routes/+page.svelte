<script lang="ts">
  import EmptySvg from '$lib/components/assets/EmptySvg.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { CreateCapsule } from '$lib/components/ui/createcapsule/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import { Toaster } from '$lib/components/ui/sonner/index.js';
  import Plus from 'svelte-radix/Plus.svelte';
  import { toast } from 'svelte-sonner';

  const { data, form } = $props();
  const { user, capsules } = data;

  let openDialog = $state(false);

  if (form?.error) {
    openDialog = true;
    setTimeout(
      () =>
        toast.error(form.error, {
          class: 'bg-red-500 border-red-300',
        }),
      100,
    );
  }

  if (form?.sucess) {
    setTimeout(
      () =>
        toast.success('Capsule created', {
          class: 'bg-green-500 border-green-300',
        }),
      100,
    );
  }

  function formatDate(dateString: string): string {
    // Create a Date object from the string
    const date = new Date(dateString);

    // Use toLocaleDateString() to format the date in English
    const englishDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return englishDate;
  }
</script>

<Toaster class="z-[1000]" />
<section class="flex flex-1 flex-col min-h-0 w-full sm:items-center">
  <div
    class="flex w-full flex-row items-center justify-between z-30 p-4 sm:px-6 sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]"
  >
    <h2
      class="scroll-m-20 text-md sm:text-2xl text-center font-bold tracking-tight transition-colors first:mt-0"
    >
      Your Capsules
    </h2>
    <Button variant="default" on:click={() => (openDialog = true)} class="sm:text-lg">
      <Plus class="h-4 w-4 text-inherit font-extrabold sm:h-6 sm:w-6" />
      &nbsp;Create
    </Button>
  </div>
  {#if capsules.length}
    <ScrollArea class="flex w-full flex-1 flex-col overflow-auto">
      <div class="flex flex-1 flex-col sm:items-center">
        <ul
          class="flex flex-1 flex-col gap-4 py-4 px-4 w-full sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]"
        >
          {#each capsules as item}
            <li class="flex flex-col bg-secondary border rounded-md p-2 shadow-md gap-4 sm:p-4">
              <div class="flex items-center justify-between border-b pb-2">
                <div class="flex flex-1 flex-col min-w-0">
                  <h3
                    class="scroll-m-20 text-md font-semibold tracking-tight [word-break:break-word]"
                  >
                    {item.title}
                  </h3>
                  <p class="scroll-m-20 text-muted-foreground text-xs tracking-tight">
                    {formatDate(item.sendOn)}
                  </p>
                </div>
                <Badge class={item.sent ? 'bg-green-300' : 'bg-yellow-300'}
                  >{item.sent ? 'Sent' : 'Pending'}</Badge
                >
              </div>
              {#if item.picture}
                <img src={`/api/user/${user.id}/image/${item.picture}`} alt="capsule" />
              {/if}
              <p class="leading-5 text-sm text-secondary-foreground [word-break:break-word]">
                {item.message}
              </p>
            </li>
          {/each}
        </ul>
      </div>
    </ScrollArea>
  {/if}
  {#if !capsules.length}
    <div class="flex flex-1 justify-center items-center flex-col gap-4">
      <EmptySvg class="w-64 h-64 lg:w-[28rem] lg:h-[28rem]" />
      <h4 class="scroll-m-20 text-lg lg:text-xl text-muted-foreground font-semibold tracking-tight">
        No timecapsules found
      </h4>
    </div>
  {/if}
  <Dialog.Root bind:open={openDialog}>
    <Dialog.Content class="h-full p-0 sm:h-auto sm:p-4">
      <CreateCapsule {form} />
    </Dialog.Content>
  </Dialog.Root>
</section>
