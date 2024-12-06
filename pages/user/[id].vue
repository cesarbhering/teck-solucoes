<template>
  <div>
    <h1>Editar Usuário</h1>
    <button @click="$router.push('/')">Voltar a Listagem</button>

    <form ref="user-form" @submit.prevent="handleSubmit">
      <input required v-model="userStore.user.nome" />
      <input required v-model="userStore.user.cpf" />
      <input required type="email" v-model="userStore.user.email" />
      <input required v-model="userStore.user.username" />
      <input required v-model="userStore.user.grupo" />
      <button>{{ buttonActionText }}</button>
    </form>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'UserForm',

  emits: ['showFeedback'],

  data() {
    return {
      userStore: useUserStore(),
      router: useRoute()
    }
  },

  mounted() {
    if (!this.isNewUser) {
      this.userStore.fetchUser(this.router.params.id as string)
    }
  },

  unmounted() {
    this.userStore.resetUser()
  },

  computed: {
    isNewUser() {
      return this.router.params.id === 'new'
    },
    buttonActionText() {
      return this.isNewUser ? 'Salvar' : 'Alterar'
    }
  },

  methods: {
    async handleSubmit() {
      if (this.isNewUser) {
        await this.userStore.createUser()
        this.$router.push({ name: "user-id", params: { id: this.userStore.user.id } })
        return
      }
      await this.userStore.updateUser()
      this.$emit('showFeedback', { message: 'Usuário editado com sucesso', type: 'success' });
    }
  },
})
</script>

<style scoped></style>