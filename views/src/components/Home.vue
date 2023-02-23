<template>
  <div>
    <h1>Home</h1>
    <p>Welcome, Bro</p>
    <!-- <button @click="logout">Logout</button> -->
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
      localStorage.removeItem("author");
      this.$router.push("/login");
    },
  },
};
</script>
