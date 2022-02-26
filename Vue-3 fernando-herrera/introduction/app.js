const app = Vue.createApp({
  setup: ()=> {
    value = Vue.ref('data')
    vFor = Vue.reactive([
      {id: 1, name: 'Kevin'},
      {id: 2, name: 'Ezequiel'}
    ])
    capitalize = ()=> {
      value.value = value.value.toUpperCase()
    }
    change = (e) => {
      value.value = 'new change'
      capitalize();
    }
    return { value, change, vFor }
  }
})

app.mount('#app')