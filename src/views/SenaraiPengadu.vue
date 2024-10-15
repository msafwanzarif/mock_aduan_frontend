<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1><span class="c-pointer" @click="$router.back()">Home ></span> Senarai Pengguna</h1>
        <table class="table table-hover table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama</th>
              <th scope="col">IC No</th>
              <th scope="col">Email</th>
              <th style="text-align: center" scope="col">Total Aduan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in penggunas" :key="item.id" class="c-pointer" @click="$router.push({name:'detailpengadu',params:{id:item.id}})">
              <th scope="row">{{ (currentPage - 1) * 4 + (index + 1) }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.id_no }}</td>
              <td>{{ item.email }}</td>
              <td style="text-align: center;">{{ item.aduanCount }}</td>
            </tr>
          </tbody>
        </table>
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
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      penggunas:[],
      currentPage: 1,
      totalPages:1,
      roleId:1,
      pageSize:4
    }
  },

  mounted() {
    let roleId = localStorage.getItem("roleId");
      if (roleId == 1 || roleId == 2) {
        this.getAllPengguna()
      } 
  },

  methods: {
    getAllPengguna() {
      axios.request({
        method: "GET",
        url: "http://localhost:3000/api/pengguna",
        params: { page: this.currentPage, pageSize: this.pageSize },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }).then((response) => {
        this.penggunas = response.data.result;
        this.currentPage = response.data.currentPage
        this.totalPages = response.data.maxPage
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      })
    },

    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return
      this.currentPage = pageNumber
      this.getAllPengguna()
    },

    clickProfile(id) {
      this.$router.push({name:'detailpengadu', params: {id}})
    }
  }
}
</script>