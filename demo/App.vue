<template>
<div id="app">
    <vue-dividing-rule v-model="value"></vue-dividing-rule>
    {{ value }}
</div>
</template>

<script>
import VueDividingRule from '../src/index.vue'
export default {
    name: 'app',
    data() {
        return {
            value: 20
        }
    },
    components: {
        VueDividingRule
    }
}
</script>

<style>
html,body{
    padding: 0;
    margin: 0;
}
#app {
    height: 100px;
    width: 100%;
    background-color: #fff;
}
</style>
