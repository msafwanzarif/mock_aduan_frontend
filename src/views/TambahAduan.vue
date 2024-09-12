<template>
  <div class="container h-100">
    <div class="h-100 d-flex flex-column align-items-center py-5">
      <div class="card w-100 w-md-25">
        <div class="card-body">
          <h1 class="m-0 mb-3">
            <button class="btn btn-secondary me-3" @click="$router.back()">
              Back
            </button>
            Tambah Aduan
          </h1>
          <label class="form-label mt-3">Tajuk</label>
          <input type="text" class="form-control" v-model="tajuk" />

          <label class="form-label mt-3">Butiran</label>
          <textarea rows="4" class="form-control" v-model="butiran"></textarea>

          <div class="mt-4 float-end">
            <button @click="submitAduan" class="btn btn-primary px-5">
              Hantar
            </button>
          </div>
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
      tajuk: "",
      butiran: "",
    };
  },
  methods: {
    async submitAduan() {
      if (!this.tajuk || !this.butiran) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Form",
          text: "Please fill in all fields before submitting.",
        });
        return;
      }

      try {
        const response = await axios.request({
          method: "post",
          url: "http://localhost:3000/api/aduan",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            title: this.tajuk,
            content: this.butiran,
          },
        });

        console.log(response.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Aduan successfully submitted!",
        }).then(() => {
          // Redirect to dashboard after successful submission
          this.$router.push({ name: "dashboardpage" });
        });
      } catch (error) {
        console.error("Failed to submit aduan:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit aduan. Please try again.",
        });
      }
    },
  },
};
</script>
