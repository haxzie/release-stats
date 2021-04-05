const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    authToken: null,
  }
}
export const mutations = {
  setAuthToken(state, authToken) {
    state.authToken = authToken
  },
}
export const actions = {
  nuxtServerInit({ commit, app }, { req }) {
    let authToken = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        authToken = parsed['next-auth.session-token']
        this.$axios.onRequest((config) => {
          config.headers.common['Authorization'] = `Bearer ${authToken}`;
          return config;
        })
        console.log(authToken)
      } catch (err) {
        console.error({ err })
      }
    }
    commit('setAuthToken', authToken)
  },
  setAuthToken({ commit }, { token }) {
    commit('setAuthToken', token)
  },
}
