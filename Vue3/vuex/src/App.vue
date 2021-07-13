<template>
  <div>
    <button @click="click(post)" v-for="post in posts" :key="post.id">
      {{ post.title }}
    </button>
    <div v-if="currentPost">
      <h2>
        {{ currentPost.title }}
      </h2>
      <h4>
        {{ currentPost.content }}
      </h4>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const click = (post) => {
      store.commit("posts/setPostId", post.id);
    };

    const fetchData = () => {
      store.dispatch("posts/fetchPost", "POST");
    };

    onMounted(() => {
      fetchData();
    });

    return {
      store,
      posts: computed(() => store.state.posts.all),
      click,
      fetchData,
      postId: computed(() => store.state.postId),
      currentPost: computed(()=> store.getters['posts/currentPost']),
    };
  },
};
</script>
