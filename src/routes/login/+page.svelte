<script lang="ts">
  import { browser } from '$app/environment';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { toast } from 'svelte-sonner';

  const { form } = $props();
  if (form?.success) {
    setTimeout(() => {
      toast.success('You are now logged in', {
        class: 'bg-green-500 border-green-300',
        duration: 1500,
      });
    }, 100);
    setTimeout(() => {
      if (browser) {
        window.location.href = '/';
      }
    }, 1500);
  }

  if (form?.error) {
    setTimeout(() => {
      toast.error(form.error, {
        class: 'bg-red-500 border-red-300',
        duration: 3000,
      });
    }, 100);
  }
</script>

<div class="flex flex-1 flex-col">
  <div class="flex flex-1 flex-col justify-center items-center mt-[-128px]">
    <!-- Heading -->
    <div class="flex flex-[0.3] justify-center items-center max-w-lg md:max-w-2xl">
      <h1
        class="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-center leading-loose"
      >
        Send a digital timecapsule to yourself in the future
      </h1>
    </div>

    <!-- Login form -->
    <form
      method="POST"
      action="?/login"
      class="flex border w-full max-w-xs sm:max-w-sm md:max-w-md flex-col p-4 sm:p-12 gap-4 rounded-md"
    >
      <div class="flex flex-col justify-center items-center p-2 gap-4">
        <h3 class="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">Hey there 👋</h3>
        <h4
          class="scroll-m-20 text-md sm:text-lg font-semibold tracking-tight text-muted-foreground text-center"
        >
          Sign in to continue using the app
        </h4>
      </div>
      <div class="border mb-2"></div>
      <Input type="text" name="auth" placeholder="Email or username" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button variant="default" type="submit">Login</Button>
      <div class="flex justify-center items-center">
        <p class="text-muted-foreground text-center">
          Don't have an account? sign up<Button
            variant="link"
            class="p-0 pl-1.5 underline text-muted-foreground"
            href="/signup">here</Button
          >
        </p>
      </div>
    </form>
  </div>
</div>
