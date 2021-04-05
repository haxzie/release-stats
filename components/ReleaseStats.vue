<template>
  <div class="downloads-panel flex flex-col bg-white rounded shadow-sm">
    <div class="header flex flex-row items-center p-2 text-secondary">
      <h4 class="flex items-center flex-grow">
        <m-icon class="mr-2">download_done</m-icon>
        Release Stats
      </h4>
      <div v-if="selectedVersion" class="version-chooser">
        <div
          class="selection-drop-down bg-blueGray-100 p-2 rounded flex items-center cursor-pointer hover:bg-blueGray-200 overflow-hidden"
          @click="toggleVersionList"
        >
          <span class="flex-grow overflow-ellipsis overflow-hidden">{{
            selectedVersion.tag_name
          }}</span>
          <m-icon size="24">keyboard_arrow_down</m-icon>
        </div>
        <SlideYUpTransition>
          <div
            v-if="showVersionList"
            class="options flex flex-col bg-white border border-blueGray-100 rounded"
            v-click-outside="
              () => {
                showVersionList = false
              }
            "
          >
            <div
              v-for="(version, index) in getSortedVersions"
              :key="index"
              class="flex p-2 cursor-pointer hover:bg-blueGray-100"
              @click="selectVersion(version)"
            >
              <p class="overflow-ellipsis overflow-hidden">{{ version.tag_name }}</p>
            </div>
          </div>
        </SlideYUpTransition>
      </div>
    </div>
    <div v-if="selectedVersion" class="download-stats flex flex-col py-2 px-4">
      <h4 class="text-secondary">Total Downloads</h4>
      <p class="text-2xl text-secondary font-semibold">
        {{ formatNumber(getCurrentVersionDetails.total_downloads) }}
      </p>
    </div>
    <div v-if="selectedVersion" class="assets flex flex-col px-4 pt-2 pb-4">
      <div
        v-for="asset in getCurrentVersionDetails.assets"
        :key="asset.id"
        class="asset pb-2"
      >
        <div class="flex flex-row items-center py-2">
          <h5
            class="text-secondary flex-grow overflow-ellipsis overflow-hidden"
          >
            {{ asset.name }}
          </h5>
          <span class="text-secondaryLight">{{
            formatNumber(asset.download_count)
          }}</span>
        </div>
        <div class="download-meter bg-blueGray-100 rounded">
          <div
            class="runner bg-blue-500 rounded"
            :style="{ width: `${asset.percentage}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mIcon from './m-icon.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: { mIcon, SlideYUpTransition },
  props: {
    releases: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showVersionList: false,
      selectedVersion: null,
      indexedReleases: {},
    }
  },
  computed: {
    getSortedVersions() {
      return this.indexedReleases
        ? Object.values(this.indexedReleases).sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          )
        : []
    },
    getCurrentVersionDetails() {
      if (this.selectedVersion) {
        const totalDownloads = this.selectedVersion.assets.reduce(
          (result, asset) => {
            return result + asset.download_count
          },
          0
        )
        return {
          ...this.selectedVersion,
          total_downloads: totalDownloads,
          assets: this.selectedVersion.assets
            .sort((a, b) => b.download_count - a.download_count)
            .map((item) => {
              return {
                ...item,
                percentage: (item.download_count / totalDownloads) * 100,
              }
            }),
        }
      }
    },
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    toggleVersionList() {
      if (!this.showVersionList) {
        this.showVersionList = true
      }
    },
    selectVersion(version) {
      this.selectedVersion = version
      this.showVersionList = false
    },
    async indexReleases() {
      if (this.releases && this.releases.length > 0) {
        const indexedReleases = this.releases.reduce((result, release) => {
          return {
            ...result,
            [release.id]: release,
          }
        }, {})
        this.indexedReleases = indexedReleases
        this.selectedVersion = this.releases[0]
      }
    },
  },
  watch: {
    releases: {
      immediate: true,
      async handler() {
        this.indexReleases()
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.version-chooser {
  position: relative;

  .selection-drop-down {
    width: 150px;
  }

  .options {
    position: absolute;
    top: 40px;
    width: 100%;
    left: 0;
    z-index: 9;
    max-height: 200px;
    overflow-y: auto;
  }
}

.assets {
  .download-meter {
    height: 5px;
    .runner {
      width: 0%;
      height: 100%;
    }
  }
}
</style>
