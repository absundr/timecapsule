<script lang="ts">
  import { browser } from '$app/environment';
  import { Button } from '$lib/components/ui/button';
  import Moon from 'svelte-radix/Moon.svelte';
  import Sun from 'svelte-radix/Sun.svelte';
  import '../app.css';
  let { children } = $props();
  let dark = $state(false);
  if (browser) {
    dark = localStorage.getItem('dark') === 'true';
  }
  $effect(() => {
    if (!dark) {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      browser && localStorage.setItem('dark', 'false');
    } else {
      document.getElementsByTagName('html')[0].classList.add('dark');
      browser && localStorage.setItem('dark', 'true');
    }
  });
</script>

<div class="flex w-screen h-screen flex-col">
  <div class="flex flex-row justify-between p-4 shadow-md border">
    <h1 class="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-4xl">
      Timecapsule
    </h1>
    <Button variant="ghost" on:click={() => (dark = !dark)}>
      {#if dark}
        <Sun class="text-foreground" />
      {/if}
      {#if !dark}
        <Moon class="text-foreground" />
      {/if}
    </Button>
  </div>
  <div class="flex flex-1 overflow-auto">
    {@render children()}
  </div>
  <div class="pl-2 pt-2 pb-2 shadow-md border">
    <h1 class="scroll-m-20 text-xs font-extrabold tracking-tight text-muted-foreground">
      Timecapsule © 2024 All rights reserved
    </h1>
  </div>
</div>
