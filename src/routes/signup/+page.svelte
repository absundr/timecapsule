<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import * as Alert from '$lib/components/ui/alert';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input/index.js';
  import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
  import Rocket from 'svelte-radix/Rocket.svelte';
  import type { ActionData, PageData } from './$types';

  const { data, form }: { data: PageData; form: ActionData } = $props();
  if (form?.success) {
    setTimeout(() => browser && goto('/login'), 3000);
  }
</script>

<div class="flex flex-1 flex-col">
  <!-- Success Alert -->
  {#if form?.success}
    <div class="flex justify-end items-center absolute w-full p-4">
      <section>
        <Alert.Root variant="default" class="bg-green-300 max-w-xl">
          <Rocket class="h-4 w-4" />
          <Alert.Title>Your account is created!</Alert.Title>
          <Alert.Description
            >You will be redirected to the login page momentarily.</Alert.Description
          >
        </Alert.Root>
      </section>
    </div>
  {/if}

  <!-- Failure Alert -->
  {#if form?.error}
    <div class="flex justify-end items-center absolute w-full p-4">
      <section>
        <Alert.Root
          variant="destructive"
          class="max-w-md text-destructive-foreground bg-destructive"
        >
          <ExclamationTriangle class="h-4 w-4 text-destructive-foreground" color="white" />
          <Alert.Title>Oh no!</Alert.Title>
          <Alert.Description>{form.error}</Alert.Description>
        </Alert.Root>
      </section>
    </div>
  {/if}

  <div class="flex flex-1 flex-col justify-center items-center mt-[-128px]">
    <!-- Heading -->
    <div class="flex flex-[0.3] justify-center items-center max-w-lg md:max-w-2xl">
      <h1
        class="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-center leading-loose"
      >
        Signup in a few simple steps. Psst, it's free.
      </h1>
    </div>

    <!-- Signup form -->
    <form
      method="POST"
      action="?/signup"
      class="flex border w-full max-w-xs sm:max-w-sm md:max-w-md flex-col p-4 sm:p-12 gap-4 rounded-md"
    >
      <div class="flex flex-col justify-center items-center p-2 gap-4">
        <h3 class="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">
          Enter your details
        </h3>
        <h4
          class="scroll-m-20 text-md sm:text-lg font-semibold tracking-tight text-muted-foreground text-center"
        >
          The email used for registering will be used to receive timecapsules
        </h4>
      </div>
      <Input type="text" name="username" value={form?.username} placeholder="Username" required />
      <Input type="email" name="email" value={form?.email} placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Input type="password" name="confirmPassword" placeholder="Confirm Password" required />
      <Button variant="default" type="submit">Register</Button>
      <div class="flex justify-center items-center">
        <p class="text-muted-foreground text-center">
          Already have an account? login<Button
            variant="link"
            class="p-0 pl-1.5 underline text-muted-foreground"
            href="/login">here</Button
          >
        </p>
      </div>
    </form>
  </div>
</div>
