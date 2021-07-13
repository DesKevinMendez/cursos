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
    <router-view :posts="posts" @createPost="createPost" />
  </div>
</template>

<script>
import { testPost } from "./../../../microblog/src/composables/testPost";

export default {
  data: () => {
    return { posts: testPost };
  },
  methods: {
    createPost(newPost) {
      const id = this.posts.length + 1;
      this.posts.push({
        id,
        ...newPost,
      });
      this.$router.push({ path: `${id}` });
    },
  },
};
</script>

<style scoped>
</style>