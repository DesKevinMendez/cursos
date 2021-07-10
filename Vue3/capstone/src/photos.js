export const photos = {
  namespaced: true,
  state() {
    return {
      all: [],
      cache: {}
    };
  },
  mutations: {
    setPhotosForCurrentAlbum(state, { photos, id }) {
      state.all = photos.splice(0, 100);
      state.cache[id] = state.all;
    }
  },
  actions: {
    async getByAlbum(ctx, { id }) {
      if (ctx.state.cache[id]) {
        ctx.commit('setPhotosForCurrentAlbum', {
          photos: ctx.state.cache[id],
          id
        });
        return;
      }
      const res = await window.fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      );
      const json = await res.json();
      ctx.commit('setPhotosForCurrentAlbum', { photos: json, id });
    }
  },
  getters: {}
};
