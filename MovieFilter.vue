<template>
  <div class="movie-filter">
    <label>{{ LABELS.FORMS.LABELS.FILTERS }}</label>
    <YearFilter
      :options="uniqueYears"
      :selectedValue="releaseYear"
      :placeholder="placeholder"
      @onChange="applyFilter"
    ></YearFilter>
    <button @click="resetFilter">{{ LABELS.BUTTONS.RESET }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import YearFilter from '../components/common/select.vue';
import LABELS from '../constants/labels';
import { getUniqueValues } from '../utils/filter';
import { EVENT_NAMES } from '../constants/events';

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
    event: typeof EVENT_NAMES.MOVIES.FILTER,
    payload: {
      releaseYear: string | null;
      /* add more filters... */
    }
  ): void;
  (event: typeof EVENT_NAMES.MOVIES.RESET): void;
}>();

onBeforeMount(() => {
  const movies = store.getters.getMovies;
  uniqueYears.value = getUniqueValues(movies, 'Year');
});

const applyFilter = (selectedOption: string) => {
  releaseYear.value = selectedOption;
  emit(EVENT_NAMES.MOVIES.FILTER, {
    releaseYear: selectedOption,
  });
};

const resetFilter = () => {
  releaseYear.value = '';
  emit(EVENT_NAMES.MOVIES.FILTER, {
    releaseYear: '',
  });
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
