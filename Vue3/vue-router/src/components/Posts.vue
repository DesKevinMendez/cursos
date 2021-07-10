<template>
  <div>
    <h2>Posts</h2>
    <router-link to="/posts/new">New posts</router-link>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { usePosts } from './../composable/usePosts'

export default {
  setup() {
    const postStore = usePosts();
    return { posts: postStore.posts };
  },
};
</script>

<style scoped>
</style>