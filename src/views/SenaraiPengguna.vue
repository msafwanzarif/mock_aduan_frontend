<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <button class="btn btn-primary float-end" @click="$router.push({ name: 'tambahpengguna' })">Tambah</button>
        <h1><span class="c-pointer" @click="$router.push('dashboardpage')">Home ></span> Senarai Pegawai</h1>
        <div class="conatiner" v-if="!loading">
          <table class="table table-hover table-striped mt-5">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Nama</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="c-pointer" data-bs-toggle="modal" data-bs-target="#userModal"
                v-for="(pegawai, index) in pegawais" :key="pegawai.id" @click="getDetailPegawai(pegawai.id)">
                <th scope="row">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
                <td>{{ pegawai.name }}</td>
                <td>{{ getRoleId(pegawai.roleId) }}</td>
                <td>{{ pegawai.email }}</td>
                <td><span class="badge rounded-pill" :class="getBadgeStatus(pegawai.status)">{{
                  getStatus(pegawai.status) }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container d-flex justify-content-center p-5" v-else>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <ul class="pagination float-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detail Pegawai</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-hover">
            <tbody>
              <tr>
                <th class="w-25">Nama</th>
                <td>{{ detailPegawai.name }}</td>
              </tr>
              <tr>
                <th class="w-25">Role</th>
                <td>{{ getRoleId(detailPegawai.roleId) }}</td>
              </tr>
              <tr>
                <th class="w-25">Email</th>
                <td>{{ detailPegawai.email }}</td>
              </tr>
              <tr>
                <th class="w-25">Status</th>
                <td><span class="badge rounded-pill" :class="getBadgeStatus(detailPegawai.status)">{{
                  getStatus(detailPegawai.status) }}</span></td>
              </tr>
              <tr>
                <th class="w-25">Login Terakhir</th>
                <td>{{ detailPegawai.last_login === 0 ? '-' : dateFormat(detailPegawai.last_login) }}</td>
              </tr>
              <tr>
                <th class="w-25">Aduan Diuruskan</th>
                <!-- <td>{{ detailPegawai._count.aduan }}</td>  -->
                <!-- <td v-if="detailPegawai">{{ detailPegawai._count.aduan || 0 }}</td> -->
                <td>{{ detailPegawai.aduanCount }}</td>
                <!-- hold dulu -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" v-if="(detailPegawai.status !== 3)"
            @click="gantungPegawai(detailPegawai.id)">Gantung</button>
          <button type="button" class="btn btn-success" v-if="(detailPegawai.status !== 1)"
            @click="aktifPegawai(detailPegawai.id)">Aktif</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="getAllPegawai()">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      roleId: 1,
      currentPage: 1,
      totalPages: 1,
      pageSize: 4,
      pegawais: [],
      detailPegawai: [],
      loading: true,
    }
  },
  mounted() {
    let roleId = localStorage.getItem("roleId");
    if (roleId == 1) {
      this.getAllPegawai()
    }
  },

  methods: {
    getAllPegawai() {
      axios.request({
        methods: "GET",
        url: "https://api-aduan.safwanzarif.dev//api/pegawai/list",
        params: { page: this.currentPage, pageSize: this.pageSize },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((response) => {
        if (response.status == 200) {
          this.pegawais = response.data.pegawailist
          this.currentPage = response.data.currentPage
          this.totalPages = response.data.totalPages
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      }).finally(() => {
        this.loading = false
      })
    },

    async getDetailPegawai(id) {
      axios.request({
        method: "GET",
        url: `https://api-aduan.safwanzarif.dev//api/pegawai/detail/${id}`,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((response) => {
        if (response.status == 200) {
          this.detailPegawai = response.data
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
    },

    gantungPegawai(id) {
      axios.request({
        method: "PUT",
        url: `https://api-aduan.safwanzarif.dev//api/pegawai/gantung/${id}`,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((res) => {
        if (res.status == 200) {
          this.getDetailPegawai(id)
          Swal.fire({
            icon: "success",
            title: "Berjaya digantung",
            text: "HAHAHAHA! padan muke kene gantung"
          })
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
    },

    aktifPegawai(id) {
      axios.request({
        method: "PUT",
        url: `https://api-aduan.safwanzarif.dev//api/pegawai/aktif/${id}`,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }).then((res) => {
        if (res.status == 200) {
          this.getDetailPegawai(id)
          Swal.fire({
            icon: "success",
            title: "Berjaya diaktifkan",
            text: "HAHAHAHA! jangan buat pasal lagi"
          })
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
    },

    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.maxPages) return
      this.currentPage = pageNumber
      this.loading = true
      this.getAllPegawai()
    },

    getStatus(status) {
      switch (status) {
        case 1: return 'Aktif'
        case 2: return 'Tidak Aktif'
        case 3: return 'Digantung'
        default: 'null'
      }
    },

    getBadgeStatus(status) {
      switch (status) {
        case 1: return 'bg-success'
        case 2: return 'bg-warning'
        case 3: return 'bg-danger'
        default: 'null'
      }
    },

    getRoleId(roleId) {
      switch (roleId) {
        case 1: return 'Admin'
        case 2: return 'Pegawai'
      }
    },

    dateFormat(dateTime) {
      const date = new Date(dateTime * 1000)
      return date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    },

  }
}
</script>