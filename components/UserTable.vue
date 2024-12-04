<template>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>username</th>
        <th>email</th>
        <th>grupo</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in userStore.userList">
        <td>{{ user.nome }}</td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.grupo }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  created() {
    this.userStore.fetchUserList()
  }
})
</script>

<style scoped></style>