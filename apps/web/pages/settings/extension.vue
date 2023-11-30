<script setup lang="ts">
import { api } from "#imports"

const router = useRouter()
const token = ref<string>()

onMounted(() => {
  api.users.createToken().then((response) => {
    if (response.token) token.value = response.token
  }).catch((error: any) => {
    if (error.status === 401) router.push("/?goto_url=/settings/extension")
  })
})
</script>

<template>
  <div>
    <div id="polar-token" :style="{ color: 'white' }">
      {{ token }}
    </div>

    <LoadingScreen>
      One second, creating a connection...
    </LoadingScreen>
  </div>
</template>
