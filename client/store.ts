import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    selectedGenre: null,
    genres: [],
    freets: [], // All freets created in the app
    groups: [],
    groupFilter: null,
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateGenre(state, genre) {
      /**
       * Update the stored freets genre to the specified one.
       * @param genre - Genre to filter freets by
       */
      state.selectedGenre = genre;
    },
    updateGenres(state, genres) {
      /**
       * Update the stored freets genres
       * @param genres - Genre list
       */
      state.genres = genres;
    },
    updateGroups(state, groups) {
      /**
       * Update the stored groups to the provided groups.
       * @param groups - Groups to store
       */
      state.groups = groups;
    },
    updateGroupFilter(state, groupFilter) {
      /**
       * Update the stored groups to the provided groups.
       * @param groupFilter - Groups to store
       */
      state.groupFilter = groupFilter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.selectedGenre ? `/api/feed?genre=${state.selectedGenre}` : 'api/feed';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshGroups(state) {
      /**
       * Request the server for the currently available groups.
       */
      const url = state.groupFilter ? `/api/groups?name=${state.groupFilter}` : 'api/groups';
      const res = await fetch(url).then(async r => r.json());
      state.groups = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
