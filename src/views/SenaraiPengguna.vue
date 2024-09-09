<template>
  <div class="container d-flex justify-content-center align-items-center py-5">
    <div class="card w-100">
      <div class="card-body">
        <button class="btn btn-primary float-end" @click="$router.push({name:'tambahpengguna'})">Tambah</button>
        <h1><span class="c-pointer" @click="$router.push('dashboardpage')">Home ></span> Senarai Pegawai</h1>
        <table class="table table-hover table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="c-pointer" data-bs-toggle="modal" data-bs-target="#userModal">
              <th scope="row">1</th>
              <td>Safwan</td>
              <td>Admin</td>
              <td>safwan@aduan.gov</td>
              <td><span class="badge rounded-pill bg-success">Aktif</span></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Zarif</td>
              <td>Pegawai</td>
              <td>zarif@aduan.gov</td>
              <td><span class="badge rounded-pill bg-success">Aktif</span></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Aiman</td>
              <td>Pegawai</td>
              <td>aiman@aduan.gov</td>
              <td><span class="badge rounded-pill bg-warning">Tidak Aktif</span></td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Vader</td>
              <td>Pegawai</td>
              <td>aiman@aduan.gov</td>
              <td><span class="badge rounded-pill bg-danger">Digantung</span></td>
            </tr>

          </tbody>
        </table>
        <ul class="pagination float-end">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="modal fade" id="userModal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detail Pegawai</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-hover">
            <tbody>
              <tr>
                <th class="w-25">Nama</th>
                <td>Safwan Zarif</td>
              </tr>
              <tr>
                <th class="w-25">Role</th>
                <td>Pegawai</td>
              </tr>
              <tr>
                <th class="w-25">Email</th>
                <td>safwan@aduan.gov</td>
              </tr>
              <tr>
                <th class="w-25">Status</th>
                <td><span class="badge rounded-pill bg-success">Aktif</span></td>
              </tr>
              <tr>
                <th class="w-25">Login Terakhir</th>
                <td>20/6/2024 12:00 PM</td>
              </tr>
              <tr>
                <th class="w-25">Aduan Diuruskan</th>
                <td>3</td>
              </tr>
            </tbody>
        </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger">Gantung</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>