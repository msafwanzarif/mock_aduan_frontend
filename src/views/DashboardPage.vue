<template>
  <div class="container h-100 py-5">
    <div class="d-flex flex-wrap align-item-center">
      <div class="card w-75">
        <div class="card-body">
          <h1>Selamat Datang!</h1>
          <h2 class="fw-bold m-0"> {{ nama }}</h2>
          <span> {{ roleLabel[roleId] }}</span>
        </div>
      </div>
      <div class="card w-25">
        <div class="card-body">
          <button class="btn btn-outline-dark w-100 mb-2" data-bs-toggle="modal"
            data-bs-target="#profilModal">Profil Anda</button>
          <button class="btn btn-outline-dark w-100 mb-2" data-bs-toggle="modal" data-bs-target="#passwordModal">Tukar
            Password</button>
          <button class="btn btn-outline-danger w-100" @click="$router.push({ name: 'home' })">Log Keluar</button>
        </div>
      </div>
      <div class="card w-50" v-if="roleId == 1" @click="$router.push({ name: 'senaraipengguna' })">
        <div class="card-body text-center">
          <h1>Pegawai</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="20vh" height="20vh" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-user">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
      </div>
      <div class="card w-50" v-if="roleId == 1 || roleId == 2" @click="$router.push({ name: 'senaraipengadu' })">
        <div class="card-body text-center">
          <h1>Pengguna</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="20vh" height="20vh" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-user">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
      </div>
      <div class="card w-50" v-if="roleId == 2" @click="$router.push({name:'siasatanpage'})">
        <div class="card-body text-center">
          <h1>Aduan</h1>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20vh"  height="20vh"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-message"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
        </div>
      </div>
      <!-- <div class="card w-100" v-if="roleId != 3">
        <div class="card-body">
          <h1>Pengurusan Aduan</h1>
          <div class="d-flex flex-wrap align-items-center justify-content-between">
            <div class="card bg-secondary w-25">
              <div class="card-body text-center">
                <h2>Terima</h2>
                <h3>5</h3>
              </div>
            </div>
            <div class="card bg-primary w-25">
              <div class="card-body text-center">
                <h2>Siasat</h2>
                <h3>2</h3>
              </div>
            </div>
            <div class="card bg-success w-25">
              <div class="card-body text-center">
                <h2>Selesai</h2>
                <h3>2</h3>
              </div>
            </div>
            <div class="card bg-danger w-25">
              <div class="card-body text-center">
                <h2>Tolak</h2>
                <h3>0</h3>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div id="pelangganCard" class="card w-100" v-if="roleId == 3">
        <div class="card-body">
          <button class="btn btn-outline-dark float-end" @click="$router.push({name:'tambahaduan'})">Tambah</button>
          <h1>Aduan</h1>
          <div class="d-flex flex-wrap align-items-center justify-content-between">
            <div class="card bg-secondary w-25 c-pointer" @click="toggleStatus(1)" :class="{'opacity-25':activeStatus && activeStatus != 1}">
              <div class="card-body text-center">
                <h2>Terima</h2>
                <h3>{{ terima }}</h3>
              </div>
            </div>
            <div class="card bg-primary w-25 c-pointer" @click="toggleStatus(2)" :class="{'opacity-25':activeStatus && activeStatus != 2}">
              <div class="card-body text-center">
                <h2>Siasat</h2>
                <h3>{{ siasat }}</h3>
              </div>
            </div>
            <div class="card bg-success w-25 c-pointer" @click="toggleStatus(3)" :class="{'opacity-25':activeStatus && activeStatus != 3}">
              <div class="card-body text-center">
                <h2>Selesai</h2>
                <h3>{{ selesai }}</h3>
              </div>
            </div>
            <div class="card bg-danger w-25 c-pointer" @click="toggleStatus(4)" :class="{'opacity-25':activeStatus && activeStatus != 4}">
              <div class="card-body text-center">
                <h2>Tolak</h2>
                <h3>{{ tolak }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="pelangganCardAduans" class="card w-100" v-if="roleId == 3">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6 mb-3" v-if="!activeStatus || activeStatus == 1">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                      <h1 class="fs-3 fw-bold">Aduan Paling Latest</h1>
                      <h2 class="fs-6 fst-italic">Hmm takda apa sangat nak cakap actually
                      </h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-secondary">Terima</span>
                      <div class="float-end"><span class="fs-6">21/6/2024 9:00AM</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-3 c-pointer" @click="clickOnAduan" v-if="!activeStatus || activeStatus == 2">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                      <h1 class="fs-3 fw-bold">Aduan Mengenai Longkang</h1>
                      <h2 class="fs-6 fst-italic">Longkang di kawasan rumah saya selalu sahaja tersumbat takleh tahan la
                      </h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-primary">Dalam Siasatan</span>
                      <div class="float-end"><span class="fs-6">12/6/2024 12:09PM</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-3" v-if="!activeStatus || activeStatus == 3">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex flex-column justify-content-between h-100" >
                    <div>
                      <h1 class="fs-3 fw-bold">Aduan Saya</h1>
                      <h2 class="fs-6 fst-italic">Jiran saya selalu bising</h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-success">Selesai</span>
                      <div class="float-end"><span class="fs-6">10/5/2024 02:09AM</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-3" v-if="!activeStatus || activeStatus == 3">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                      <h1 class="fs-3 fw-bold">Aduan Saya</h1>
                      <h2 class="fs-6 fst-italic">Jiran saya selalu bising</h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-success">Selesai</span>
                      <div class="float-end"><span class="fs-6">10/5/2024 02:09AM</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <ul class="pagination float-end">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="profilModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Profil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Nama</label>
          <input v-model="tempNama" class="form-control" type="text">
          <label class="form-label">Email</label>
          <input class="form-control" type="text">
          <label class="form-label" v-if="roleId == 3">No IC</label>
          <input v-if="roleId == 3" class="form-control" type="text">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="tempNama = nama">Batal</button>
          <button type="button" class="btn btn-primary" @click="saveProfil">Simpan</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="passwordModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tukar Password</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Password Asal</label>
          <input class="form-control" type="password">
          <label class="form-label">Password Baru</label>
          <input class="form-control" type="password">
          <label class="form-label">Confirm Password Baru</label>
          <input class="form-control" type="password">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary" @click="changePassword">Simpan</button>
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
      roleId: 1,
      nama: "Safwan Zarif",
      terima:5,
      siasat:2,
      selesai:2,
      tolak:0,
      activeStatus:0,
      tempNama: "",
      roleLabel: ["", "Admin", "Pegawai", "Pengguna"]
    }
  },
  mounted() {
    this.tempNama = this.nama
    let roleId = localStorage.getItem("roleId")
    if(roleId == 3) this.getMyStat()
    if(roleId) this.roleId = roleId
  },
  watch:{
    roleId(newVal,oldVal){
      localStorage.setItem("roleId",newVal)
    }
  },
  methods: {
    getMyStat(){
      axios.request({
        method: 'get',
        url: 'http://localhost:3000/api/aduan/stat',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
      })
      .then((response) => {
        if(response.status == 200) {
          this.terima = response.data.terima
          this.siasat = response.data.siasatan
          this.selesai = response.data.selesai
          this.tolak = response.data.batal
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error?.message)
      })
    },
    toggleStatus(status){
      if(this.activeStatus != status) return this.activeStatus = status
      if(this.activeStatus) return this.activeStatus = 0
      return this.activeStatus = status
    },
    saveProfil() {
      this.nama = this.tempNama
      var myModalEl = document.querySelector('#profilModal')
      var modal = bootstrap.Modal.getOrCreateInstance(myModalEl) // Returns a Bootstrap modal instance
      modal.toggle()
    },
    changePassword() {
      alert("Password Changed")
      var myModalEl = document.querySelector('#passwordModal')
      var modal = bootstrap.Modal.getOrCreateInstance(myModalEl) // Returns a Bootstrap modal instance
      modal.toggle()
    },
    clickOnAduan(){
      this.$router.push({ name: 'detailaduan' })
    }
  }
}
</script>