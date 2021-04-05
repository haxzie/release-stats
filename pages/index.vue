<template>
  <div class="page-container h-full mx-auto py-4 sm:px-2">
    <SearchPanel class="mt-4" @loaded="setReleases" />
    <DownloadStats v-if="releases && releases.length > 0" :releases="releases" class="mt-2" />
    <ReleaseStats v-if="releases && releases.length > 0" :releases="releases" class="mt-2" />
  </div>
</template>

<script>
import SearchPanel from '~/components/SearchPanel'
import DownloadStats from '~/components/DownloadStats'
import ReleaseStats from '~/components/ReleaseStats'
export default {
  layout: 'default',
  components: {
    SearchPanel,
    DownloadStats,
    ReleaseStats,
  },
  data() {
    return {
      releases: null,
    }
  },
  computed: {},
  methods: {
    setReleases(releases) {
      this.releases = releases
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 95%;
  max-width: 600px;
}
</style>
