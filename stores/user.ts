interface UserInfo {
  id: string;
  nome: string;
  cpf: string;
  username: string;
  email: string;
  grupo: string;
}

interface State {
  userList: UserInfo[];
  user: UserInfo | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      userList: [],
      user: null,
    };
  },

  actions: {
    async fetchUserList() {
      try {
        this.userList = await $fetch<UserInfo[]>(
          "http://localhost:3001/users/"
        );
      } catch {
        ("Failed to fetch data");
      }
    },
  },
});
