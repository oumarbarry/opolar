<script setup lang="ts">
import { CONFIG } from '~/config'
</script>

<template>
  <div class="flex items-center justify-between sm:justify-start sm:space-x-4">
    <LogoType70 class="h-12" />

    <a
      :href="`${CONFIG.WEB_URL}/settings/extension`"
      target="_blank"
      rel="noreferrer"
      class="mr-2 inline-flex items-center space-x-2 rounded-lg bg-blue-500 p-2 px-3 text-center text-sm font-medium text-white transition-colors duration-100 hover:bg-blue-600 sm:mr-0"
    >
      Connect Polar
    </a>

    <span class="hidden text-sm text-gray-500 sm:inline-flex">
      Connect Polar to see pledges here on GitHub
    </span>
  </div>
</template>
