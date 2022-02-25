const app = Vue.createApp({
  // data: ()=> ({
  //   value: 'Desde app.js'
  // }),
  setup: ()=> {
    value = Vue.ref('data')
    return { value }
  }
})

app.mount('#app')