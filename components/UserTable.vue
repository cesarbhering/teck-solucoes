<template>
  <div class="table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Username</th>
          <th>Email</th>
          <th>Grupo</th>
          <th>Ações</th>
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
              <nuxt-link :to="{ name: 'user-id', params: { id: 'new', sistema: user.id } }">
                <div @click="handleEditUser(user.id)" class="edit" />
              </nuxt-link>
              <div @click="showDeleteDialog(user.id)" class="delete" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modais -->
  <ConfirmationDialog ref="confirmation-dialog" />
</template>

<script lang="ts">
import type { ConfirmationDialogOptions } from '~/types/types';

export default defineNuxtComponent({
  name: "UserTable",

  emits: ['showFeedback'],

  data() {
    return {
      userStore: useUserStore()
    };
  },

  created() {
    this.userStore.fetchUserList();
  },

  methods: {
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
    }
  },
});
</script>

<style scoped>
.table-container {
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-table {
  border-collapse: collapse;
  white-space: nowrap;
  overflow: hidden;
}

.user-table tr:not(:last-child) {
  border-bottom: 1px solid #C1121F;
}

.user-table tr:nth-child(even) {
  background-color: #d5e2fd;
}


.user-table td,
.user-table th {
  padding: 4px;
  border: none;
}

.actions-container {
  display: flex;
}

@media (max-width: 768px) {
  .table-container {
    width: 90vw;
  }

  thead {
    display: none;
  }

  td {
    display: block;
    text-align: left;
    font-weight: bold;
  }

}

.delete {
  width: 25px;
  height: 30px;
  background: url("public/delete.svg") center no-repeat;
  background-size: 16px;
  cursor: grab;
}


.edit {
  width: 25px;
  height: 30px;
  background: url("public/edit.svg") center no-repeat;
  background-size: 16px;
}
</style>