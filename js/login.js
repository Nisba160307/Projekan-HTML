// ========================================
// FORM LOGIN
// ========================================

const formulirLogin = document.getElementById("formulirLogin");
const kataSandi = document.getElementById("kataSandi");
const tombolSandi = document.getElementById("tombolSandi");
const ikonSandi = tombolSandi.querySelector(".material-symbols-outlined");
const pesanLogin = document.getElementById("pesanLogin");

// ========================================
// TOMBOL LIHAT PASSWORD
// ========================================

tombolSandi.addEventListener("click", function () {
    if (kataSandi.type === "password") {
        kataSandi.type = "text";
        ikonSandi.textContent = "visibility_off";
    } else {
        kataSandi.type = "password";
        ikonSandi.textContent = "visibility";
    }
});

// ========================================
// PROSES LOGIN
// ========================================

formulirLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil input
    const namaPengguna = document.getElementById("namaPengguna").value.trim();
    const kataSandiInput = document.getElementById("kataSandi").value;

    // ========================================
    // CEK DATA REGISTRASI
    // ========================================

    const dataTersimpan = localStorage.getItem("dataPengguna");

    if (dataTersimpan === null) {
        pesanLogin.textContent = "Belum ada akun. Silakan registrasi terlebih dahulu.";
        pesanLogin.className = "pesan-notifikasi gagal";
        return;
    }

    // ========================================
    // AMBIL DATA PENGGUNA
    // ========================================

    const dataPengguna = JSON.parse(dataTersimpan);

    // ========================================
    // CEK USERNAME DAN PASSWORD
    // ========================================

    if (
        namaPengguna === dataPengguna.namaPengguna &&
        kataSandiInput === dataPengguna.kataSandi
    ) {
        // Login berhasil
        pesanLogin.textContent = "Login berhasil! Mengalihkan...";
        pesanLogin.className = "pesan-notifikasi sukses";

        // Simpan nama pengguna untuk sesi login
        const namaUser = dataPengguna.nama || dataPengguna.namaPengguna;
        localStorage.setItem("namaLogin", namaUser);

        // ========================================
        // LANGSUNG KE BERANDA
        // ========================================

        setTimeout(function () {
            window.location.href = "dashbord.html";
        }, 1000);

    } else {
        // Login gagal
        pesanLogin.textContent = "Nama pengguna atau kata sandi salah.";
        pesanLogin.className = "pesan-notifikasi gagal";
    }
});