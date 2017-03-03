<template>
  <div id="app">
    <h1>
      Vue-Toast
    </h1>
    <p>
      A Vue component show tip to user(just like Android system's toast).
    <p>
    <p>
      It will automatically disappear in some seconds :)
    </p>
    <p>
      <button @click="showAbove">Click it be above</button>
      <vue-toast v-ref:tabove
                 message="I am here"
                 position="top middle"
                 animate="scale"></vue-toast>
    </p>
    <p>
      <button @click="showBelow">Click it be below</button>
      <vue-toast v-ref:tbelow
                 message="I am here"
                 position="bottom middle"
                 animate="opacity"></vue-toast>
    </p>
    <p>
      <a href="https://github.com/frehaiku/vue-toast" target="_blank">Fork me on Github!</a>
    </p>
  </div>
</template>

<script>
  import VueToast from './components/Toast/index'

  export default {
    components: {
      VueToast
    },
    methods: {
      showBelow () {
        this.$refs.tbelow.showMessage()
      },
      showAbove () {
        this.$refs.tabove.showMessage()
      }

    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: rgba(66, 185, 131, 0.74);
  }

  #app {
    color: #fff;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app h1 {
    font-size: 40px;
  }

  #app p{
    font-size: 20px;
  }
  #app a {
    font-size: 18px;
    color: #fff;
    text-decoration: underline;
  }

  button {
    width: 100px;
    height: 50px;
    color: #ffffff;
    background: #8991dc;
    font-size: 17px;
    outline: none;
    border: none;
    padding: 5px;
    border-radius: 5px;
  }

  button:active {
    background-color: #7c82bd;
  }
</style>
