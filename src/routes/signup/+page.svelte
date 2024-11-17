<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input/index.js';
  import { toast } from 'svelte-sonner';

  const { form } = $props();
  if (form?.error) {
    setTimeout(
      () =>
        toast.error(form.error, {
          class: 'bg-red-500 border-red-300',
        }),
      100,
    );
  }
  if (form?.success && form.step === 'verified') {
    setTimeout(
      () =>
        toast.success('Your account is verified', {
          class: 'bg-green-500 border-green-300',
          description: 'You will be redirected to the login page',
          onAutoClose: () => browser && goto('/'),
        }),
      100,
    );
  }
  if (form?.success && form.step === 'verify') {
    setTimeout(
      () =>
        toast.info('Registeration successful', {
          class: 'bg-yellow-500 border-yellow-300',
          description: 'Please verify your account',
        }),
      100,
    );
  }
</script>

<div class="flex flex-1 flex-col">
  <div class="flex flex-1 flex-col justify-center items-center mt-[-128px]">
    <!-- Heading -->
    <div class="flex flex-[0.3] justify-center items-center max-w-lg md:max-w-2xl px-2">
      <h1
        class="scroll-m-20 text-2xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-center leading-loose"
      >
        Signup in a few simple steps. Psst, it's free.
      </h1>
    </div>

    <!-- Signup form -->
    {#if !form?.step || form?.step === 'register'}
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
    {/if}

    <!-- Verification form -->
    {#if form?.step === 'verify' || form?.step === 'verified'}
      <form
        method="POST"
        action="?/verify"
        class="flex border w-full max-w-xs sm:max-w-sm md:max-w-md flex-col p-4 sm:p-12 gap-4 rounded-md"
      >
        <div class="flex flex-col justify-center items-center p-2 gap-4">
          <h3 class="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">
            Verify your account
          </h3>
          <h4
            class="scroll-m-20 text-md sm:text-lg font-semibold tracking-tight text-muted-foreground text-center"
          >
            Enter the OTP sent to your registered email address
          </h4>
        </div>
        <Input name="email" value={form?.email} class="hidden" />
        <Input type="text" name="otp" value={form?.otp} placeholder="OTP" required />
        <Button variant="default" type="submit">Verify</Button>
      </form>
    {/if}
  </div>
</div>
