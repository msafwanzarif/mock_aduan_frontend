<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <h1><button class="btn btn-secondary" @click="$router.back()">Back</button> Detail Pengadu</h1>
        <div class="card w-100 mt-3">
          <div class="card-body">
            <h2>Profil</h2>
            <h2 class="fs-1 fw-bold"> Alif</h2>
            <h2 class="fs-4"> 931215145966</h2>
            <h2 class="fs-4"> alif@gmail.com</h2>
          </div>
        </div>
        <hr>
        <h2>Aduan Yang Dihantar : 3</h2>
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h1 class="fs-3 fw-bold">Aduan Paling Latest</h1>
                    <h2 class="fs-6 fst-italic">Hmm takda apa sangat nak cakap actually
                    </h2>
                  </div>
                  <div class="w-100 mt-4">
                    <span class="badge rounded-pill bg-secondary">Terima</span>
                    <div class="float-end"><span class="fs-6">21/6/2024 9:00AM</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-3 c-pointer" @click="$router.push({name:'detailaduan'})">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h1 class="fs-3 fw-bold">Aduan Mengenai Longkang</h1>
                    <h2 class="fs-6 fst-italic">Longkang di kawasan rumah saya selalu sahaja tersumbat takleh tahan la
                    </h2>
                  </div>
                  <div class="w-100 mt-4">
                    <span class="badge rounded-pill bg-primary">Dalam Siasatan</span>
                    <div class="float-end"><span class="fs-6">12/6/2024 12:09PM</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <h1 class="fs-3 fw-bold">Aduan Saya</h1>
                    <h2 class="fs-6 fst-italic">Jiran saya selalu bising</h2>
                  </div>
                  <div class="w-100 mt-4">
                    <span class="badge rounded-pill bg-success">Selesai</span>
                    <div class="float-end"><span class="fs-6">10/5/2024 02:09AM</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>