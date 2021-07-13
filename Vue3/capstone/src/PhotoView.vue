<template>
  <div>
    <img v-for="photo in photos" :key="photo.id" :src="photo.thumbnailUrl" />
  </div>
</template>
<script>
import { computed, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRoute();

    watchEffect(() => {
      const id = router.params.id;
      if (!id) return;
      store.dispatch("photos/getByAlbum", { id });
    });

    const photos = computed(() => store.state.photos["all"]);
    return { photos };
  },
};
</script>
