<template>
  <form role="search" @submit.prevent="search" class="search-form">
    <input
      type="search"
      name="search"
      :placeholder="placeholder"
      v-model.trim="query"
      aria-label="Search"
      :aria-invalid="!!error || undefined"
      @input="error = ''"
    />
    <input type="submit" value="Search" />
  </form>
  <div class="invalid-search-input">
    <small id="invalid-helper" v-if="error">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    errorMessage?: string;
    placeholder?: string;
    searchButton?: string;
  }>(),
  {
    errorMessage: "Search input field can't be empty or less than 3 characters",
    placeholder: 'Type your search input here',
    searchButton: 'Search',
  }
);

const query = ref('');
const error = ref('');

const emit = defineEmits<{
  search: [searchQuery: string];
}>();

const search = () => {
  if (query.value?.length > 2) {
    emit('search', query.value);
    query.value = '';
  } else {
    error.value = props.errorMessage;
  }
};
</script>

<style scoped>
.search-form {
  margin-bottom: 0;

  /* input[type='submit'] {
    background: linear-gradient(274.65deg, #e72687 -2.07%, #e7352e 63.67%);
  } */
}

.invalid-search-input {
  color: rgb(200.25, 79.25, 72.25);
  padding: 1rem 0;
  /* height: 60px; */

  small {
    background: #ffeeee;
    padding: 0.5rem;
    margin: 0.8rem 1rem;

    @media (max-width: 787px) {
      font-size: 12px;
      margin: 0;
    }
  }
}
</style>
