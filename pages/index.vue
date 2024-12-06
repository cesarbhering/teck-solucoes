<template>
  <div>
    <div class="header-container">
      <h1>{{ title }}</h1>
      <button @click="newUser">Adicionar Novo Usuário</button>
    </div>
    <div class="table-container">
      <UserTable @showFeedback="$emit('showFeedback', $event)" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "IndexPage",

  emits: ['showFeedback'],

  data() {
    return {
      title: 'Lista de Usuários'
    }
  },

  methods: {
    newUser() {
      this.$router.push({ name: "user-id", params: { id: 'new' } })
    }
  },
})
</script>

<style lang="css" scoped>
.header-container {
  position: fixed;
  margin-bottom: 40px;
  top: 0;
  width: 100%;
  background-color: #FDF0D5;
}

.header-container h1 {
  margin-bottom: 10px;
}

.table-container {
  margin-top: 110px;
}
</style>