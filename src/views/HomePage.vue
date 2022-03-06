<template>
  <div>
    <PreLoader />
    <NavbarMenu
    @clearFilter="clearFilter" />
    <section class="bg-half page-next-level">
    <div class="bg-overlay"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="home-form-position">
          <div class="row">
            <div class="col-lg-12">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="text-center text-white">
                    <h4 class="text-uppercase title mb-4">Welcome to "Someone Said That" - Your Website for Amazing Quotes</h4>
                    <p>Look at the quotes below, or start by searching at the box</p>
                  </div>
                </div>
              </div>
              <div class="home-registration-form p-4 mb-3">
                <form @submit.prevent="handleSearchSubmit" class="registration-form">
                  <div class="row">
                    <div class="col-lg-5 col-md-6">
                      <div class="registration-form-box">
                        <i class='bx bx-male-female' ></i>
                        <input type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Author Name.." v-model="searchValue.author">
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-6">
                      <div class="registration-form-box">
                        <i class='bx bx-text' ></i>
                        <input
                        type="text" id="exampleInputName1" class="form-control rounded registration-input-box" placeholder="Search by Quote Content.." v-model="searchValue.title">
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                      <div class="registration-form-box">
                        <input type="submit" id="submit" class="btn btn-info btn-block">
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section class="section">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="section-title text-center pb-2">
            <div v-if="queries.author.length > 0 || queries.title.length > 0">Current Filter:
              <span @click.prevent="handleAuthorFilterClick" class="badge badge-success mr-1" v-if="queries.author.length > 0"> Author: {{ queries.author }} X </span>
              <span @click.prevent="handleTitleFilterClick" class="badge badge-success" v-if="queries.title.length > 0"> Title: {{ queries.title }} X</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div id="blockquote" class="col-lg-12">
          <div class="row">
          <QuoteOfTheDayBlock />
          <RandomQuotesBlock />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 pt-2">
            <div class="row align-items-center">
              <div class="col-lg-12">
                <div class="show-results">
                  <div class="float-left">
                    <h5 class="text-dark mb-0 pt-2 f-18">Showing results {{ startIndex }} - {{ currentIndex }} of {{ totalItems }} total Quotes</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="row">
            <HomePageQuoteCard
              v-for="(quote, index) in quotes" :key="quote.id"
              :quote="quote"
              :index="index"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mt-4 pt-2">
            <nav aria-label="Page navigation example">
              <ul class="pagination job-pagination mb-0 justify-content-center">
                <li class="page-item" v-if="currentPage > 1">
                  <a class="page-link" href="" @click.prevent="changePagePreviousClick" tabindex="-1" aria-disabled="true">
                    <i class="mdi mdi-chevron-double-left f-15"></i>
                  </a>
                </li>
                <PaginationButton
                v-for="(page, index) in totalPages"
                :key="index"
                :page="page"
                @handlePageClick="handlePageClick"
                />
                <li class="page-item" v-if="currentPage < totalPages">
                  <a class="page-link" href="" @click.prevent="changePageNextClick">
                    <i class="mdi mdi-chevron-double-right f-15"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <HFooter />
  </div>
</template>

