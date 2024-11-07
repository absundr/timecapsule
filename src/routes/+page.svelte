<script lang="ts">
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Plus from 'svelte-radix/Plus.svelte';

  const { data } = $props();
  const { user, capsules } = data;

  function formatDate(dateString: string): string {
    // Create a Date object from the string
    const date = new Date(dateString);

    // Use toLocaleDateString() to format the date in English
    const englishDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return englishDate;
  }
</script>

<section class="flex flex-1 flex-col min-h-0 w-full">
  <div class="flex flex-row items-center justify-between z-30 py-2 px-4">
    <h2
      class="scroll-m-20 text-md sm:text-2xl text-center font-bold tracking-tight transition-colors first:mt-0"
    >
      Your Capsules
    </h2>
    <Button variant="default" href="/create" class="sm:text-xl">
      <Plus class="h-4 w-4 text-inherit font-extrabold sm:h-6 sm:w-6" />
      &nbsp;Create
    </Button>
  </div>
  {#if capsules.length}
    <ScrollArea
      class="flex flex-1 flex-col overflow-y-auto sm:justify-center sm:items-center sm:px-[60px] md:px-[90px] lg:px-[120px] xl:px-[360px] 2xl:px-[480px] "
    >
      <ul class="flex flex-col gap-4 py-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {#each capsules as item}
          <li class="flex flex-col bg-secondary border rounded-md p-2 shadow-md gap-4">
            <div class="flex items-center justify-between border-b pb-2">
              <h3 class="scroll-m-20 text-md font-semibold tracking-tight">
                {item.title}
              </h3>
              <Badge class={item.sent ? 'bg-green-300' : 'bg-yellow-300'}
                >{item.sent ? 'Sent' : 'Pending'}</Badge
              >
            </div>
            {#if item.picture}
              <img src={`/api/user/${user.id}/image/${item.picture}`} alt="capsule" />
            {/if}
            <p class="flex-1 leading-5 text-sm text-secondary-foreground">
              {item.message}
            </p>

            <Separator />
            <div class="flex flex-row justify-between">
              <div class="flex flex-col gap-1">
                <p class="text-sm text-muted-foreground">Posted on</p>
                <p class="text-sm text-muted-foreground">Receive on</p>
              </div>
              <div class="flex flex-col justify-end items-end gap-1">
                <p class="text-sm text-muted-foreground">{formatDate(item.createdOn)}</p>
                <p class="text-sm text-muted-foreground">{formatDate(item.sendOn)}</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </ScrollArea>
  {/if}
  {#if !capsules.length}
    <div class="flex flex-1 justify-center items-center flex-col">
      <h4 class="scroll-m-20 text-lg text-muted-foreground font-semibold tracking-tight">
        It's empty 😿
      </h4>
      <h4 class="scroll-m-20 text-md text-muted-foreground font-semibold tracking-tight">
        Add capsules and it will show up here
      </h4>
    </div>
  {/if}
</section>
