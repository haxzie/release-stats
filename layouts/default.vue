<template>
  <div class="parent">
    <div class="contents">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}

html,
body,
#__nuxt,
#__layout{
  min-width: 100%;
  min-height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}



.parent {
  width: 100%;
  min-height: 100%;
  @apply bg-lightBlue;
  display: flex;
  flex-direction: row;

  .contents {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.wf-loading,
.wf-materialicons-n4-inactive {
  .material-icons {
    display: none;
  }
}
</style>
