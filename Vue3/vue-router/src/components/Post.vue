<template>
  <div>
    <h4>{{ post.title }}</h4>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePosts } from "./../composable/usePosts";

export default {
  setup() {
    const route = useRoute();
    const postStore = usePosts();

    const post = computed(() =>
      postStore.posts.value.find((x) => x.id === parseInt(route.params.id))
    );
    return { post };
  },
};
</script>

<style scoped>
</style>