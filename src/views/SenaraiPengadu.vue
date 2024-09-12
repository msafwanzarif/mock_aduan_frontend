<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1><span class="c-pointer" @click="$router.back()">Home ></span> Senarai Pengguna</h1>
        <ul class="pagination float-end">
          <li class="page-item" :class="{'disabled':currentPage == 1}" >
            <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="page in maxPage" class="page-item c-pointer" :class="{'fw-bold':currentPage == page}"><a class="page-link" @click="changePage(page)">{{ page }}</a></li>
          <li class="page-item" :class="{disabled:currentPage == maxPage}">
            <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        <table class="table table-hover table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">IC No</th>
              <th scope="col">Email</th>
              <th scope="col">Total Aduan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in senaraiPengguna" class="c-pointer" @click="$router.push({name:'detailpengadu',params:{id:item.id}})">
              <th scope="row">{{ (currentPage - 1) * 4 + (index + 1) }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.id_no }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.aduanCount }}</td>
            </tr>
          </tbody>
        </table>
        <ul class="pagination float-end">
          <li class="page-item" :class="{'disabled':currentPage == 1}" >
            <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="page in maxPage" class="page-item c-pointer" :class="{'fw-bold':currentPage == page}"><a class="page-link" @click="changePage(page)">{{ page }}</a></li>
          <li class="page-item" :class="{disabled:currentPage == maxPage}">
            <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return {
      senaraiPengguna:[],
      currentPage:1,
      maxPage:1
    }
  },
  mounted() {
    this.getAllPengguna()
  },
  methods:{
    changePage(page){
      this.currentPage = page
      this.getAllPengguna()
    },
    getAllPengguna(){
      const that = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/pengguna',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')},
        params: {
          pageNumber: that.currentPage,
        }
      })
      .then(function (response) {
        if(response.status == 200) {
          that.senaraiPengguna = response.data.result
          that.maxPage = response.data.maxPage
        }
      })
      .catch(function (error) {
        console.log(error.message)
        alert("Error")
      })
    }
  }
}
</script>