<template>
<div id="app">
  <div id="nav">
    <router-link to="/" v-if="!isLoggedIn">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login" v-if="isLoggedIn">Logout</router-link>
    <router-link to="/login" v-else>Login</router-link>
  </div>
  <router-view @login-event="setLoginFlag"/>
</div>
</template>
<script lang="ts" src="./App.ts"></script>
<style scoped src="./app.css"></style>

