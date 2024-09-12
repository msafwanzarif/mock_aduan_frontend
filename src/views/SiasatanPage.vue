<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1>
          <button class="btn btn-secondary" @click="$router.back()">
            Back
          </button>
          Senarai Aduan
        </h1>
        <div class="row">
          <!-- Loop through aduanList -->
          <div
            v-for="aduan in aduanList"
            :key="aduan.id"
            class="col-12 col-md-6 mb-3 c-pointer"
            @click="
              $router.push({ name: 'detailaduan', params: { aduanId: aduan.id } })
            "
          >
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h1 class="fs-3 fw-bold">{{ aduan.title }}</h1>
                    <h2 class="fs-6 fst-italic">{{ aduan.content }}</h2>
                  </div>
                  <div class="w-100 mt-4">
                    <span
                      class="badge rounded-pill"
                      :class="getBadgeClass(aduan.status)"
                      >{{ aduanStatus(aduan.status) }}</span
                    >
                    <div class="float-end">
                      <span class="fs-6">{{
                        formatDate(aduan.created_at)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <ul class="pagination float-end">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="changePage(currentPage - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="changePage(currentPage + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      aduanList: [],
      currentPage: 1,
      totalPages: 1,
      pageSize: 4,
    };
  },
  mounted() {
    this.fetchAduanList();
  },
  methods: {
    async fetchAduanList() {
      try {
        const response = await axios.request({
          method: "get",
          url: "http://localhost:3000/api/aduan/aduanList-Pegawai",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          },
        });

        // Handle the response
        this.aduanList = response.data.aduanList;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("Failed to fetch aduan list", error);
        // if (error.response && error.response.status === 401) {
        //   // Handle unauthorized access
        //   alert("Unauthorized! Please log in again.");
        //   this.$router.push({ name: "home" });
        // }
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchAduanList();
      }
    },
    getBadgeClass(status) {
      switch (status) {
        case 1:
          return "bg-secondary";
        case 2:
          return "bg-primary";
        case 3:
          return "bg-success";
        case 4:
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    aduanStatus(status) {
      switch (status) {
        case 1:
          return "Terima";
        case 2:
          return "Dalam Siasatan";
        case 3:
          return "Selesai";
        case 4:
          return "Batal";
        default:
          return "Unknown";
      }
    },
    formatDate(timestamp) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("en-GB", options);
    },
  },
};
</script>
