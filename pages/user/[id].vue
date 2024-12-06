<template>
  <div class="user-container">
    <h1>Editar Usuário</h1>
    <button @click="$router.push('/')">Voltar a Listagem</button>

    <form ref="user-form" @submit.prevent="handleSubmit">
      <div>
        <label for="nome">Nome</label>
        <input id="nome" required v-model="userStore.user.nome" />
      </div>

      <div>
        <label for="cpf">CPF</label>
        <input id="cpf" required v-model="userStore.user.cpf" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" required type="email" v-model="userStore.user.email" />
      </div>

      <div>
        <label for="username">Username</label>
        <input id="username" required v-model="userStore.user.username" />
      </div>

      <div>
        <label for="grupo">Group</label>
        <input id="grupo" required v-model="userStore.user.grupo" />
      </div>

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
      this.$emit('showFeedback', { message: 'Usuário criado com sucesso', type: 'success' });
        this.$router.push({ name: "user-id", params: { id: this.userStore.user.id } })
        return
      }
      await this.userStore.updateUser()
      this.$emit('showFeedback', { message: 'Usuário editado com sucesso', type: 'success' });
    }
  },
})
</script>

<style lang="css" scoped>
.user-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.user-container form label {
  display: block; 
}

.user-container form input {
  margin-bottom: 14px;
}
</style>