<script>
import axios from "axios";
export default {
  name: "Manage",
  data() {
    return {
      users: [],
      table_loading: false,
      selected: [],
      error: null,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Address", value: "address" },
        { text: "Phone Number", value: "contactPhoneNumber" },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authorization");
      this.$router.push("/login");
    },
    async getUsers() {
      try {
        this.table_loading = true;
        const response = await axios.get("/api/admin/users", {
          headers: { Authorization: localStorage.getItem("authorization") },
        });

        this.table_loading = false;
        this.users = response.data;
      } catch (error) {
        this.table_loading = false;
      }
    },

    async removeSelected() {
      try {
        await axios.post(
          "/api/admin/users/remove",
          { ids: this.selected.map((item) => item.id) },
          {
            headers: { Authorization: localStorage.getItem("authorization") },
          }
        );

        this.selected = [];
        this.getUsers();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },

    create() {
      this.$router.push("create");
    },
  },
  async mounted() {
    this.getUsers();
  },
};
</script>

<template>
  <v-container fluid class="container">
    <v-row justify="center" align-items="center">
      <v-col cols="12" sm="10" md="10">
        <v-row justify="space-between" align-items="center" class="py-5 px-3">
          <h4 class="text-h4">Manage Users</h4>
          <v-btn-toggle>
            <v-btn elevation="0" color="primary" small @click="create">
              <v-icon color="white">mdi-plus</v-icon>
              Create New
            </v-btn>
            <v-btn
              color="error"
              elevation="0"
              small
              :disabled="!selected.length"
              title="remove selected"
              @click="removeSelected"
            >
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
      <v-col cols="12" sm="10" md="10" v-if="!table_loading || users.length">
        <v-data-table
          item-key="id"
          v-model="selected"
          show-select
          :headers="headers"
          :items="users"
          :items-per-page="5"
        ></v-data-table>
      </v-col>
      <v-col cols="12" sm="10" md="10" v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="10" md="10" class="py-0" v-if="error">
        <p class="caption error--text text-center">{{ error }}</p>
      </v-col>
      <v-col cols="12" sm="10" md="10">
        <v-divider />
      </v-col>
      <v-col cols="12" sm="10" md="10">
        <v-btn color="error" elevation="0" @click="logout">
          <v-icon>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.container {
  height: 100vh;
}
</style>
