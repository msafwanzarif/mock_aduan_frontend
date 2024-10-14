<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1><button class="btn btn-secondary" @click="$router.back()">Back</button> Detail Pengadu</h1>
        <div class="card w-100 mt-3">
          <div class="card-body">
            <h2>Profil</h2>
            <h2 class="fs-1 fw-bold">{{ profile.name }}</h2>
            <h2 class="fs-4">{{ profile.id_no }}</h2>
            <h2 class="fs-4">{{ profile.email }}</h2>
          </div>
        </div>
        <hr>
        <h2>Aduan Yang Dihantar : {{ tAduan }}</h2>
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="loading-text">Please Wait</div>
        </div>
        <div class="row" v-else>
          <div class="col-12 col-md-6 mb-3 c-pointer" v-for="aduan in aduans" :key="aduan.id" @click="clickOnAduan(aduan.id)">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h1 class="fs-3 fw-bold">{{ aduan.title }}</h1>
                    <h2 class="fs-6 fst-italic">{{ aduan.content }}</h2>
                  </div>
                  <div class="w-100 mt-4">
                    <span class="badge rounded-pill" :class="getBadgeClass(aduan.status)">{{ getStatus(aduan.status) }}</span>
                    <div class="float-end"><span class="fs-6">{{ dateFormat(aduan.created_at) }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-12 col-md-6 mb-3 c-pointer" @click="$router.push({name:'detailaduan'})">
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
          </div> -->
          <!-- <div class="col-12 col-md-6 mb-3">
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: [],
      aduans: [],
      tAduan: 0,
      loading: true,
    }
  },

  mounted() {
    let id = this.$route.params.id;
    // console.log(id)
    this.getProfilenAduan(id)
  },

  methods: {
    getProfilenAduan(id) {
      axios.request({
        method: 'GET',
        url: `http://localhost:3000/api/pengguna/${id}`,
        // params: {id: id},
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }).then((response) => {
        this.profile = response.data.profile
        this.aduans = response.data.aduan.results
        this.tAduan = response.data.aduan.total
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
      .finally(() => {
        this.loading = false; 
      });
    },

    getStatus(status) {
      switch (status) {
        case 1: return 'Terima'
        case 2: return 'Dalam Siastan'
        case 3: return 'Selesai'
        case 4: return 'Ditolak'
        default: return 'null'
      }
    },
    getBadgeClass(status) {
      switch (status) {
        case 1:
          return 'bg-secondary'; 
        case 2:
          return 'bg-primary';    
        case 3:
          return 'bg-success';
        case 4:
          return 'bg-danger';  
        default:
          return 'bg-dark';       
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

    clickOnAduan(aduanId) {
      this.$router.push({ name: 'detailaduan', params: { aduanId } })
    }
  }
}
</script>
<style>
.spinner-border {
  width: 10rem;
  height: 10rem;
}
</style>