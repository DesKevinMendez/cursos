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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { usePosts } from "./../composable/usePosts";

export default {
  setup() {
    const postStore = usePosts();
    const router = useRouter();

    const newPost = reactive({
      title: "",
      content: "",
    });

    const submit = () => {
      const id = postStore.posts.value.length + 1;
      postStore.addPost({
        id,
        title: newPost.title,
        content: newPost.content,
      });
      router.push({
        path: `${id}`,
      });
    };

    return { newPost, submit };
  },
};
</script>

<style scoped>
</style>