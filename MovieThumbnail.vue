<template>
  <li class="movie-thumbnail" @click="selectedMovie">
    <img v-if="movie.Poster != 'N/A'" :src="movie.Poster" :alt="movie.Title" />
    <h3>{{ movie.Title }}</h3>
    <p>{{ movie.Year }}</p>
  </li>
</template>

<script lang="ts" setup>
import type { Movie } from '../types/movies';
import { EVENT_NAMES } from '../constants/events';

const props = defineProps<{
  movie: Movie;
}>();

const emit = defineEmits<{
  (event: typeof EVENT_NAMES.MOVIE_THUMBNAIL.SELECT, id: string): void;
}>();

const selectedMovie = () => {
  emit(EVENT_NAMES.MOVIE_THUMBNAIL.SELECT, props.movie.imdbID);
};
</script>

<style scoped>
.movie-thumbnail {
  border-radius: 0.4rem;
  box-shadow: 1px 1px 7px 5px #e7e7e7;
  background: #fbfcfc;
  cursor: pointer;
  flex: 0 0 calc((100% - 4rem) / 5);
  padding: 1rem;
  text-align: center;

  @media (max-width: 1024px) {
    flex: 0 0 calc((100% - 2rem) / 3);
  }

  &:hover {
    box-shadow: 1px 1px 7px 5px #b2b2b2;
  }

  h3 {
    @media (max-width: 787px) {
      font-size: 15px;
    }
  }

  img {
    width: 100%;
    height: auto;
    max-height: 440px;
    object-fit: contain;

    @media (max-width: 787px) {
      max-height: 180px;
    }

    @media (min-width: 788px) and (max-width: 1400px) {
      max-height: 300px;
    }
  }
}

li {
  list-style-type: none;
  height: 580px;

  @media (max-width: 787px) {
    height: 300px;
  }

  @media (min-width: 788px) and (max-width: 1600px) {
    height: 440px;
  }

  h3 {
    font-size: 1rem;
    margin: 0.5rem 0 0.2rem;
  }

  p {
    color: #ec2c50;
  }
}
</style>
