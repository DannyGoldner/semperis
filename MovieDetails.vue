<template>
  <div>
    <Modal v-model="isModalOpen" @close="onClose">
      <template #header>
        <div class="modal-header">
          <span v-if="loading" aria-busy="true">
            {{ LABELS.DETAILS.LOADING }}
          </span>
          <strong v-else>{{ movieData?.Title || 'Movie Details' }}</strong>
        </div>
      </template>

      <section class="modal-content">
        <div class="modal-body flex">
          <div class="img-info">
            <img
              v-if="movieData && movieData.Poster !== 'N/A'"
              :src="movieData.Poster"
              :alt="movieData.Title"
            />
            <div v-if="movieData?.Ratings?.length" class="rating">
              <h4>{{ LABELS.DETAILS.RATING }}</h4>
              <ul>
                <li v-for="(rating, id) in movieData.Ratings" :key="id">
                  <strong>{{ rating.Source }}:</strong> {{ rating.Value }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="movieEntries.length" class="movie-details">
            <div v-for="([key, value], index) in movieEntries" :key="index">
              <p>
                <strong>{{ key }}:</strong> {{ value }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import Modal from '../components/common/modal.vue';
import type { MovieDetails } from '../types/movies';
import LABELS from '../constants/labels';
import { EVENT_NAMES } from '../constants/events';

const store = useStore();

const props = defineProps<{
  open: boolean;
  id: string;
}>();

const emit = defineEmits<{
  (e: typeof EVENT_NAMES.MOVIE_DETAILS.CLOSE): void;
}>();

const isModalOpen = ref(false);
const loading = ref(false);
const movieData = ref<MovieDetails | null>(null);

const excludedKeys = [
  'Title',
  'Ratings',
  'Type',
  'Response',
  'Rated',
  'Metascore',
  'Poster',
];

const movieEntries = computed(() => {
  if (!movieData.value) return [];
  return Object.entries(movieData.value).filter(
    ([key, value]) => value !== 'N/A' && !excludedKeys.includes(key)
  );
});

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      openModal(props.id);
    } else {
      isModalOpen.value = false;
    }
  }
);

const openModal = async (id: string) => {
  loading.value = true;
  try {
    await store.dispatch('fetchMovieDetails', id);
    const selected = store.getters.getSelectedMovie;
    if (selected) {
      movieData.value = selected;
      isModalOpen.value = true;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
  } finally {
    loading.value = false;
  }
};

const onClose = () => {
  isModalOpen.value = false;
  emit(EVENT_NAMES.MOVIE_DETAILS.CLOSE);
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.modal-body {
  .flex {
    align-items: flex-start;
  }

  .img-info {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    align-self: flex-start;

    @media (max-width: 1024px) {
      flex: 1;
    }
  }

  .movie-details {
    flex: 3;
    margin: 0.2rem 0;

    p {
      margin: 0 0 0.3rem;

      @media (max-width: 787px) {
        font-size: 14px;
      }
    }
  }

  .rating {
    background: #eee;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
}

.modal-header {
  strong {
    font-size: 1.8rem;

    @media (max-width: 787px) {
      font-size: 20px;
    }
  }
}

header {
  padding: 0 1.5rem;
}
</style>
