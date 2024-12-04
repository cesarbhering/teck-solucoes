<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="newUser">Adicionar Novo Usuário</button>
    <UserTable />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      title: 'Lista de Usuários'
    }
  },

  methods: {
    newUser() {
      this.$router.push({ name:"user-id", params: { id: 'new' } })
    }
  },
})
</script>

<style scoped></style>