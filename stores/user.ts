interface UserInfo {
  id?: string;
  nome: string;
  cpf: string;
  username: string;
  email: string;
  grupo: string;
}

interface State {
  userList: UserInfo[];
  user: UserInfo;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      userList: [],
      user: {
        nome: "",
        cpf: "",
        username: "",
        email: "",
        grupo: "",
      },
    };
  },

  actions: {
    async fetchUserList() {
      try {
        this.userList = await $fetch<UserInfo[]>(
          "http://localhost:3001/users/"
        );
      } catch {
        ("Failed to fetch user list data");
      }
    },

    async fetchUser(id: string) {
      try {
        this.user = await $fetch<UserInfo>(`http://localhost:3001/users/${id}`);
      } catch {
        ("Failed to fetch user data");
      }
    },

    async createUser() {
      try {
        this.user = await $fetch<UserInfo>("http://localhost:3001/users/", {
          method: "POST",
          body: {
            ...this.user,
          },
        });
      } catch {
        ("Failed to post user data");
      }
    },

    async updateUser() {
      try {
        this.user = await $fetch<UserInfo>(
          `http://localhost:3001/users/${this.user?.id}`,
          {
            method: "PATCH",
            body: {
              ...this.user,
            },
          }
        );
      } catch {
        ("Failed to patch user data");
      }
    },

    async deleteUser(id: string) {
      try {
      await $fetch<UserInfo>(
        `http://localhost:3001/users/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch {
      ("Failed to delete user data");
    }
    },

    resetUser() {
      this.user = {
        nome: "",
        cpf: "",
        username: "",
        email: "",
        grupo: "",
      };
    },
  },
});
