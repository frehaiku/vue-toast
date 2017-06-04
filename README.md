# Vue-Toast

> A Vue component for showing friendly operation tip to user.  
[vue2+ version is working](https://github.com/frehaiku/vue-toast/tree/vue2)

## Install

Using `npm` to install `vue-cushy-toast`

```bash
npm install vue-cushy-toast
```

## Usage

In your `.vue` file

```html
<template>
  <vue-toast v-ref:toast message="tip..."></vue-toast>
</template>

<script>
    import VueToast from 'vue-cushy-toast'
    export default {
        components: {
          VueToast
        },
        ready () {
              this.$refs.toast.showMessage()
              // your also can manually inject message param
              // this.$refs.toast.showMessage('good job')
            },
      }
</script>
```

## Params

| param | type | description | default | optional | required
| --- | --- | --- | --- | --- | ---
| message | String | toast content | '' | \w | No
| position | String | toast location | 'bottom middle' | 'bottom middle', 'top middle' | No
| sustain | Number | toast sustain time (ms) | 2000 | \d | No
| animate | String | toast show animation | scale | 'opacity', 'scale' | No
| options | Object | callback with toast | {} | Object | No

the `options` params contains two key-value

| param | type | description
| --- | --- | ---
| onHide | Function | before show callback
| onShow | Function | after show callback

## Methods

- showMessage(String msg); manually set toast's content

## Lisence

MIT
