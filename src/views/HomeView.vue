<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center justify-content-center">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3">Login</h1>
          <label class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control">
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
        url: 'http://localhost:3000/auth/login',
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
        console.log(error)
        alert("Wrong username or password")
      })

    }
  }
}
</script>