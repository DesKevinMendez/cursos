<template>
  <div>
    <layout>
      <template v-slot:header> Header </template>
      <template v-slot:sidebar>
        <album v-for="album in albums" :key="album.id" :album="album" />
      </template>
      <template v-slot:content>
        <router-view></router-view>
      </template>
    </layout>
  </div>
</template>

<script>
import Layout from "./Layout.vue";
import Album from "./components/album.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components: { Layout, Album },
  setup() {
    const store = useStore();

    const albums = computed(() => store.state.albums["all"]);
    const photos = computed(() => store.state.photos["all"]);
    onMounted(() => {
      store.dispatch("albums/fetch");
    });
    return { albums, photos };
  },
};
</script>

<style>
* {
  padding: 0;
  box-sizing: border-box;
}
</style>
