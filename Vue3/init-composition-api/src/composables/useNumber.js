import { ref, reactive, computed, watchEffect, watch } from 'vue';

export function useNumbers() {
  const a = ref(0);
  const b = ref(0);
  const history = ref([]);

  watch([a, b], ([newA, newB], [oldA, oldB]) => {
    if (newA !== oldA) {
      history.value.push(`${oldA} -> ${newA}`);
    }
    if (newB !== oldB) {
      history.value.push(`${oldB} -> ${newB}`);
    }
  });
  const total = computed(() => a.value + b.value);

  return { a, b, history, total };
}
