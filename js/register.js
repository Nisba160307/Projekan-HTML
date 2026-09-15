document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // AMBIL ELEMEN FORM DAN INPUT
    // ========================================

    const formulirRegistrasi = document.getElementById("formulirRegistrasi");
    const kataSandi = document.getElementById("kataSandi");
    const tombolSandi = document.getElementById("tombolSandi");
    const confirmSandi = document.getElementById("confirmSandi");
    const tombolConfirmSandi = document.getElementById("tombolConfirmSandi");
    const pesan = document.getElementById("pesan");

    // ========================================
    // TOMBOL LIHAT PASSWORD UTAMA
    // ========================================

    if (tombolSandi) {
        tombolSandi.addEventListener("click", function () {
            const ikon = tombolSandi.querySelector(".material-symbols-outlined");

            if (kataSandi.type === "password") {
                kataSandi.type = "text";
                if (ikon) ikon.textContent = "visibility_off";
            } else {
                kataSandi.type = "password";
                if (ikon) ikon.textContent = "visibility";
            }
        });
    }

    // ========================================
    // TOMBOL LIHAT KONFIRMASI PASSWORD
    // ========================================

    if (tombolConfirmSandi) {
        tombolConfirmSandi.addEventListener("click", function () {
            const ikon = tombolConfirmSandi.querySelector(".material-symbols-outlined");

            if (confirmSandi.type === "password") {
                confirmSandi.type = "text";
                if (ikon) ikon.textContent = "visibility_off";
            } else {
                confirmSandi.type = "password";
                if (ikon) ikon.textContent = "visibility";
            }
        });
    }

    // ========================================
    // PROSES REGISTRASI
    // ========================================

    if (formulirRegistrasi) {
        formulirRegistrasi.addEventListener("submit", function (event) {
            event.preventDefault();

            // Ambil data dari input
            const nama = document.getElementById("nama").value.trim();
            const namaPengguna = document.getElementById("namaPengguna").value.trim();
            const password = kataSandi.value;
            const konfirmasiPassword = confirmSandi.value;

            // Cek Kesesuaian Password
            if (password !== konfirmasiPassword) {
                pesan.textContent = "Konfirmasi kata sandi tidak cocok.";
                pesan.className = "pesan-notifikasi gagal";
                return;
            }

            // Membuat Objek Data Pengguna
            const dataPengguna = {
                nama: nama,
                namaPengguna: namaPengguna,
                kataSandi: password
            };

            // Simpan ke LocalStorage
            localStorage.setItem("dataPengguna", JSON.stringify(dataPengguna));

            // Pesan Berhasil
            pesan.textContent = "Registrasi berhasil! Silakan login.";
            pesan.className = "pesan-notifikasi sukses";

            // Pindah ke Halaman Login
            setTimeout(function () {
                window.location.href = "login.html";
            }, 1000);
        });
    }

});