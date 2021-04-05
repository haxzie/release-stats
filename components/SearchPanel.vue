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
        v-model="searchQuery"
      />
      <div
        class="search-button flex items-center justify-center cursor-pointer rounded text-blue-400 hover:bg-blue-100 hover:text-blue-500"
        @click="fetchRepository"
      >
        <m-icon size="24" class="text-secondaryLight">search</m-icon>
      </div>
    </form>
    <div
      v-if="repository"
      class="repository-stats flex flex-row p-2 bg-blueGray-50"
    >
      <span class="flex flex-row items-center mr-3 text-secondaryLight"
        ><m-icon size="18" class="mr-1 text-yellow-500">star</m-icon
        >{{ formatNumber(repository.stargazers_count) }}</span
      >
      <span class="flex flex-row items-center mr-3 text-secondaryLight"
        ><m-icon size="18" class="mr-1 text-blue-500">visibility</m-icon
        >{{ formatNumber(repository.watchers_count) }}</span
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
export default {
  components: { mIcon },
  props: {},
  data() {
    return {
      searchQuery: '',
      isFetching: false,
      repository: null,
    }
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async fetchReleases() {
      const { status, data } = await this.$axios.get(
        `/repos/${this.searchQuery}/releases`
      )
      if (status === 200) {
        this.$emit('loaded', data)
      }
    },
    async fetchRepository() {
      if (
        !(
          this.searchQuery &&
          this.searchQuery.split('/').length === 2 &&
          !this.isFetching
        )
      )
        return
      this.$router.replace({
        path: `/?repo=${this.searchQuery}`,
      })
      this.isFetching = true
      try {
        const { status, data } = await this.$axios.get(
          `/repos/${this.searchQuery}`
        )
        if (status === 200 && data) {
          this.repository = data
          await this.fetchReleases()
        }
      } catch (error) {}
      this.isFetching = false
    },
  },
  mounted() {
    const { repo } = this.$route.query
    if (repo) {
      this.searchQuery = repo
      this.fetchRepository()
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
