<script lang="ts">
  import { Toaster } from 'svelte-sonner';
  import '../app.css';
  import Header from './header.svelte';
  let { children, data } = $props();
  const user = $derived(data.user);
</script>

<Toaster class="bottom-12" />
<div class="flex w-screen h-screen flex-col">
  <Header {user} />
  <div class="flex flex-1 overflow-auto">
    {@render children()}
  </div>
  <div class="pl-2 pt-2 pb-2 shadow-md border">
    <h1 class="scroll-m-20 text-xs font-extrabold tracking-tight text-muted-foreground">
      Timecapsule © 2024 All rights reserved
    </h1>
  </div>
</div>
