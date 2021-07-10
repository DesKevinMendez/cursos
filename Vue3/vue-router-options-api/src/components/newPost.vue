<template>
  <div>
    <div>New post</div>
    <form @submit.prevent="submit">
      <input typ="text" v-model="newPost.title" />
      <br />
      <textarea v-model="newPost.content" cols="30" rows="10"></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    submit() {
      this.$emit("createPost", {
        title: this.newPost.title,
        content: this.newPost.content,
      });
    },
  },
};
</script>

<style scoped>
</style>