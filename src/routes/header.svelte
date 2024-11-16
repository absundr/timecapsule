<script lang="ts">
  import { browser } from '$app/environment';
  import BrandSvg from '$lib/components/assets/BrandSvg.svelte';
  import Exit from 'svelte-radix/Exit.svelte';
  import Hamburger from 'svelte-radix/HamburgerMenu.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import Sun from 'svelte-radix/Sun.svelte';
  import { Button } from '../lib/components/ui/button';

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
  let menuOpen = $state(false);
  const { user } = $props();
</script>

<div class="flex flex-row justify-between items-center p-2 shadow-md border">
  <div class="flex flex-row justify-center items-center">
    <BrandSvg class="w-8 h-8 sm:h-12 sm:w-12 fill-background dark:fill-foreground" />
    <h1 class="scroll-m-20 text-2xl sm:text-4xl font-black tracking-wide lg:text-4xl">
      Timecapsule
    </h1>
  </div>
  <div>
    {#if user}
      <Button variant="ghost" on:click={() => (menuOpen = !menuOpen)}>
        <Hamburger class="text-foreground" />
      </Button>
    {/if}
    {#if !user}
      <Button class="text-lg" variant="ghost" on:click={() => (dark = !dark)}>
        {#if dark}
          <Sun class=" text-foreground w-6 h-6" />
        {/if}
        {#if !dark}
          <Moon class="text-foreground w-6 h-6" />
        {/if}
      </Button>
    {/if}
  </div>
</div>
{#if menuOpen}
  <div
    class="absolute top-0 right-0 bg-primary-foreground z-50 p-2 rounded-md shadow-lg mt-16 mr-4 transition delay-150 duration-150 ease-in-out"
  >
    <ul class="flex flex-1 flex-col gap-2 px-2">
      <li class="flex-1 border-b w-full p-2">
        <Button class="text-lg" variant="ghost" on:click={() => (dark = !dark)}>
          {#if dark}
            Light mode&nbsp;&nbsp;<Sun class=" text-foreground w-4 h-4" />
          {/if}
          {#if !dark}
            Dark mode&nbsp;&nbsp;<Moon class="text-foreground w-4 h-4" />
          {/if}
        </Button>
      </li>
      <li class="flex-1 w-full p-2">
        <form method="POST" action="?/logout">
          <Button variant="ghost" class="w-full text-lg" type="submit"
            >Logout&nbsp;&nbsp;<Exit class="text-foreground w-4 h-4" /></Button
          >
        </form>
      </li>
    </ul>
  </div>
{/if}
