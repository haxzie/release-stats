<template>
  <div class="page-container h-full mx-auto py-4 sm:px-2">
    <Header/>
    <SearchPanel
      class="mt-2"
      v-model="searchQuery"
      :isFetching="isFetching"
      :isError="isError"
      :repository="repository"
      @fetch="fetchRepository"
    />
    <template v-if="repository && releases && releases.length > 0">
      <DownloadStats :releases="releases" class="mt-2" />
      <ReleaseStats :releases="releases" class="mt-2" />
    </template>
    <template v-else-if="!isFetching">
      <HistoryPanel @load="loadRepository"/>
    </template>
    <Footer/>
  </div>
</template>

<script>
import SearchPanel from '~/components/SearchPanel'
import DownloadStats from '~/components/DownloadStats'
import ReleaseStats from '~/components/ReleaseStats'
import HistoryPanel from '~/components/HistoryPanel'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

export default {
  layout: 'default',
  components: {
    SearchPanel,
    DownloadStats,
    ReleaseStats,
    HistoryPanel,
    Footer,
    Header
  },
  data() {
    return {
      releases: null,
      repository: null,
      isFetching: false,
      searchQuery: '',
      isError: false,
      repository: null,
    }
  },
  computed: {},
  methods: {
    loadRepository(query) {
      this.searchQuery = query;
      this.fetchRepository();
    },
    setRpository(repository) {
      this.repository = repository
      let newHistory = [repository]
      try {
        const history = JSON.parse(localStorage.getItem('history')) || []
        newHistory = [
          repository,
          ...history.filter((item) => item.id !== repository.id),
        ]
      } catch (error) {
        //unable to load the history
      }
      localStorage.setItem('history', JSON.stringify(newHistory.slice(0, 10)))
    },
    async fetchReleases() {
      const { status, data } = await this.$axios.get(
        `/repos/${this.searchQuery}/releases`
      )
      if (status === 200 && data) {
        this.releases = data;
      } else {
        this.releases = null;
      }
    },
    async fetchRepository() {
      if (!this.searchQuery) {
        this.releases = null;
        this.repository = null;
        this.$router.push("/")
      }
      if (
        !(
          this.searchQuery &&
          this.searchQuery.split('/').length === 2 &&
          !this.isFetching
        )
      )
        return
      this.$router.push(`?repo=${this.searchQuery}`)
      this.isFetching = true
      this.isError = false
      try {
        const { status, data } = await this.$axios.get(
          `/repos/${this.searchQuery}`
        )
        if (status === 200 && data) {
          this.setRpository(data)
          await this.fetchReleases()
        } else {
          this.repository = null
        }
      } catch (error) {
        // console.error(error)
        this.isError = true
        this.repository = null
      }
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
.page-container {
  width: 95%;
  max-width: 600px;
}
</style>
