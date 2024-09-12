<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1>
          <button class="btn btn-secondary" @click="$router.back()">
            Back
          </button>
          Detail Aduan
        </h1>
        <div class="card w-100 mt-3" v-if="aduan">
          <div class="card-body">
            <h2 class="fs-1 fw-bold">{{ aduan.title }}</h2>
            <h2 class="fs-4">{{ aduan.content }}</h2>
            <table class="table table-hover mt-5">
              <tbody>
                <tr
                  v-if="roleId != 3"
                  class="c-pointer"
                  @click="clickOnPengadu(aduan.authorId)"
                >
                  <th class="w-25">Dihantar Oleh</th>
                  <td>
                    <span>{{ aduan.authorName }}</span>
                  </td>
                </tr>
                <tr>
                  <th class="w-25">Dihantar Pada</th>
                  <td>{{ formatDate(aduan.created_at) }}</td>
                </tr>
                <tr>
                  <th class="w-25">Status</th>
                  <td v-if="status == 1">
                    <span class="badge rounded-pill bg-secondary">Terima</span>
                  </td>
                  <td v-if="status == 2">
                    <span class="badge rounded-pill bg-primary"
                      >Dalam Siasatan</span
                    >
                  </td>
                  <td v-if="status == 3">
                    <span class="badge rounded-pill bg-success">Selesai</span>
                  </td>
                  <td v-if="status == 4">
                    <span class="badge rounded-pill bg-danger"
                      >Batal / Tolak</span
                    >
                  </td>
                </tr>
                <tr v-if="status == 3">
                  <th class="w-25">Pegawai Bertugas</th>
                  <td>{{ aduan.pegawaiName }}</td>
                </tr>
                <tr v-if="status == 3">
                  <th class="w-25">Penyelesaian</th>
                  <td>{{ aduan.hasil }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>Loading...</div>
        <hr />
        <button
          v-if="roleId == 3 && status < 3"
          class="btn btn-danger float-end"
          @click="updateStatus(4)"
        >
          Batal Aduan
        </button>
        <button
          v-if="roleId == 2 && status < 2"
          class="btn btn-danger float-end"
          @click="updateStatus(4)"
        >
          Tolak Aduan
        </button>
        <button
          v-if="roleId == 2 && status < 2"
          class="btn btn-primary float-end me-3"
          @click="updateStatus(2)"
        >
          Terima Aduan
        </button>
        <template v-if="roleId == 2 && status == 2">
          <h2>Hasil Siasatan</h2>
          <label for="hasilSiasatan" class="form-label"></label>
          <textarea
            id="hasilSiasatan"
            cols="30"
            rows="4"
            class="form-control"
            v-model="hasilSiasatan"
          ></textarea>
          <button
            class="btn btn-primary float-end mt-3"
            @click="updateStatus(3)"
          >
            Selesaikan
          </button>
        </template>
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
      aduan: null,
      roleId: 2,
      status: 2,
      hasilSiasatan: "",
    };
  },
  async mounted() {
    const roleId = localStorage.getItem("roleId");
    const aduanId = this.$route.params.aduanId;

    if (roleId) this.roleId = parseInt(roleId);

    try {
      let response;
      if (this.roleId === 3) {
        // Pengadu role
        response = await axios.request({
          method: "get",
          url: `http://localhost:3000/api/aduan/my/${aduanId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        // Pegawai/Admin role 
        response = await axios.request({
          method: "get",
          url: `http://localhost:3000/api/aduan/aduanDetail-Pegawai/${aduanId}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      this.aduan = response.data;
      this.status = this.aduan.status;
    } catch (error) {
      console.error("Failed to fetch aduan details:", error);
    }
  },
  methods: {
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

    async updateStatus(status) {
      const aduanId = this.$route.params.aduanId;

      try {
        let response;

        if (this.roleId === 3 && status === 4) {
          // Call the batalAduan API for pengadu role
          response = await axios.request({
            method: "put",
            url: `http://localhost:3000/api/aduan/cancel/${aduanId}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        } else if (this.roleId === 2) {
          // Call pegawai API based on status
          if (status === 4) {
            response = await axios.request({
              method: "put",
              url: `http://localhost:3000/api/aduan/pegawai/tolak/${aduanId}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
          } else if (status === 2) {
            response = await axios.request({
              method: "put",
              url: `http://localhost:3000/api/aduan/pegawai/terima/${aduanId}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
          } else if (status === 3) {
            if (!this.hasilSiasatan) {
              Swal.fire({
                icon: "warning",
                title: "Form Incomplete",
                text: "Please fill in the Hasil Siasatan before completing the aduan.",
              });
              return;
            }

            response = await axios.request({
              method: "put",
              url: `http://localhost:3000/api/aduan/pegawai/selesai/${aduanId}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: {
                hasil: this.hasilSiasatan,
              },
            });
          }
        }

        console.log(response.data);

        this.status = status;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Aduan status updated successfully!",
        });
      } catch (error) {
        console.error("Failed to update aduan status:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update aduan status. Please try again.",
        });
      }
    },
    clickOnPengadu(id) {
      this.$router.push({ name: "detailpengadu", params: { id } });
    },
  },
};
</script>
