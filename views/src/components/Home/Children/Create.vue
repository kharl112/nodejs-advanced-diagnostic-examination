<script>
import axios from "axios";
export default {
  name: "Create",
  data() {
    return {
      error: null,
      loading: false,
      isInUpdate: false,
      getUserLoading: false,
      form: {
        firstName: "",
        lastName: "",
        address: "",
        postCode: "",
        contactPhoneNumber: "",
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async submitForm() {
      if (this.isInUpdate) {
        const { id } = this.$route.params;
        return this.updateUser(id);
      }

      return this.createUser();
    },

    async getUser(id) {
      try {
        this.getUser = true;
        const response = await axios.get("/api/admin/users/" + id, {
          headers: { Authorization: localStorage.getItem("authorization") },
        });

        this.getUserLoading = false;
        this.form = { ...response.data };
      } catch (error) {
        this.getUserLoading = false;
        this.$router.replace("/home/manage");
      }
    },

    async createUser() {
      try {
        this.error = null;
        this.loading = true;
        await axios.post(
          "/api/admin/users/create",
          { ...this.form },
          {
            headers: { Authorization: localStorage.getItem("authorization") },
          }
        );

        this.loading = false;
        this.$router.replace("/home/manage");
      } catch (error) {
        this.loading = false;
        this.error = error.response.data.message;
      }
    },

    async updateUser(id) {
      try {
        this.error = null;
        this.loading = true;

        const { username, email, id: _id, ...newForm } = this.form;
        console.log({ username, email, _id });

        await axios.post(
          `/api/admin/users/update/${id}`,
          { ...newForm },
          {
            headers: { Authorization: localStorage.getItem("authorization") },
          }
        );

        this.loading = false;
        this.$router.replace("/home/manage");
      } catch (error) {
        this.loading = false;
        this.error = error.response.data.message;
      }
    },
  },

  mounted() {
    this.isInUpdate = this.$router.history.current.path.includes("update");
    const { id } = this.$route.params;

    if (this.isInUpdate) this.getUser(id);
  },
};
</script>

<template>
  <v-container>
    <v-row justify="center" align-items="center">
      <v-col cols="12" sm="10" md="6" class="mt-5">
        <v-card class="pa-10 pt-12" outlined v-if="!getUserLoading">
          <v-col cols="12" class="px-0">
            <v-btn outlined small color="secondary" @click="back">
              <v-icon>mdi-arrow-left</v-icon>
              Back
            </v-btn>
          </v-col>
          <v-col cols="12" class="px-0 py-3">
            <h4 class="text-h4">{{ isInUpdate ? "Update" : "Create" }} User</h4>
          </v-col>
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.firstName"
                  label="First name"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lastName"
                  label="Last name"
                  outlined
                  hide-details
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.address"
                  label="Address"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.postCode"
                  label="Postcode"
                  type="number"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.contactPhoneNumber"
                  label="Contact Phone Number"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!isInUpdate">
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" v-if="!isInUpdate">
                <v-text-field
                  v-model="form.username"
                  label="Username"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" :sm="!isInUpdate ? '6' : '12'">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  type="password"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="error">
              <v-col cols="12" sm="10" md="10" class="py-0">
                <p class="caption error--text">{{ error }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="primary"
                  elevation="0"
                  :loading="loading"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-skeleton-loader
          type="list-item-three-line, article, article, actions"
          v-else
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
