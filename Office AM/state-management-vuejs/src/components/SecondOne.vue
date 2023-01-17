<template>
    <div>
        <h1>Second Component</h1>
        <button type="button" @click="increamentCount">{{$router.state.count}}</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>