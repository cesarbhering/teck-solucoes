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
  width: 90vw;
  margin-bottom: 50px;
  top: 0;
  background-color: #FDF0D5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.header-container h1 {
  margin-bottom: 10px;
}

.table-container {
  margin-top: 110px;
}
</style>