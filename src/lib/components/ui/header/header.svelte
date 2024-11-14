<script lang="ts">
  import { browser } from '$app/environment';
  import BrandSvg from '$lib/components/assets/BrandSvg.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import Sun from 'svelte-radix/Sun.svelte';
  import { Button } from '../button';

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

<div class="flex flex-row justify-between items-center p-2 shadow-md border">
  <div class="flex flex-row justify-center items-center">
    <BrandSvg class="w-8 h-8 sm:h-12 sm:w-12 fill-background dark:fill-foreground" />
    <h1 class="scroll-m-20 text-2xl sm:text-4xl font-black tracking-wide lg:text-4xl">
      Timecapsule
    </h1>
  </div>
  <Button variant="ghost" on:click={() => (dark = !dark)}>
    {#if dark}
      <Sun class="text-foreground" />
    {/if}
    {#if !dark}
      <Moon class="text-foreground" />
    {/if}
  </Button>
</div>
