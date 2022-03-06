import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: 'https://someone-said-that.herokuapp.com/',
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    quotes: [],
    quoteOfTheDay: {},
    randomQuote: {},
    userProfile: {},
    preLoaderState: false,
    dataToEdit: {}
  },
  getters: {
  },
  mutations: {
    SET_QUOTES (state, payload) {
      state.quotes = payload
    },
    SET_CURRENT_PAGE (state, page) {
      state.currentPage = page
    },
    SET_TOTAL_PAGES (state, pages) {
      state.totalPages = pages
    },
    SET_TOTAL_ITEMS (state, items) {
      state.totalItems = items
    },
    SET_QUOTE_OF_THE_DAY (state, payload) {
      state.quoteOfTheDay = payload
    },
    SET_RANDOM_QUOTE (state, payload) {
      state.randomQuote = payload
    },
    SET_CURRENT_USER_PROFILE (state, payload) {
      state.userProfile = payload
    },
    SET_PRELOADER_STATE (state, payload) {
      state.preLoaderState = payload
    },
    SET_DATA_TO_EDIT (state, payload) {
      state.dataToEdit = payload
    }
  },
  actions: {
    getAllQuotes (context, { page, author, title, genre }) {
      switch (genre) {
        case 'coding':
          if (author || title) {
            return fetch(`${this.state.serverUrl}/pub/quotes/coding?page=${page}&author=${author}&title=${title}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          } else {
            return fetch(`${this.state.serverUrl}/pub/quotes/coding?page=${page}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          }
        case 'original':
          if (author || title) {
            return fetch(`${this.state.serverUrl}/pub/quotes/original?page=${page}&author=${author}&title=${title}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          } else {
            return fetch(`${this.state.serverUrl}/pub/quotes/original?page=${page}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          }
        case 'programming':
          if (author || title) {
            return fetch(`${this.state.serverUrl}/pub/quotes/programming?page=${page}&author=${author}&title=${title}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          } else {
            return fetch(`${this.state.serverUrl}/pub/quotes/programming?page=${page}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          }
        default:
          if (author || title) {
            return fetch(`${this.state.serverUrl}/pub/quotes?page=${page}&author=${author}&title=${title}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          } else {
            return fetch(`${this.state.serverUrl}/pub/quotes?page=${page}`)
              .then((response) => response.json())
              .then((data) => {
                context.commit('SET_QUOTES', data.quotes)
                context.commit('SET_CURRENT_PAGE', data.currentPage)
                context.commit('SET_TOTAL_PAGES', data.totalPages)
                context.commit('SET_TOTAL_ITEMS', data.totalItems)
              })
          }
      }
    },
    getQuoteOfTheDay (context) {
      return fetch(`${this.state.serverUrl}/pub/quotes/qotd`)
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_QUOTE_OF_THE_DAY', data)
        })
    },
    getRandomQuote (context) {
      return fetch(`${this.state.serverUrl}/pub/quotes/random`)
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_RANDOM_QUOTE', data)
        })
    },
    signInSubmit (context, userCredentials) {
      return fetch(`${this.state.serverUrl}/pub/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    registerSubmit (context, newUserCredentials) {
      return fetch(`${this.state.serverUrl}/pub/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserCredentials)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    signOutSubmit (context) {
      context.commit('SET_CURRENT_USER_PROFILE', '')
      return localStorage.removeItem('access_token')
    },
    getUserProfile (context) {
      return fetch(`${this.state.serverUrl}/pub/me`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_CURRENT_USER_PROFILE', data)
        })
        .catch((error) => console.log(error))
    },
    changeSubscriptionStatus (context, subscribe) {
      return fetch(`${this.state.serverUrl}/pub/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(subscribe)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    postQuoteSubmit (context, data) {
      return fetch(`${this.state.serverUrl}/pub/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    editQuoteOriginal (context, data) {
      return fetch(`${this.state.serverUrl}/pub/quotes/${data}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('SET_DATA_TO_EDIT', data)
        })
        .catch((error) => console.log(error))
    },
    postEditQuoteSubmit (context, data) {
      return fetch(`${this.state.serverUrl}/pub/quotes/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    deleteQuoteOriginal (context, data) {
      return fetch(`${this.state.serverUrl}/pub/quotes/${data}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
    },
    googleSignInSubmit (context, googleUserIdToken) {
      return fetch(`${this.state.serverUrl}/pub/login/google-sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: googleUserIdToken })
      })
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
