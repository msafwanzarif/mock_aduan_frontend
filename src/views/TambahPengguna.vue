<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3"><button class="btn btn-secondary me-3" @click="$router.back()">Back</button>Tambah
            Pegawai</h1>
          <label class="form-label mt-3">Role</label>
          <select id="selectRole" class="form-select" v-model="selectedRole">
            <option v-for="role in gRole" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
          <label class="form-label mt-3">Nama</label>
          <input type="text" class="form-control" v-model="nama" autofocus>
          <label class="form-label mt-3">Email</label>
          <input type="text" class="form-control" v-model="email">
          <label class="form-label mt-3">Password</label>
          <input type="password" class="form-control" v-model="pwd">
          <label class="form-label mt-3">Confirm Password</label>
          <input type="password" class="form-control" v-model="cpwd">
          <div class="mt-4 float-end">
            <button @click="tambahPegawai" class="btn btn-primary px-5">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      role: '',
      nama: '',
      email: '',
      pwd: '',
      cpwd: '',
      gRole: [],
      selectedRole: 0,
    }
  },
  mounted() {
    this.getRole()
  },
  methods: {
    async tambahPegawai() {
      if (this.pwd != this.cpwd || !this.nama || !this.email || !this.pwd) {
        Swal.fire({
          icon: 'warning',
          title: 'Tidak Berjaya',
          text: 'Sila masukkan butiran dengan betul'
        }).then(() => {
          this.pwd = '',
            this.cpwd = ''
            // console.log('role:' + this.selectedRole)
        })
      } else {
        await axios.request({
          method: 'POST',
          url: 'http://localhost:3000/api/pegawai',
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: {
            name: this.nama,
            password: this.pwd,
            email: this.email,
            roleId: this.selectedRole,
          }
        }).then((res) => {
          if (res.status == 201) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Tambah pegawai BERJAYA!!!'
            }).then(() => {
              this.$router.push({ name: "senaraipengguna" })
            })
          }
        }).catch((e) => {
          console.log(e)
          // alert(e?.message)
          const eMessage = e.response?.data?.message || e.message
          const displayMessage = Array.isArray(eMessage) ? eMessage.join('. ') : eMessage
          Swal.fire({
            icon: 'error',
            title: 'Tidak Berjaya',
            text: displayMessage
          })

          console.log(e.data)
        })
      }
    },

    getRole() {
      axios.request({
        method: "GET",
        url: 'http://localhost:3000/api/pegawai/select/role',
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((res) => {
        if (res.status == 200) {
          this.gRole = res.data
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
    }

  }


}

</script>