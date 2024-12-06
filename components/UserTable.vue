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
          <div class="actions-container">
            <div @click="handleEditUser(user.id)" class="edit" />
            <div @click="showDeleteDialog(user.id)" class="delete" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modais -->
  <ConfirmationDialog ref="confirmation-dialog" />
</template>

<script lang="ts">
import type { ConfirmationDialogOptions } from '~/types/types';

export default defineNuxtComponent({
  name: "UserTable",

  data() {
    return {
      userStore: useUserStore()
    };
  },

  created() {
    this.userStore.fetchUserList();
  },

  methods: {
    handleEditUser(id?: string) {
      this.$router.push({ name: "user-id", params: { id } })
    },

    async showDeleteDialog(id?: string) {
      if (id) {
        await (this.$refs['confirmation-dialog'] as { show: (options: ConfirmationDialogOptions) => Promise<boolean> }).show({
          title: 'Excluir Usuário',
          message: 'Tem certeza que deseja excluir o usuário?',
        }).then(async (response) => {
          if (response) {
            await this.userStore.deleteUser(id);
            // Atuliza lista
            this.userStore.fetchUserList();
            this.$emit('showFeedback', { message: 'Usuário excluído com sucesso', type: 'success' });
            return
          }
        })
      }
      return this.$emit('showFeedback', { message: 'Erro ao tentar deletar usuário', type: 'error' });
    }
  },
});
</script>

<style scoped>
.actions-container {
  display: flex;
}

.delete {
  width: 40px;
  height: 40px;
  background: url("public/delete.svg") center no-repeat;
  background-size: 16px;
}

.edit {
  width: 35px;
  height: 40px;
  background: url("public/edit.svg") center no-repeat;
  background-size: 16px;
}
</style>