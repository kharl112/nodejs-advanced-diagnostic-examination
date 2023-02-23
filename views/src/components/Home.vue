<template>
  <div>
    <h1>Home</h1>
    <p>Welcome, {{ username }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("username");
      this.$router.push("/login");
    },
  },
};
</script>
