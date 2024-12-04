<template>
  <div>
    <h1>{{ title }}</h1>
    <UserTable />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      title: 'Lista de Usuários'
    }
  }
})
</script>

<style scoped></style>