<template>
  <div class="movie-filter">
    <label>{{ labels.forms.labels.filters }}</label>
    <YearFilter
      :options="uniqueYears"
      :selectedValue="releaseYear"
      :placeholder="placeholder"
      @onChange="applyFilter"
    ></YearFilter>
    <button @click="resetFilter">{{ labels.buttons.reset }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import type { Movie } from '../types/movies';
import YearFilter from '../components/common/select.vue';
import labels from '../constants/labels';

const store = useStore();

interface yearsOptions {
  key: string;
  value: string;
}

const releaseYear = ref<string>('');
let uniqueYears = ref<yearsOptions[]>([]);
const placeholder = 'Select Year:';

const emit = defineEmits<{
  (
    event: 'filter',
    payload: { releaseYear: string | null /* add more filters... */ }
  ): void;
  (event: 'reset'): void;
}>();

onBeforeMount(() => {
  const movies = store.getters.getMovies;
  const years = getUniqueYears(movies);

  uniqueYears.value = years.map((year) => ({ key: year, value: year }));
});

const applyFilter = (selectedOption: string) => {
  releaseYear.value = selectedOption;
  emit('filter', {
    releaseYear: selectedOption,
  });
};

const resetFilter = () => {
  releaseYear.value = '';
  emit('filter', {
    releaseYear: '',
  });
};

const getUniqueYears = (movies: Movie[]): string[] => {
  const uniqueYears = new Set<string>();

  movies.forEach((movie) => {
    if (movie.Year) {
      const years = movie.Year.split(',');
      years.forEach((year) => {
        const trimmedYear = year.trim();
        if (trimmedYear) {
          uniqueYears.add(trimmedYear);
        }
      });
    }
  });

  return Array.from(uniqueYears).sort((a, b) => parseInt(b) - parseInt(a));
};
</script>

<style scoped>
.movie-filter {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 29%;

  @media (max-width: 1024px) {
    width: 70%;
  }

  select {
    margin: 0;
  }
}
</style>
