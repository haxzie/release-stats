<template>
  <div
    class="search-panel flex flex-col bg-white rounded overflow-hidden shadow-sm"
  >
    <form
      class="search-input flex flex-row items-center pl-3 pr-2 py-1"
      @submit.prevent="fetchRepository"
    >
      <input
        type="text"
        class="input-search text-lg md:text-2xl"
        placeholder="username/repository"
        v-model="query"
      />
      <spinner v-if="isFetching" />
      <div
        class="search-button flex items-center justify-center cursor-pointer rounded text-blue-400 hover:bg-blue-100 hover:text-blue-500"
        @click="fetchRepository"
        v-else
      >
        <m-icon size="24" class="text-secondaryLight">search</m-icon>
      </div>
    </form>
    <div
      v-if="isError"
      class="repository-stats flex flex-row p-2 bg-blueGray-50"
    >
      <p class="ml-2 text-sm text-red-400">Unable to find this repository</p>
    </div>
    <div
      v-if="repository && !isError"
      class="repository-stats flex flex-row p-2 bg-blueGray-50"
    >
      <span class="flex flex-row items-center mr-3 text-secondaryLight"
        ><m-icon size="18" class="mr-1 text-yellow-500">star</m-icon
        >{{ formatNumber(repository.stargazers_count) }}</span
      >
      <span class="flex flex-row items-center mr-3 text-secondaryLight"
        ><m-icon size="18" class="mr-1 text-blue-500">visibility</m-icon
        >{{ formatNumber(repository.subscribers_count) }}</span
      >
      <span class="flex flex-row items-center mr-3 text-secondaryLight"
        ><m-icon size="18" class="mr-1 text-green-500">call_split</m-icon
        >{{ formatNumber(repository.forks_count) }}</span
      >
    </div>
  </div>
</template>

<script>
import mIcon from './m-icon.vue'
import Spinner from './Spinner'

export default {
  components: { mIcon, Spinner },
  props: {
    value: String,
    isFetching: Boolean,
    repository: Object,
    isError: Boolean,
  },
  computed: {
    query: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    fetchRepository() {
      this.$emit('fetch')
    }
  },
}
</script>

<style lang="scss" scoped>
.search-panel {
  width: 100%;

  .input-search {
    flex: 1;
    background: transparent;
    border: 0;
    @apply p-2;
    @apply outline-none;
    @apply text-secondary;
  }

  .search-button {
    width: 40px;
    height: 40px;
  }
}
</style>
