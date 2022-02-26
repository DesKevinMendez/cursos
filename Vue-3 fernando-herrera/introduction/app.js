const app = Vue.createApp({
  setup: () => {
    value = Vue.ref('data');
    newValue = Vue.ref('');
    vFor = Vue.reactive([
      { id: 1, name: 'Kevin' },
      { id: 2, name: 'Ezequiel' }
    ]);
    capitalize = () => {
      value.value = value.value.toUpperCase();
    };
    changeValue = (e) => {
      const newVFor = {
        id: vFor.length + 1,
        name: e.target.value
      };
      vFor.unshift(newVFor);
      newValue.value = ''
    };
    change = (e) => {
      value.value = 'new change';
      capitalize();
    };
    return { value, change, vFor, changeValue, newValue };
  }
});

app.mount('#app');
