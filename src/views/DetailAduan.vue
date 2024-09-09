<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1><button class="btn btn-secondary" @click="$router.back()">Back</button> Detail Aduan</h1>
        <div class="card w-100 mt-3">
          <div class="card-body">
            <h2 class="fs-1 fw-bold"> Aduan Mengenai Longkang</h2>
            <h2 class="fs-4"> Longkang di kawasan rumah saya selalu sahaja tersumbat takleh tahan la</h2>
            <table class="table table-hover mt-5">
            <tbody>
              <tr v-if="roleId != 3" class="c-pointer" @click="$router.push({name:'detailpengadu'})">
                <th class="w-25">Dihantar Oleh</th>
                <td><span>Alif</span></td>
              </tr>
              <tr>
                <th class="w-25">Dihantar Pada</th>
                <td>21/6/2024 9:00AM</td>
              </tr>
              <tr @click="status = status % 4 + 1">
                <th class="w-25">Status</th>
                <td v-if="status == 1"><span class="badge rounded-pill bg-secondary">Terima</span></td>
                <td v-if="status == 2"><span class="badge rounded-pill bg-primary">Dalam Siasatan</span></td>
                <td v-if="status == 3"><span class="badge rounded-pill bg-success">Selesai</span></td>
                <td v-if="status == 4"><span class="badge rounded-pill bg-danger">Batal / Tolak</span></td>
              </tr>
              <tr v-if="status == 3">
                <th class="w-25" >Pegawai Bertugas</th>
                <td>Safwan Zarif</td>
              </tr>
              <tr v-if="status == 3">
                <th class="w-25">Penyelesaian</th>
                <td>Saya dah buatkan longkang baru terbaik dari Ladang</td>
              </tr>
            </tbody>
        </table>
          </div>
        </div>
        <hr>
        <button v-if="roleId == 3 && status < 3" class="btn btn-danger float-end" @click="status = 4">Batal Aduan</button>
        <button v-if="roleId == 2 && status < 2" class="btn btn-danger float-end" @click="status = 4">Tolak Aduan</button>
        <button v-if="roleId == 2 && status < 2" class="btn btn-primary float-end me-3" @click="status = 2">Terima Aduan</button>
        <template v-if="roleId == 2 && status == 2">
          <h2>Hasil Siasatan</h2>
          <label for="hasilSiasatan" class="form-label"></label>
          <textarea id="hasilSiasatan" cols="30" rows="4" class="form-control"></textarea>
          <button class="btn btn-primary float-end mt-3" @click="status = 3">Selesaikan</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        roleId:2,
        status:2
      }
    },
    mounted(){
      let roleId = localStorage.getItem("roleId")
      if(roleId) this.roleId = roleId
    }
  }
</script>