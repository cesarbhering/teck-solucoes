<template>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>username</th>
        <th>email</th>
        <th>grupo</th>
        <th>ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in userStore.userList">
        <td>{{ user.nome }}</td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.grupo }}</td>
        <td>
          <div @click="handleEditUser(user.id)">
            <i class="fas fa-edit" />
          </div>
          <div @click="handleDeleteUser(user.id)">
            <i class="fas fa-trash" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default defineNuxtComponent({
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
      }
    ]
  },
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  created() {
    this.userStore.fetchUserList()
  },

  methods: {
    handleEditUser(id) {
      this.$router.push({ name: "user-id", params: { id } })
    },

    async handleDeleteUser(id) {
      await this.userStore.deleteUser(id)
      this.userStore.fetchUserList()
    }
  },
})
</script>

<style scoped></style>