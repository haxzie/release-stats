<template>
  <i :class="['material-icons', `md-${size}`]" :style="{ fontSize: `${size}px`}"><slot/></i>
</template>

<script>
export default {
    props: {
        size: {
            type: [String, Number],
            default: "18"
        }
    }
}
</script>

<style>

</style>