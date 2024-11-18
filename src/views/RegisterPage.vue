<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3"><button class="btn btn-secondary me-3" @click="$router.back()">Back</button>Daftar
            Pengguna</h1>
          <label class="form-label mt-3">Nama</label>
          <input v-model="nama" type="text" class="form-control">
          <label class="form-label mt-3">Email</label>
          <input v-model="email" type="text" class="form-control">
          <label class="form-label mt-3">IC No</label>
          <input v-model="icno" type="text" class="form-control">
          <label class="form-label mt-3">Password</label>
          <input v-model="password" type="password" class="form-control">
          <label class="form-label mt-3">Confirm Password</label>
          <input v-model="confirm_password" type="password" class="form-control">
          <div class="mt-4 float-end">
            <button @click="daftar" class="btn btn-primary px-5">Daftar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      "nama": "",
      "icno": "",
      "email": "",
      "password": "",
      "confirm_password": "",
    }
  },
  methods: {
    daftar() {
      if (this.password != this.confirm_password) return alert("Password tidak sama")
      axios.request({
        method: 'post',
        url: 'https://api-aduan.safwanzarif.dev//api/pengguna/daftar',
        data: {
          "nama": this.nama,
          "icno": this.icno,
          "email": this.email,
          "password": this.password,
        }
      })
        .then((response) => {
          if (response.status == 201) {
            alert("Berjaya")
            this.$router.push({ name: "home" })
          }
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }
}
</script>