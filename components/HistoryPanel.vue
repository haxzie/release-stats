<template>
  <div class="grid grid-cols-1 gap-2 py-2">
    <h4 v-if="history && history.length > 0" class="text-secondaryLight pt-2">Recent Repositories</h4>
    <div
      v-for="repository in history"
      :key="repository.id"
      @click="$emit('load', repository.full_name)"
      class="flex flex-col bg-white rounded shadow-sm hover:shadow-lg cursor-pointer overflow-hidden"
    >
      <div class="texts p-4">
        <h4 class="text-lg text-secondary">
          <span class="text-secondaryLight">{{ repository.owner.login }}/</span
          >{{ repository.name }}
        </h4>
      </div>
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
          >{{ formatNumber(repository.subscribers_count) }}</span
        >
        <span class="flex flex-row items-center mr-3 text-secondaryLight"
          ><m-icon size="18" class="mr-1 text-green-500">call_split</m-icon
          >{{ formatNumber(repository.forks_count) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [],
    }
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  async mounted() {
    let history = []
    try {
      const oldHistory = JSON.parse(localStorage.getItem('history'))
      history = [...oldHistory]
    } catch (error) {
      console.error(error)
    }
    this.history = history
  },
}
</script>

<style lang="scss" scoped></style>
