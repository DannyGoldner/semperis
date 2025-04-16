<template>
  <main>
    <MovieSearch
      @search="handleMovieSearch"
      :placeholder="searchPlaceHolder"
      :error-message="searchErrorMessage"
    />

    <span v-if="loading" aria-busy="true">{{ labels.catalog.loading }}</span>
    <div v-else>
      <div
        v-if="store.getters.getMoviesNotFound"
        class="empty-search-result"
      ></div>

      <MovieFilter v-if="movies.length" @filter="handleMovieFilter" />

      <div v-if="!movies.length && searchString.length > 2">
        {{ labels.catalog.noResults }}
      </div>
      <div v-if="movies.length" class="search-res">
        <div>
          {{ labels.catalog.Results }} <strong>{{ searchString }}</strong>
        </div>
        <div>
          {{ labels.catalog.showing }} {{ movies.length }} /
          {{ store.getters.getAllMovies.length }}
        </div>
      </div>

      <ul class="movies-list">
        <MovieThumbnail
          v-for="movie in filteredMovies"
          :key="movie.imdbID"
          :movie="movie"
          @select="handleMovieSelected"
        />
      </ul>

      {{ filterCriteria?.value }}
      <div
        class="show-more-wrapper"
        v-if="
          movies.length > 0 &&
          movies.length !== store.getters.getAllMovies.length &&
          (filterCriteria.releaseYear === null ||
            filterCriteria.releaseYear === '')
        "
      >
        <button @click="showMore">{{ labels.buttons.showMore }}</button>
      </div>

      <MovieDetails
        :open="openMovieDetails"
        :id="movieId"
        @close="handleMovieDetailsClosed"
      ></MovieDetails>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MovieSearch from './common/search.vue';
import MovieFilter from './MovieFilter.vue';
import MovieThumbnail from './MovieThumbnail.vue';
import MovieDetails from './MovieDetails.vue';
import type { Movie } from '../types/movies';
import labels from '../constants/labels';

const store = useStore();

const loading = ref(false);

const searchErrorMessage = labels.messages.searchInvalid;
const searchPlaceHolder = labels.forms.placeholder.searchMovie;

const openMovieDetails = ref<boolean>(false);
const movieId = ref<string>('');
const searchString = ref('');

const movies = computed<Movie[]>(() => store.getters.getMovies);

const filterCriteria = ref<{ releaseYear: string | null }>({
  releaseYear: '',
});

const handleMovieSearch = async (searchQuery: string) => {
  searchString.value = searchQuery;
  filterCriteria.value = { releaseYear: null };
  loading.value = true;

  try {
    await store.dispatch('fetchAllMovies', searchQuery);
  } catch (error) {
    console.error('Error during movie search:', error);
  } finally {
    loading.value = false;
  }
};

const handleMovieFilter = (criteria: { releaseYear: string | null }) => {
  filterCriteria.value.releaseYear = criteria.releaseYear;
  store.dispatch('fetchMoviesWithCriteria', filterCriteria.value);
};

const filteredMovies = computed(() => {
  return movies.value;
});

const handleMovieSelected = (id: string) => {
  movieId.value = id;
  openMovieDetails.value = true;
};

const handleMovieDetailsClosed = () => {
  openMovieDetails.value = false;
};

const showMore = (commit) => {
  const currentMovies = store.getters.getMovies;
  const all = store.getters.getAllMovies;

  let index = currentMovies.length;
  store.dispatch('showMore', all.slice(0, index + 50));
};
</script>

<style scoped>
.empty-search-result {
  font-size: 20px;
}

.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

.search-res {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #777;

  strong {
    color: #e72687;
  }
}

.show-more-wrapper {
  text-align: center;
}
</style>
