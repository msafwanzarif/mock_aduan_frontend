<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3"><button class="btn btn-secondary me-3" @click="$router.back()">Back</button>Daftar Pengguna</h1>
          <label class="form-label mt-3">Nama *</label>
          <input id="nameInput" v-model="nama" type="text" class="form-control">
          <label class="form-label mt-3">Email *</label>
          <input id="emailInput" v-model="email" type="text" class="form-control">
          <label class="form-label mt-3">IC No *</label>
          <input id="icInput" v-model="icno" type="text" class="form-control">
          <label class="form-label mt-3">Password *</label>
          <input id="passInput" v-model="password" type="password" class="form-control">
          <label class="form-label mt-3">Confirm Password *</label>
          <input id="confirmPassInput" v-model="confirm_password" type="password" class="form-control">
          <label class="form-label mt-3">Negeri</label>
          <select name="selectNegeri" id="negeriSelect" class="form-select">
           <option value="SGR">Selangor</option>
           <option value="PNG">Penang</option>
          </select>
          <div class="d-flex align-items-center justify-content-end mt-3">
            <div class="form-check me-3">
              <input class="form-check-input" type="checkbox" value="" id="checkSetuju" v-model="checked">
              <label class="form-check-label" for="checkSetuju">
                Saya setuju untuk tidak membuat aduan palsu atau mengarut
              </label>
            </div>
              <button @click="daftar" class="btn btn-primary px-5" :disabled="!checked">Daftar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2";
export default {
  data() {
    return {
      "nama": "",
      "icno": "",
      "email": "",
      "password": "",
      "confirm_password": "",
      checked:false
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
              Swal.fire({
              icon: "success",
              title: "Success",
              text: "Akaun anda telah didaftarkan",
            }).then(() => {
              // Redirect to dashboard after successful submission
              this.$router.push({ name: "home" })
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Pendaftaran tidak berjaya. Sila cuba lagi",
          });
        })
    }
  }
}
</script>