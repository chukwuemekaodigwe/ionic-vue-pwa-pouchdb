<template>
  <div class="nav-bar__buttons">
    <template v-if="!isAuthenticated">
      <SignupButton />
      <LoginButton />
    </template>
    <template v-if="isAuthenticated">
      <LogoutButton />
    </template>
  </div>
</template>

<script lang="ts" setup>
import LoginButton from "/src/views/auth/buttons/login-button.vue";
import LogoutButton from "/src/views/auth/buttons/logout-button.vue";
import SignupButton from "/src/views/auth/buttons/signup-button.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { isAuthenticated } = useAuth0();
</script>