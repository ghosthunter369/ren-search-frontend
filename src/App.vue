<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  color: #2c3e50;
  padding: 20px;
  max-width: 1024px;
  margin: 0 auto; /* 居中对齐 */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts"></script>
