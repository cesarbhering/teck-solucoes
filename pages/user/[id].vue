<template>
  <div>
    <h1>Editar Usuário</h1>
    <button @click="handleDelete">Excluir Usuário</button>
    <button>Voltar a Listagem</button>

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

  data() {
    return {
      userStore: useUserStore(),
      router: useRoute()
    }
  },

  created() {
    this.router = useRoute()
    this.userStore = useUserStore()
    this.userStore.fetchUser(this.router.params.id)
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
    async handleDelete() {
      await this.userStore.deleteUser(this.userStore.user.id)
      this.$router.push("/")

    },

    async handleSubmit() {
      if (this.isNewUser) {
        await this.userStore.createUser()
        this.$router.push({ name: "user-id", params: { id: this.userStore.user.id } })
        return
      }
      await this.userStore.updateUser()
      this.$emit('showFeedback', { message: 'Hello from child!', type: 'error' });
    }
  },
})
</script>

<style scoped></style>