const app = Vue.createApp({
  // data: ()=> ({
  //   value: 'Desde app.js'
  // }),
  setup: ()=> {
    value = Vue.ref('data')

    capitalize = ()=> {
      value.value = value.value.toUpperCase()
    }
    change = (e) => {
      value.value = 'new change'
      capitalize();
    }
    return { value, change }
  }
})

app.mount('#app')