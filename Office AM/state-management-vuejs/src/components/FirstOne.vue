<template>
    <div>
        <h2>Name : {{$store.state.name}}</h2>
        <h3>Title : {{$store.state.mainTitle}}</h3>
        <button @click="incrementCount">{{$store.state.count}}</button>
    </div>
</template>

<script>
    export default {
        name:"FirstOne",
        methods:{
            incrementCount(){
                console.log("hello");
                this.$store.commit('increment')
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>