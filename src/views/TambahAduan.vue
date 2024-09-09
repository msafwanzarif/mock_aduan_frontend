<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3"><button class="btn btn-secondary me-3" @click="$router.back()">Back</button>Tambah Aduan</h1>
          <label class="form-label mt-3">Tajuk</label>
          <input type="text" class="form-control">
          <label class="form-label mt-3">Butiran</label>
          <textarea rows="4" class="form-control"></textarea>
          <div class="mt-4 float-end">
            <button @click="$router.push({name:'dashboardpage'})" class="btn btn-primary px-5">Hantar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>