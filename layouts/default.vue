<template>
  <div class="parent bg-blueGray-100">
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
  height: 100%;
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
  display: flex;
  flex-direction: column;

  .contents {
    display: flex;
    flex: 1;
    height: 100%;
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
