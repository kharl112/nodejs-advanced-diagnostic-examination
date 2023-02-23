<script>
import axios from "axios";
export default {
  name: "Create",
  data() {
    return {
      error: null,
      loading: false,
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
    async submitForm() {
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
        this.$router.replace("manage");
      } catch (error) {
        this.loading = false;
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

<template>
  <v-container>
    <v-row justify="center" align-items="center">
      <v-col cols="12" sm="10" md="6" class="mt-5">
        <v-card class="pa-10 pt-12" outlined>
          <v-col cols="12" class="px-0 py-3">
            <h4 class="text-h4">Create User</h4>
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
            <v-row>
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.username"
                  label="Username"
                  required
                  outlined
                  hide-details
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
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
      </v-col>
    </v-row>
  </v-container>
</template>
