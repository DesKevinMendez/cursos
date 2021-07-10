import { createStore } from 'vuex';
import { testPost } from '../../microblog/src/composables/testPost';

const delay = () => new Promise((res) => setTimeout(res, 1000));

const posts = {
  namespaced: true,
  state() {
    return {
      postId: null,
      all: []
    };
  },
  mutations: {
    setPostId(state, postId) {
      state.postId = postId;
    },
    setPosts(state, all) {
      state.all = all;
    }
  },
  actions: {
    async fetchPost(ctx) {
      await delay();

      ctx.commit('setPosts', testPost);
    }
  },
  getters: {
    currentPost(state) {
      return state.all.find((post) => {
        return post.id == state.postId;
      });
    }
  }
};

export const store = createStore({
  modules: {
    posts
  }
});
