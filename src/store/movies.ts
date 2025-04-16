import { createStore } from 'vuex';
import type { Movie, MovieDetails } from '../types/movies';
import { fetchJson, buildSearchUrl, buildDetailsUrl } from '../utils/api';

interface MoviesState {
  displayMovies: Movie[];
  allMovies: Movie[];
  selectedMovie: MovieDetails | null;
  searchQuery: string;
}

const store = createStore<MoviesState>({
  state: {
    displayMovies: [],
    allMovies: [],
    selectedMovie: null,
    searchQuery: '',
  },

  mutations: {
    setDisplayMovies(state, movies: Movie[]) {
      state.displayMovies = movies;
    },
    setAllMovies(state, movies: Movie[]) {
      state.allMovies = movies;
    },
    setSelectedMovie(state, movie: MovieDetails) {
      state.selectedMovie = movie;
    },
    setSearchQuery(state, query: string) {
      state.searchQuery = query;
    },
  },

  actions: {
    async fetchAllMovies({ commit }, searchQuery: string) {
      commit('setSearchQuery', searchQuery);
      try {
        const firstData = await fetchJson(buildSearchUrl(searchQuery, 1));
        if (!firstData || firstData.Response !== 'True') {
          commit('setDisplayMovies', []);
          return;
        }

        let allMovies: Movie[] = firstData.Search;
        const totalResults = parseInt(firstData.totalResults, 10);
        const totalPages = Math.ceil(totalResults / 10);

        if (totalPages > 1) {
          const pagePromises: Promise<Movie[]>[] = [];
          for (let page = 2; page <= totalPages; page++) {
            const promise = fetchJson(buildSearchUrl(searchQuery, page)).then(
              (data) => (data.Search ? data.Search : [])
            );
            pagePromises.push(promise);
          }
          const pagesResults = await Promise.all(pagePromises);
          pagesResults.forEach((results) => {
            allMovies = allMovies.concat(results);
          });
        }

        commit('setAllMovies', allMovies);
        // Example: Show only first 50 movies in displayMovies.
        commit('setDisplayMovies', allMovies.slice(0, 50));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async fetchMovieDetails({ commit }, id: string) {
      try {
        const data = await fetchJson(buildDetailsUrl(id));
        commit('setSelectedMovie', data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    fetchMoviesWithCriteria(
      { state, commit },
      criteria: { releaseYear?: string }
    ) {
      if (!criteria.releaseYear) {
        commit('setDisplayMovies', state.allMovies.slice(0, 50));
        return;
      }

      const filtered = state.allMovies.filter((movie: Movie) => {
        return movie.Year.split(/[\s\-–]+/).some(
          (year) => year === criteria.releaseYear
        );
      });
      commit('setDisplayMovies', filtered);
    },
    showMore({ commit }, displayMovies: Movie[]) {
      commit('setDisplayMovies', displayMovies);
    },
  },

  getters: {
    getMovies: (state) => state.displayMovies,
    getAllMovies: (state) => state.allMovies,
    getSelectedMovie: (state) => state.selectedMovie,
    getSearchQuery: (state) => state.searchQuery,
  },
});

export default store;
