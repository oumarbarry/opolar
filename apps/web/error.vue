<script setup lang="ts">
// import { Button } from "polarkit/components/ui/atoms"

// const props = defineProps({ error: Object })

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
  <Html>
    <Body class="bg-blue-100">
      <div class="flex grow flex-col items-center justify-center space-y-4 p-16">
        <h2 class="text-xl">
          Something went wrong!
        </h2>

        <Button :full-width="false" @click="handleError">
          <span>Go back to Polar</span>
        </Button>

        <p class="pt-24 text-gray-400" />
      </div>
    </Body>
  </Html>
</template>
