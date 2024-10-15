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
          <input type="text" class="form-control" @keyup.enter="submitAduan" v-model="tajuk" :maxlength="100"
          @input="updateTajukLength"/>
          <p class="text-muted mt-1">
            {{ tajukLength }} characters out of 100 characters
          </p>

          <label class="form-label mt-3">Butiran</label>
          <textarea rows="4" class="form-control"  @keydown="handleKeydown" v-model="butiran" :maxlength="1000"
          @input="updateButiranLength"></textarea>
          <p class="text-muted mt-1">
            {{ butiranLength }} characters out of 1000 characters
          </p>

          <div class="mt-4 float-end">
            <button @click="submitAduan" class="btn btn-primary px-5" :disabled="isDisabled">
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
      tajukLength: "",
      butiranLength: "",
    };
  },
  computed: {
    isDisabled(){
      return this.tajuk.length > 100 || this.butiran.length > 1000;
    }
  },
  methods: {
    handleKeydown(event) {
    if (event.key === "Enter") {
      // Prevent the default behavior of adding a new line
      if (!event.shiftKey) {
        event.preventDefault();
         // Check if the input is empty
         if (this.butiran.trim() === "") {
            // Show a warning using SweetAlert
            Swal.fire({
              icon: "warning",
              title: "Butiran Required",
              text: "Please enter a value before submitting.",
            });
            return; // Block submission
          }
        this.submitAduan(); // Call submitAduan if Enter is pressed without Shift
      }
    }
  },
    updateTajukLength(){
      this.tajukLength = this.tajuk.length;
    },
    updateButiranLength(){
      this.butiranLength = this.butiran.length
    },
    async submitAduan() {
      if (!this.tajuk || !this.butiran) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Form",
          text: "Please fill in all fields before submitting.",
        });
        return;
      }

      if (this.tajuk.length > 100 || this.butiran.length > 1000) {
        Swal.fire({
          icon: "warning",
          title: "Exceeded Character Limit",
          text: `Tajuk cannot exceed 100 characters and Butiran cannot exceed 1000 characters.`,
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
<style scoped>
.text-muted {
  font-size: 0.85rem;
}
</style>
