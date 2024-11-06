<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="flex w-screen h-screen flex-col">
  <div class="pl-4 pt-2 pb-4 shadow-md border">
    <h1 class="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
      Timecapsule
    </h1>
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
