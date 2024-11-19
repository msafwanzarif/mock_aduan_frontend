<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center justify-content-center">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3">Sila Login</h1>
          <label class="form-label">Username</label>
          <input v-model="username"  @keyup.enter="login"  type="text" class="form-control" autofocus>
          <label class="form-label">Password</label>
          <input v-model="password" @keyup.enter="login" type="password" class="form-control">
          <div class="mt-4 float-end">
            <button class="btn btn-outline-dark me-3 px-4"
              @click="$router.push({ name: 'registerpage' })">Daftar</button>
            <button @click="login" class="btn btn-primary px-5">Login</button>
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
  data(){
    return {
      username:"",
      password:""
    }
  },
  mounted() {

  },
  methods: {
    login() {
      console.log(111,this)
      const that = this
      axios({
        method: 'post',
        url: 'https://api-aduan.safwanzarif.dev//auth/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      .then(function (response) {
        console.log(112,this)
        console.log(response.status)
        if(response.status == 200) {
          localStorage.setItem("token", response.data.access_token)
          localStorage.setItem("roleId",response.data.roleId)
          that.$router.push({name:"dashboardpage"})
        }
      })
      .catch(function (error) {
       // Display backend error message
       if (error.response && error.response.data && error.response.data.message) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Log Masuk tidak berjaya. Username atau Password tidak tepat",
          });
          // alert(`${error.response.data.message}`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Log Masuk tidak berjaya. Username atau Password tidak tepat",
          });
          // General fallback error
        }
      })

    }
  }
}
</script>
<style scoped>
.container {
  height: 100vh !important; 
}
</style>
