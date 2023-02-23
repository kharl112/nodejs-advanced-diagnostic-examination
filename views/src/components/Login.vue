<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const response = await axios.post("/api/admin/login", {
          ...this.form,
        });

        this.loading = false;
        localStorage.setItem("authorization", response.data.token);
        this.$router.replace("/home");
      } catch (error) {
        this.loading = false;
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card outlined class="pa-5 pt-16">
          <h4 class="text-h4 text-center mb-5">Admin - Login</h4>
          <v-form ref="form" @submit.prevent="login">
            <v-row justify="start">
              <v-col cols="12">
                <v-text-field
                  v-model="form.username"
                  label="Username"
                  placeholder="joime1243"
                  outlined
                  prepend-inner-icon="mdi-account"
                  hide-details
                  tabindex="1"
                  autofocus
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  tabindex="2"
                  hide-details
                  type="password"
                />
              </v-col>
              <v-col cols="12" sm="10" class="mt-0 pt-0">
                <span
                  class="error--text caption font-weight-bold text-capitalize"
                >
                  {{ error }}
                </span>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-btn
                  type="submit"
                  block
                  elevation="0"
                  large
                  tabindex="3"
                  color="primary"
                  :loading="loading"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
