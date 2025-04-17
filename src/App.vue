<template>
  <div class="main-wrapper">
    <div class="flex">
      <a :href="linkURL" target="_blank" rel="noopener noreferrer">
        <img width="50" height="30" :src="semperisLogo" alt="Example Image" />
      </a>
      <div>
        <h1>{{ labels.app.title }}</h1>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import semperisLogo from './assets/images/semperis-logo.png';
import labels from './constants/labels';

const linkURL = ref('https://www.semperis.com/');
</script>

<style>
main,
h1,
h6 {
  margin: 0 auto;
}

h1 {
  @media (max-width: 787px) {
    font-size: 24px;
  }
}

h2 {
  font-size: 1rem;
  color: #777;
  margin: 0;
}

ul,
li {
  padding: 0;
  list-style-type: none;
}

.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;

  button {
    background: linear-gradient(274.65deg, #e72687 -2.07%, #e7352e 63.67%);
  }
}

.main-wrapper {
  max-width: 2000px;
  margin: 2rem auto;

  > div,
  main {
    margin: 2rem;

    @media (max-width: 1024px) {
      margin: 0.5rem;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
}

.logo {
  padding-top: 0.5rem;
  padding-right: 1rem;
}

button,
input[type='submit'] {
  background: linear-gradient(274.65deg, #e72687 -2.07%, #e7352e 63.67%);
}

button:hover {
  background: linear-gradient(274.65deg, #d11c75 -2.07%, #d12328 63.67%);
}
</style>
