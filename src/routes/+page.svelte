<script lang="ts">
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Plus from 'svelte-radix/Plus.svelte';

  const { data } = $props();
  const { user, capsules } = data;

  async function fetchImage(userId: string, imageId: string) {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('imageId', imageId);

    const response = await fetch('/+page', {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: formData,
    });
    const result = (await response.json()) as { imageSrc: string };
    console.log(result);
    return result.imageSrc;
  }

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

<section class="flex w-full flex-col p-4">
  <div
    class="flex flex-row items-center justify-between border p-2 rounded-md bg-primary-foreground shadow-md"
  >
    <h2
      class="scroll-m-20 text-md sm:text-2xl text-center font-bold tracking-tight transition-colors first:mt-0"
    >
      Your Capsules
    </h2>
    <Button variant="outline" href="/create" class="font-semibold sm:text-2xl">
      <Plus class="mr-2 h-4 w-4 text-inherit font-extrabold sm:h-6 sm:w-6" />
      Create
    </Button>
  </div>
  {#if capsules.length}
    <ul class="flex flex-1 pt-4 flex-col gap-4 pb-4">
      {#each capsules as item}
        <li class="flex flex-col border rounded-md p-2 bg-secondary shadow-md gap-4">
          <div class="flex items-center justify-between border-b">
            <h3 class=" leading-10 scroll-m-20 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <Badge class={item.sent ? 'bg-green-300' : 'bg-yellow-300'}
              >{item.sent ? 'Sent' : 'Pending'}</Badge
            >
          </div>

          <p class="leading-6 text-md text-secondary-foreground">
            {item.message}
          </p>
          {#if item.picture}
            <img src={`/api/user/${user.id}/image/${item.picture}`} alt="capsule" />
          {/if}
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
