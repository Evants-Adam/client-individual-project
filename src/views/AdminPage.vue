<template>
  <div>
    <PreLoader />
    <NavbarMenu />
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
                    <h4 class="text-uppercase title mb-4">Welcome to "Someone Said That"<br> Admin Dashboard</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section class="section">
      <div class="container">
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
            <AdminPageQuoteCard
              v-for="(quote, index) in quotes" :key="quote.id"
              :quote="quote"
              :index="index"
              @handleEditClick="handleEditClick"
              @handleDeleteClick="handleDeleteClick"
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
import Swal from 'sweetalert2'
import PreLoader from '@/components/PreLoader.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'
import PaginationButton from '@/components/PaginationButton.vue'
import AdminPageQuoteCard from '@/components/AdminPageQuoteCard.vue'
import HFooter from 'vue-hacktiv8-footer'
export default {
  name: 'AdminPage',
  components: {
    AdminPageQuoteCard,
    PaginationButton,
    NavbarMenu,
    HFooter,
    PreLoader
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
    handleEditClick (id) {
      this.$store.dispatch('editQuoteOriginal', id)
        .then(() => {
          this.$router.push({ name: 'EditPage' })
        })
    },
    handleDeleteClick (id) {
      this.$store.dispatch('deleteQuoteOriginal', id)
        .then((data) => {
          if (data.message !== 'Quote deleted successfully') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Quote Deleted Successfully'
            })
            this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
          }
        })
    },
    changePagePreviousClick () {
      if (this.currentPage === 1 || this.currentPage < 0) {
        this.$router.push({ path: 'admin', query: { page: this.currentPage, genre: 'original' } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage - 1))
        this.$router.push({ path: 'admin', query: { page: this.currentPage, genre: 'original' } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
      }
    },
    changePageNextClick () {
      if (this.currentPage === this.totalPages || this.currentPage > this.totalPages) {
        this.$router.push({ path: 'admin', query: { page: this.currentPage } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page })
      } else {
        this.$store.commit('SET_CURRENT_PAGE', (this.currentPage + 1))
        this.$router.push({ path: 'admin', query: { page: this.currentPage, genre: 'original' } })
        this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
      }
    },
    handlePageClick (page) {
      this.$store.commit('SET_CURRENT_PAGE', page)
      this.$router.push({ path: 'admin', query: { page: this.currentPage, genre: 'original' } })
      this.$store.dispatch('getAllQuotes', { page: this.$route.query.page, genre: 'original' })
    }
  },
  created () {
    this.$store.dispatch('getUserProfile')
    this.$store.dispatch('getAllQuotes', { page: 1, genre: 'original' })
      .then(() => {
        this.$nextTick(function () {
          this.$store.commit('SET_PRELOADER_STATE', true)
          this.load = true
        })
      })
  }
}
</script>

<style>
</style>
