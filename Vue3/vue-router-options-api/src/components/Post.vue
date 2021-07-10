<template>
  <div>
    <h4>{{ post.title }}</h4>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: []
    },
  },
  computed: {
    post() {
      return this.posts.find((x) => x.id === parseInt(this.$route.params.id));
    },
  },
};
</script>

<style scoped>
</style>