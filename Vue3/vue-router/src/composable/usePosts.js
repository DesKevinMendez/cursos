import { ref } from 'vue';
import { testPost } from '../../../microblog/src/composables/testPost.js';

export function usePosts() {
  const posts = ref(testPost);

  const addPost = (post) => {
    posts.value.push(post)
  }

  return { posts, addPost };
}
