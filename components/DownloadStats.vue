<template>
  <div
    class="downloads-panel flex flex-col bg-white rounded overflow-hidden shadow-sm"
  >
    <div class="header flex flex-row items-center p-2 text-secondary">
      <h4 class="flex items-center flex-grow">
        <m-icon class="mr-2">download_done</m-icon>
        Download Stats
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="latest-version flex flex-col items-start p-4">
        <div class="texts">
          <h4 class="text-secondary">Latest Version</h4>
          <span class="text-sm text-secondaryLight">{{ latestVersion }}</span>
        </div>
        <p class="value text-secondary my-2 text-3xl font-semibold flex-grow flex items-end">
          {{ formatNumber(latestVersionDownloads) }}
        </p>
      </div>
      <div class="latest-version flex flex-col items-start p-4">
        <div class="texts">
          <h4 class="text-secondary">Total Downloads</h4>
          <span class="text-sm text-secondaryLight"
            >{{ getFormattedDates }}</span
          >
        </div>
        <p class="value text-secondary my-2 text-3xl font-semibold flex-grow flex items-end">
          {{ formatNumber(totalDownloads) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import mIcon from './m-icon.vue'
import { DateTime } from "luxon"

export default {
  components: { mIcon },
  props: {
    releases: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      latestVersionDownloads: 0,
      latestVersion: '0.0.0',
      totalDownloads: 0,
      latestVersionStartTime: null,
    }
  },
  computed: {
    getFormattedDates() {
      if (this.latestVersionStartTime) {
        const startDate = DateTime.fromJSDate(new Date(this.latestVersionStartTime));
        const formattedStartDate = startDate.toFormat("dd/MM/yyyy");
        const endDate = DateTime.now();
        const formattedEndDate = endDate.toFormat("dd/MM/yyyy");
        return `From ${formattedStartDate} to ${formattedEndDate}`
      } else {
        return '-'
      }
    }
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async calculateDownloads() {
      if (this.releases && this.releases.length > 0) {
        const totalDownloads = this.releases.reduce((result, release) => {
          const releaseDownloads = release.assets.reduce((result, asset) => {
            return result + asset.download_count
          }, 0)
          return result + releaseDownloads
        }, 0)
        this.totalDownloads = totalDownloads

        const latestVersionDownloads = this.releases[0].assets.reduce(
          (result, asset) => {
            return result + asset.download_count
          },
          0
        )
        this.latestVersionDownloads = latestVersionDownloads
        this.latestVersion = this.releases[0].tag_name
        this.latestVersionStartTime = this.releases[0].published_at
      }
    },
  },
  watch: {
    releases: {
      immediate: true,
      async handler() {
        this.calculateDownloads()
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
