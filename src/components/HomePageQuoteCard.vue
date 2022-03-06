<template>
  <div class="col-lg-4 col-md-6 mt-4 pt-2">
    <div class="list-grid-item rounded">
      <div class="grid-item-content p-3">
        <ul class="list-inline mb-0">
          <li class="list-inline-item f-15">
            <span class="badge badge-success">{{ quote.genre }}</span>
          </li>
          <li class="list-inline-item float-right">
            <div class="grid-fev-icon">
              <a @click.prevent="" class="text-danger"><i class="mdi mdi-heart"></i></a>
            </div>
          </li>
        </ul>
        <div class="grid-list-img mt-3">
          <img src="" alt="" class="img-fluid d-block">
        </div>
        <div class="grid-list-desc mt-3">
          <p class="text-muted f-14 mb-1">{{ quote.title }}</p>
          <p class="text-muted fw-bold mb-1">{{ quote.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePageQuoteCard',
  props: ['quote', 'index']
}
</script>

<style>
</style>
