document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. CEK SESI LOGIN (PROTEKSI HALAMAN)
    // =========================================

    const namaLogin = localStorage.getItem("namaLogin");
    const dataTersimpan = localStorage.getItem("dataPengguna");

    // Jika belum login / data tidak ada, lempar ke login.html
    if (!namaLogin || !dataTersimpan) {
        window.location.href = "login.html";
        return;
    }

    // =========================================
    // 2. ELEMENT HTML
    // =========================================

    const namaPengguna = document.getElementById("namaPengguna");
    const username = document.getElementById("username");
    const namaLengkap = document.getElementById("namaLengkap");
    const usernameDetail = document.getElementById("usernameDetail");
    const jumlahQuiz = document.getElementById("jumlahQuiz");
    const rataNilai = document.getElementById("rataNilai");

    // =========================================
    // 3. TAMPILKAN DATA PROFIL
    // =========================================

    const dataPengguna = JSON.parse(dataTersimpan);

    if (namaPengguna) namaPengguna.textContent = namaLogin || dataPengguna.nama;
    if (username) username.textContent = "@" + (dataPengguna.namaPengguna || "user");
    if (namaLengkap) namaLengkap.textContent = dataPengguna.nama || "-";
    if (usernameDetail) usernameDetail.textContent = dataPengguna.namaPengguna || "-";

    // =========================================
    // 4. STATISTIK QUIZ
    // =========================================

    const riwayat = JSON.parse(localStorage.getItem("riwayatQuiz")) || [];

    if (jumlahQuiz) {
        jumlahQuiz.textContent = riwayat.length;
    }

    if (rataNilai) {
        if (riwayat.length > 0) {
            let totalNilai = 0;
            riwayat.forEach(function (data) {
                totalNilai += Number(data.nilai || 0);
            });

            const rataRata = Math.round(totalNilai / riwayat.length);
            rataNilai.textContent = rataRata;
        } else {
            rataNilai.textContent = "0";
        }
    }

    // =========================================
    // 5. LOGIK LOGOUT
    // =========================================

    function prosesLogout(event) {
        event.preventDefault();
        localStorage.removeItem("namaLogin");
        window.location.href = "login.html";
    }

    const tombolLogout = document.getElementById("tombolLogout");
    const tombolLogoutFooter = document.getElementById("tombolLogoutFooter");

    if (tombolLogout) tombolLogout.addEventListener("click", prosesLogout);
    if (tombolLogoutFooter) tombolLogoutFooter.addEventListener("click", prosesLogout);

}); 