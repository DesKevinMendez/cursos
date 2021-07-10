<template>
  <div>
    <button @click="click">Like</button>
    {{ post.likes }}
    <hashtag
      v-for="hashtag in post.hashtags"
      :hashtag="hashtag"
      :key="hashtag"
    />
  </div>
</template>

<script>
import { store } from '../composables/store';
import Hashtag from "./HashTag.vue";

export default {
  components: {
    Hashtag,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const click = ()=> {
      store.incrementLike(props.post)
    }

    return {click}
  }
};
</script>

<style scoped>
</style>