import { createWebHistory, createRouter } from 'vue-router';
import Posts from './components/Posts.vue';
import Post from './components/Post.vue';
import newPost from './components/newPost.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/posts',
      component: Posts,
      children: [
        {
          path: 'new',
          component: newPost
        },
        {
          path: ':id',
          component: Post
        }
      ]
    }
  ]
});

export { router };
