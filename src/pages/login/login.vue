<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first pt-5">
      <font-awesome-icon icon="user" size="lg" />
    </div>
    <!-- Login Form -->
    <form class="pb-5">
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" v-model="user">
      <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" v-model="pass">
      <button type="button" class="fadeIn btn btn-primary mt-3" v-on:click="submitLogin"> Log In </button>
    </form>

  </div>
</div>  
</template>
<style scoped src="./login.css"></style>
<script lang="ts" src="./Login.ts"></script>


