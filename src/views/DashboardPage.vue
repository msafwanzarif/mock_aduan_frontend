<template>
  <div class="container h-100 py-5">
    <div class="d-flex flex-wrap align-item-center">
      <div class="card w-75">
        <div class="card-body">
          <h1>Selamat Datang!</h1>
          <h2 class="fw-bold m-0">{{ tempNama }}</h2>
          <span> {{ roleLabel[roleId] }}</span>
        </div>
      </div>
      <div class="card w-25">
        <div class="card-body">
          <button
            class="btn btn-outline-dark w-100 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#profilModal"
            @click="getMyProfile"
          >
            Profil Anda
          </button>
          <button
            class="btn btn-outline-dark w-100 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#passwordModal"
          >
            Tukar Password
          </button>
          <button
            class="btn btn-outline-danger w-100"
            @click=logOut
          >
            Log Keluar
          </button>
        </div>
      </div>
      <div
        class="card w-50 c-pointer"
        v-if="roleId == 1"
        @click="$router.push({ name: 'senaraipengguna' })"
      >
        <div class="card-body text-center">
          <h1>Pegawai</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20vh"
            height="20vh"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-user"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
      </div>
      <div
        class="card w-50 c-pointer"
        v-if="roleId == 1 || roleId == 2"
        @click="$router.push({ name: 'senaraipengadu' })"
      >
        <div class="card-body text-center">
          <h1>Pengguna</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20vh"
            height="20vh"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-user"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
      </div>
      <div
        class="card w-50 c-pointer"
        v-if="roleId == 2"
        @click="$router.push({ name: 'siasatanpage' })"
      >
        <div class="card-body text-center">
          <h1>Aduan</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20vh"
            height="20vh"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-message"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9h8" />
            <path d="M8 13h6" />
            <path
              d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
            />
          </svg>
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
          <button
            class="btn btn-outline-dark float-end"
            @click="$router.push({ name: 'tambahaduan' })"
          >
            Tambah
          </button>
          <h1>Aduan</h1>
          <div
            class="d-flex flex-wrap align-items-center justify-content-between"
          >
            <div
              class="card bg-secondary w-25 c-pointer"
              @click="toggleStatus(1)"
              :class="{ 'opacity-25': activeStatus && activeStatus != 1 }"
            >
              <div class="card-body text-center">
                <h2>Terima</h2>
                <h3>{{ terima }}</h3>
              </div>
            </div>
            <div
              class="card bg-primary w-25 c-pointer"
              @click="toggleStatus(2)"
              :class="{ 'opacity-25': activeStatus && activeStatus != 2 }"
            >
              <div class="card-body text-center">
                <h2>Siasat</h2>
                <h3>{{ siasat }}</h3>
              </div>
            </div>
            <div
              class="card bg-success w-25 c-pointer"
              @click="toggleStatus(3)"
              :class="{ 'opacity-25': activeStatus && activeStatus != 3 }"
            >
              <div class="card-body text-center">
                <h2>Selesai</h2>
                <h3>{{ selesai }}</h3>
              </div>
            </div>
            <div
              class="card bg-danger w-25 c-pointer"
              @click="toggleStatus(4)"
              :class="{ 'opacity-25': activeStatus && activeStatus != 4 }"
            >
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
            <div
              class="col-12 col-md-6 mb-3"
              v-for="aduan in aduans"
              :key="aduan.id"
              @click="clickOnAduan(aduan.id)"
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
                        >{{ getStatus(aduan.status) }}</span
                      >
                      <div class="float-end">
                        <span class="fs-6">{{
                          dateFormat(aduan.created_at)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-12 col-md-6 mb-3" v-if="!activeStatus || activeStatus == 1">
              <div class="card h-100">
                <div class="card-body">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div>
                      <h1 class="fs-3 fw-bold">Aduan Paling Latest</h1>
                      <h2 class="fs-6 fst-italic">
                        Hmm takda apa sangat nak cakap actually
                      </h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-secondary">Terima</span>
                      <div class="float-end">
                        <span class="fs-6">21/6/2024 9:00AM</span>
                      </div>
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
                      <h2 class="fs-6 fst-italic">
                        Longkang di kawasan rumah saya selalu sahaja tersumbat
                        takleh tahan la
                      </h2>
                    </div>
                    <div class="w-100 mt-4">
                      <span class="badge rounded-pill bg-primary">Dalam Siasatan</span>
                      <div class="float-end">
                        <span class="fs-6">12/6/2024 12:09PM</span>
                      </div>
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
                      <div class="float-end">
                        <span class="fs-6">10/5/2024 02:09AM</span>
                      </div>
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
                      <div class="float-end">
                        <span class="fs-6">10/5/2024 02:09AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <ul class="pagination float-end">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click="changePage(currentPage - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              class="page-item"
              v-for="page in maxPages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click="changePage(page)">{{
                page
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === maxPages }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click="changePage(currentPage + 1)"
              >
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
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Nama -->
          <label class="form-label">Nama</label>
          <input v-model="tempNama" class="form-control" type="text" />

          <!-- Email -->
          <label class="form-label">Email</label>
          <input v-model="tempEmail" class="form-control" type="text" />

          <!-- No IC (Only for Pengguna role) -->
          <label class="form-label" v-if="roleId == 3">No IC</label>
          <input
            v-if="roleId == 3"
            v-model="tempIcNo"
            class="form-control"
            @input="validateNumericInput"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="getMyProfile"
          >
            Batal
          </button>
          <button type="button" class="btn btn-primary" @click="saveProfil">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="passwordModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tukar Password</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label">Password Asal</label>
          <input class="form-control" type="password" v-model="oldPassword" />
          <label class="form-label">Password Baru</label>
          <input class="form-control" type="password" v-model="newPassword" />
          <label class="form-label">Confirm Password Baru</label>
          <input
            class="form-control"
            type="password"
            v-model="confirmNewPassword"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Batal
          </button>
          <button type="button" class="btn btn-primary" @click="changePassword">
            Simpan
          </button>
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
      profile: null,
      roleId: 1,
      nama: "",
      terima: 5,
      siasat: 2,
      selesai: 2,
      tolak: 0,
      activeStatus: 0,
      tempNama: "",
      tempEmail: "",
      tempIcNo: "",
      roleLabel: ["", "Admin", "Pegawai", "Pengguna"],
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      currentPage: 1,
      maxPages: 1,
      aduans: [],
    };
  },
  mounted() {
    this.tempNama = this.nama;
    let roleId = localStorage.getItem("roleId");
    this.getMyProfile();
    if (roleId == 3) {
      this.getMyStat();
      this.getAllMyAduan();
    }
    if (roleId) this.roleId = roleId;
  },
  watch: {
    roleId(newVal, oldVal) {
      localStorage.setItem("roleId", newVal);
    },
  },
  methods: {

    async cancelProfileUpdate() {
    try {
      // Fetch the latest profile data
      await this.getMyProfile();

      // Close the modal
      const myModalEl = document.querySelector("#profilModal");
      const modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
      modal.hide();
    } catch (error) {
      console.error("Error fetching profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch profile data.",
      });
    }
  },
    validateNumericInput(event) {
      const value = event.target.value;
      const numericValue = value.replace(/[^0-9]/g, "");
      this.tempIcNo = numericValue;
    },
    getMyStat() {
      axios
        .request({
          method: "get",
          url: "http://localhost:3000/api/aduan/stat",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          if (response.status == 200) {
            this.terima = response.data.terima;
            this.siasat = response.data.siasatan;
            this.selesai = response.data.selesai;
            this.tolak = response.data.batal;
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error?.message);
        });
    },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({name: "home"});
    },
    toggleStatus(status) {
      this.activeStatus === status
        ? (this.activeStatus = 0)
        : (this.activeStatus = status);
      this.currentPage = 1;
      this.getAllMyAduan();
    },
    async getMyProfile() {
      try {
        const response = await axios.request({
          method: "GET",
          url: "http://localhost:3000/api/pengguna/profil",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });

        if (response.status === 200) {
          const profileData = response.data;

          this.tempNama = profileData.name;
          this.tempEmail = profileData.email;
          if (this.roleId == 3) {
            this.tempIcNo = profileData.id_no;
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.profile = null;
      }
    },
    async saveProfil() {
      try {
        // Check if name and email fields are not empty
        if (
          !this.tempNama ||
          !this.tempEmail ||
          (this.roleId == 3 && !this.tempIcNo)
        ) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please fill in all the required fields.",
          });
          return;
        }

        const payload = {
          name: this.tempNama,
          email: this.tempEmail,
          ic_no: this.roleId == 3 ? this.tempIcNo : undefined,
        };

        // Send the update request
        const response = await axios.request({
          method: "put",
          url: "http://localhost:3000/api/profil/update",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: payload,
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
          });
          // Update the profile data
          this.nama = this.tempNama;
          this.tempEmail = this.tempEmail;
          if (this.roleId == 3) this.ic_no = this.tempIcNo;

          // Close the modal
          var myModalEl = document.querySelector("#profilModal");
          var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
          modal.toggle();
        }
      } catch (error) {
        let errorMessage = "Failed to update profile, please try again.";
        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    },
    async changePassword() {
      if (!this.oldPassword || !this.newPassword || !this.confirmNewPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all the fields.",
        });
        return;
      }

      if (this.newPassword !== this.confirmNewPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "New password and confirmation do not match.",
        });
        return;
      }

      try {
        const response = await axios.request({
          method: "put",
          url: "http://localhost:3000/api/profil/password",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          data: {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
        });

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password successfully updated.",
          });
          // Clear the form fields
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
          // Close the modal
          const modal = document.querySelector("#passwordModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          bootstrapModal.hide();
        }
      } catch (error) {
        let errorMessage = "Failed to update password, please try again.";

        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    },
    clickOnAduan(aduanId) {
      this.$router.push({ name: "detailaduan", params: { aduanId } });
    },

    getAllMyAduan() {
      axios
        .request({
          method: "GET",
          url: "http://localhost:3000/api/aduan/my",
          params: {
            page: this.currentPage,
            pageSize: 4,
            status: this.activeStatus,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          if (response.status == 200) {
            this.aduans = response.data.result;
            this.currentPage = response.data.currentPage;
            this.maxPages = response.data.maxPages;
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error?.message);
        });
    },

    getStatus(status) {
      switch (status) {
        case 1:
          return "Terima";
        case 2:
          return "Dalam Siastan";
        case 3:
          return "Selesai";
        case 4:
          return "Ditolak";
        default:
          return "null";
      }
    },
    getBadgeClass(status) {
      switch (status) {
        case 1:
          return "bg-secondary"; // For status 1 (Terima)
        case 2:
          return "bg-primary"; // For status 2 (Dalam Siasatan)
        case 3:
          return "bg-success";
        case 4:
          return "bg-danger"; // For status 3 (Selesai)
        default:
          return "bg-dark"; // Default class for unknown status
      }
    },

    dateFormat(dateTime) {
      const date = new Date(dateTime * 1000);
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },

    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.maxPages) return;
      this.currentPage = pageNumber;
      this.getAllMyAduan();
    },
  },
};
</script>