<script>
import PreLoader from '@/components/PreLoader.vue'
import RandomQuotesBlock from '@/components/RandomQuotesBlock.vue'
import QuoteOfTheDayBlock from '@/components/QuoteOfTheDayBlock.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'
import PaginationButton from '@/components/PaginationButton.vue'
import HomePageQuoteCard from '@/components/HomePageQuoteCard.vue'
import HFooter from 'vue-hacktiv8-footer'
export default {
  name: 'HomePage',
  components: {
    HomePageQuoteCard,
    PaginationButton,
    NavbarMenu,
    HFooter,
    QuoteOfTheDayBlock,
    RandomQuotesBlock,
    PreLoader
  },
  data () {
    return {
      queries: {
        author: '',
        title: ''
      },
      searchValue: {
        author: '',
        title: ''
      },
      load: false
    }
  },
  computed: {
    quotes () {
      return this.$store.state.quotes
    },
    currentPage () {
      return this.$store.state.currentPage
    },
    totalPages () {
      return this.$store.state.totalPages
    },
    totalItems () {
      return this.$store.state.totalItems
    },
    currentIndex () {
      if (this.currentPage > 1 && this.currentPage * 15 < this.totalItems) {
        return this.quotes.length * this.currentPage
      } else if (this.currentPage > 1 && this.currentPage * 15 > this.totalItems) {
        return this.quotes.length + ((this.currentPage - 1) * 15)
      } else {
        return this.quotes.length
      }
    },
    startIndex () {
      if (this.currentPage > 1 && this.currentPage * 15 < this.totalItems) {
        return (this.quotes.length * (this.currentPage - 1)) + 1
      } else if (this.currentPage > 1 && this.currentPage * 15 > this.totalItems) {
        return ((this.currentPage - 1) * 15) + 1
      } else if (this.quotes.length === 0) {
        return 0
      } else {
        return 1
      }
    }
  },
  methods: {
    clearFilter () {
      this.searchValue.author = ''
      this.searchValue.title = ''
    },
    changePagePreviousClick () {
      if (this.currentPage === 1 || this.currentPage < 0) {
        if (!this.$route.query.genre) {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
          }
        } else {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
          }
        }
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage - 1))
        if (!this.$route.query.genre) {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
          }
        } else {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
          }
        }
      }
    },
    changePageNextClick () {
      if (this.currentPage === this.totalPages || this.currentPage > this.totalPages) {
        if (!this.$route.query.genre) {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
          }
        } else {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
          }
        }
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage + 1))
        if (!this.$route.query.genre) {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
          }
        } else {
          if (this.queries.author || this.queries.title) {
            this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
          } else {
            this.$router.push({ path: 'home', query: { page: this.currentPage, genre: this.$route.query.genre } })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
          }
        }
      }
    },
    handlePageClick (page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
      if (this.queries.author || this.queries.title) {
        this.$router.push({ path: 'home', query: { page: this.currentPage, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
      } else {
        this.$router.push({ path: 'home', query: { page: this.currentPage, genre: this.$route.query.genre } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
      }
    },
    handleAuthorFilterClick () {
      this.queries.author = ''

      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })

      this.$router.push({ path: 'home', query: { page: 1, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
    },
    handleTitleFilterClick () {
      this.queries.title = ''

      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })

      this.$router.push({ path: 'home', query: { page: 1, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre } })
    },
    handleSearchSubmit () {
      this.$store.dispatch('getAllQuotes', { page: 1, author: this.searchValue.author, title: this.searchValue.title, genre: this.$route.query.genre })

      this.$router.push({ path: 'home', query: { page: 1, author: this.searchValue.author, title: this.searchValue.title, genre: this.$route.query.genre } })

      if (this.searchValue.author.length > 0) {
        this.searchValue.author = ''
      }
      if (this.searchValue.title.length > 0) {
        this.searchValue.title = ''
      }
    }
  },
  watch: {
    '$route.query.genre': {
      handler (newGenre) {
        this.$store.dispatch('getAllQuotes', { page: 1, genre: newGenre })
      }
    },
    '$route.query.page': {
      handler (newPage) {
        this.$store.dispatch('getAllQuotes', { page: newPage, genre: this.$route.query.genre })
      }
    },
    '$route.query.author': {
      handler (newValue) {
        if (newValue.length > this.queries.author.length) {
          this.queries.author = newValue
        }
      }
    },
    '$route.query.title': {
      handler (newValue) {
        if (newValue.length > this.queries.title.length) {
          this.queries.title = newValue
        }
      }
    }
  },
  created () {
    this.$store.dispatch('getQuoteOfTheDay')
    this.$store.dispatch('getRandomQuote')

    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('getUserProfile')
    }

    if (!this.$route.query.genre) {
      if (!this.$route.query.page) {
        this.$store.dispatch('getAllQuotes', { page: 1 })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      } else if (this.queries.author || this.queries.title) {
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      } else {
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      }
    } else {
      if (!this.$route.query.page) {
        this.$store.dispatch('getAllQuotes', { page: 1, genre: this.$route.query.genre })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      } else if (this.queries.author || this.queries.title) {
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, author: this.queries.author, title: this.queries.title, genre: this.$route.query.genre })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      } else {
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: this.$route.query.genre })
          .then(() => {
            this.$nextTick(function () {
              this.$store.commit('SET_PRELOADER_STATE', true)
              this.load = true
            })
          })
      }
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
