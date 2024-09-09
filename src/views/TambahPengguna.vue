<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3"><button class="btn btn-secondary me-3" @click="$router.back()">Back</button>Tambah Pegawai</h1>
          <label class="form-label mt-3">Role</label>
          <select id="selectRole" class="form-select">
            <option value="1">Admin</option>
            <option value="2" selected>Pegawai</option>
          </select>
          <label class="form-label mt-3">Nama</label>
          <input type="text" class="form-control">
          <label class="form-label mt-3">Email</label>
          <input type="text" class="form-control">
          <label class="form-label mt-3">Password</label>
          <input type="password" class="form-control">
          <label class="form-label mt-3">Confirm Password</label>
          <input type="password" class="form-control">
          <div class="mt-4 float-end">
            <button @click="$router.push({name:'senaraipengguna'})" class="btn btn-primary px-5">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>