document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ALAMAT FIREBASE
    // ========================================

    const alamatApi =
        "https://api-nisba-default-rtdb.firebaseio.com/.json";


    // ========================================
    // DATA QUIZ
    // ========================================

    let semuaSoal = [];
    let soalLevel = [];
    let soalSekarang = 0;

    let jumlahBenar = 0;
    let jumlahXp = 0;
    let jumlahStreak = 0;
    let jumlahNyawa = 3;

    let levelSekarang = "";
    let sudahMenjawab = false;


    // ========================================
    // ELEMENT HTML
    // ========================================

    const halamanLevel =
        document.getElementById("halamanLevel");

    const halamanPuzzle =
        document.getElementById("halamanPuzzle");

    const halamanHasil =
        document.getElementById("halamanHasil");

    const tombolBeginner =
        document.getElementById("tombolBeginner");

    const tombolIntermediate =
        document.getElementById("tombolIntermediate");

    const tombolAdvanced =
        document.getElementById("tombolAdvanced");

    const nomorPuzzle =
        document.getElementById("nomorPuzzle");

    const tingkatSoal =
        document.getElementById("tingkatSoal");

    const pertanyaan =
        document.getElementById("pertanyaan");

    const pilihan =
        document.getElementById("pilihan");

    const pesan =
        document.getElementById("pesan");

    const tombolBerikutnya =
        document.getElementById("tombolBerikutnya");

    const nyawa =
        document.getElementById("nyawa");

    const streak =
        document.getElementById("streak");

    const xp =
        document.getElementById("xp");

    const progressBar =
        document.getElementById("progressBar");

    const hasilSkor =
        document.getElementById("hasilSkor");

    const hasilBenar =
        document.getElementById("hasilBenar");

    const hasilXP =
        document.getElementById("hasilXP");

    const pesanHasil =
        document.getElementById("pesanHasil");

    const tombolUlangi =
        document.getElementById("tombolUlangi");

    const tombolPilihLevel =
        document.getElementById("tombolPilihLevel");


    // ========================================
    // CEK ELEMENT
    // ========================================

    console.log("================================");
    console.log("QUIZ JS BERJALAN");
    console.log("================================");

    console.log(
        "Beginner:",
        tombolBeginner
    );

    console.log(
        "Intermediate:",
        tombolIntermediate
    );

    console.log(
        "Advanced:",
        tombolAdvanced
    );


    // ========================================
    // CEK APAKAH ELEMENT ADA
    // ========================================

    if (
        !halamanLevel ||
        !halamanPuzzle ||
        !halamanHasil ||
        !tombolBeginner ||
        !tombolIntermediate ||
        !tombolAdvanced ||
        !pilihan
    ) {

        console.error(
            "Ada element HTML yang tidak ditemukan."
        );

        return;
    }


    // ========================================
    // EVENT BEGINNER
    // ========================================

    tombolBeginner.addEventListener(
        "click",
        function () {

            console.log(
                "BEGINNER DIKLIK"
            );

            mulaiQuiz("beginner");
        }
    );


    // ========================================
    // EVENT INTERMEDIATE
    // ========================================

    tombolIntermediate.addEventListener(
        "click",
        function () {

            console.log(
                "INTERMEDIATE DIKLIK"
            );

            mulaiQuiz("intermediate");
        }
    );


    // ========================================
    // EVENT ADVANCED
    // ========================================

    tombolAdvanced.addEventListener(
        "click",
        function () {

            console.log(
                "ADVANCED DIKLIK"
            );

            mulaiQuiz("advanced");
        }
    );


    // ========================================
    // EVENT BERIKUTNYA
    // ========================================

    tombolBerikutnya.addEventListener(
        "click",
        function () {

            soalBerikutnya();
        }
    );


    // ========================================
    // EVENT ULANGI
    // ========================================

    tombolUlangi.addEventListener(
        "click",
        function () {

            mulaiQuiz(levelSekarang);
        }
    );


    // ========================================
    // EVENT PILIH LEVEL
    // ========================================

    tombolPilihLevel.addEventListener(
        "click",
        function () {

            halamanHasil.classList.add(
                "hidden"
            );

            halamanPuzzle.classList.add(
                "hidden"
            );

            halamanLevel.classList.remove(
                "hidden"
            );
        }
    );


    // ========================================
    // AMBIL DATA FIREBASE
    // ========================================

    async function ambilSoal() {

        console.log(
            "Mengambil data Firebase..."
        );


        try {

            const respon =
                await fetch(alamatApi);


            if (!respon.ok) {

                throw new Error(
                    "Firebase tidak bisa diakses."
                );
            }


            const data =
                await respon.json();


            // ====================================
            // UBAH DATA MENJADI ARRAY
            // ====================================

            if (Array.isArray(data)) {

                semuaSoal =
                    data.filter(
                        function (soal) {

                            return soal !== null;
                        }
                    );

            } else {

                semuaSoal =
                    Object.values(data).filter(
                        function (soal) {

                            return soal !== null;
                        }
                    );
            }


            // ====================================
            // CEK JUMLAH DATA
            // ====================================

            console.log(
                "Total soal:",
                semuaSoal.length
            );


            // ====================================
            // CEK LEVEL
            // ====================================

            const beginner =
                semuaSoal.filter(
                    function (soal) {

                        return (
                            String(
                                soal.tingkat
                            )
                            .trim()
                            .toLowerCase()
                            === "beginner"
                        );
                    }
                );


            const intermediate =
                semuaSoal.filter(
                    function (soal) {

                        return (
                            String(
                                soal.tingkat
                            )
                            .trim()
                            .toLowerCase()
                            === "intermediate"
                        );
                    }
                );


            const advanced =
                semuaSoal.filter(
                    function (soal) {

                        return (
                            String(
                                soal.tingkat
                            )
                            .trim()
                            .toLowerCase()
                            === "advanced"
                        );
                    }
                );


            console.log(
                "Jumlah Beginner:",
                beginner.length
            );

            console.log(
                "Jumlah Intermediate:",
                intermediate.length
            );

            console.log(
                "Jumlah Advanced:",
                advanced.length
            );


            // ====================================
            // AKTIFKAN TOMBOL
            // ====================================

            tombolBeginner.disabled =
                false;

            tombolIntermediate.disabled =
                false;

            tombolAdvanced.disabled =
                false;


            console.log(
                "SEMUA TOMBOL SUDAH AKTIF"
            );

        }

        catch (error) {

            console.error(
                "ERROR FIREBASE:",
                error
            );

        }
    }


    // ========================================
    // MULAI QUIZ
    // ========================================

    function mulaiQuiz(level) {

        console.log(
            "Mulai quiz:",
            level
        );


        // ====================================
        // FILTER SOAL SESUAI LEVEL
        // ====================================

        soalLevel =
            semuaSoal.filter(
                function (soal) {

                    return (
                        String(
                            soal.tingkat
                        )
                        .trim()
                        .toLowerCase()
                        === level
                    );
                }
            );


        console.log(
            "Soal untuk level",
            level,
            ":",
            soalLevel.length
        );


        // ====================================
        // JIKA SOAL TIDAK ADA
        // ====================================

        if (soalLevel.length === 0) {

            alert(
                "Tidak ada soal untuk level " +
                level
            );

            return;
        }


        // ====================================
        // MAKSIMAL 10 SOAL
        // ====================================

        soalLevel =
            soalLevel.slice  (0, 30);


        // ====================================
        // RESET QUIZ
        // ====================================

        soalSekarang = 0;

        jumlahBenar = 0;

        jumlahXp = 0;

        jumlahStreak = 0;

        jumlahNyawa = 3;

        levelSekarang = level;

        sudahMenjawab = false;


        // ====================================
        // PINDAH KE HALAMAN QUIZ
        // ====================================

        halamanLevel.classList.add(
            "hidden"
        );

        halamanPuzzle.classList.remove(
            "hidden"
        );

        halamanHasil.classList.add(
            "hidden"
        );


        perbaruiStatus();

        tampilkanSoal();
    }


    // ========================================
    // TAMPILKAN SOAL
    // ========================================

    function tampilkanSoal() {

        const soal =
            soalLevel[soalSekarang];


        if (!soal) {

            tampilkanHasil();

            return;
        }


        sudahMenjawab = false;


        nomorPuzzle.textContent =
            "Quiz " +
            (soalSekarang + 1) +
            " / " +
            soalLevel.length;


        tingkatSoal.textContent =
            String(
                soal.tingkat
            ).toUpperCase();


        pertanyaan.textContent =
            soal.pertanyaan;


        pesan.textContent = "";


        // ====================================
        // HAPUS PILIHAN LAMA
        // TANPA INNERHTML
        // ====================================

        while (pilihan.firstChild) {

            pilihan.removeChild(
                pilihan.firstChild
            );
        }


        // ====================================
        // BUAT PILIHAN
        // ====================================

        soal.pilihan.forEach(
            function (jawaban, index) {

                const tombol =
                    document.createElement(
                        "button"
                    );


                tombol.type =
                    "button";


                tombol.classList.add(
                    "pilihan-tombol"
                );


                const huruf =
                    String.fromCharCode(
                        65 + index
                    );


                tombol.textContent =
                    huruf +
                    ". " +
                    jawaban;


                tombol.addEventListener(
                    "click",
                    function () {

                        cekJawaban(
                            jawaban,
                            soal,
                            tombol
                        );
                    }
                );


                pilihan.appendChild(
                    tombol
                );
            }
        );


        // ====================================
        // PROGRESS BAR
        // ====================================

        const progress =
            (
                (soalSekarang + 1) /
                soalLevel.length
            ) * 100;


        progressBar.style.width =
            progress + "%";
    }


    // ========================================
    // CEK JAWABAN
    // ========================================

    function cekJawaban(
        jawabanDipilih,
        soal,
        tombolDipilih
    ) {

        if (sudahMenjawab) {

            return;
        }


        sudahMenjawab = true;


        const semuaTombol =
            pilihan.querySelectorAll(
                ".pilihan-tombol"
            );


        semuaTombol.forEach(
            function (tombol) {

                tombol.disabled =
                    true;
            }
        );


        const jawabanUser =
            String(
                jawabanDipilih
            )
            .trim()
            .toLowerCase();


        const jawabanBenar =
            String(
                soal.jawaban
            )
            .trim()
            .toLowerCase();


        if (
            jawabanUser ===
            jawabanBenar
        ) {

            tombolDipilih.classList.add(
                "benar"
            );

            jumlahBenar++;

            jumlahStreak++;


            if (
                levelSekarang ===
                "beginner"
            ) {

                jumlahXp += 10;

            } else if (
                levelSekarang ===
                "intermediate"
            ) {

                jumlahXp += 20;

            } else {

                jumlahXp += 30;
            }


            if (
                jumlahStreak >= 3
            ) {

                jumlahXp += 5;
            }


            pesan.textContent =
                "Jawaban benar! 🎉";

        } else {

            tombolDipilih.classList.add(
                "salah"
            );

            jumlahNyawa--;

            jumlahStreak = 0;

            pesan.textContent =
                "Jawaban salah!";


            semuaTombol.forEach(
                function (tombol) {

                    const teks =
                        tombol.textContent
                            .substring(3)
                            .trim()
                            .toLowerCase();


                    if (
                        teks ===
                        jawabanBenar
                    ) {

                        tombol.classList.add(
                            "benar"
                        );
                    }
                }
            );
        }


        perbaruiStatus();


        if (
            jumlahNyawa <= 0
        ) {

            pesan.textContent =
                "Kesempatan habis!";


            setTimeout(
                function () {

                    tampilkanHasil();

                },
                1000
            );


            return;
        }


        tombolBerikutnya.classList.remove(
            "hidden"
        );
    }


    // ========================================
    // SOAL BERIKUTNYA
    // ========================================

    function soalBerikutnya() {

        if (!sudahMenjawab) {

            return;
        }


        soalSekarang++;


        if (
            soalSekarang >=
            soalLevel.length
        ) {

            tampilkanHasil();

            return;
        }


        tampilkanSoal();
    }


    // ========================================
    // UPDATE STATUS
    // ========================================

    function perbaruiStatus() {

        nyawa.textContent =
            "❤️ ".repeat(
                jumlahNyawa
            ).trim();


        streak.textContent =
            jumlahStreak;


        xp.textContent =
            jumlahXp +
            " XP";
    }


    // ========================================
    // HASIL
    // ========================================

    function tampilkanHasil() {

        halamanPuzzle.classList.add(
            "hidden"
        );

        halamanHasil.classList.remove(
            "hidden"
        );


        let skor = 0;


        if (
            soalLevel.length > 0
        ) {

            skor =
                Math.round(
                    (
                        jumlahBenar /
                        soalLevel.length
                    ) * 100
                );
        }


        hasilSkor.textContent =
            skor;


        hasilBenar.textContent =
            jumlahBenar +
            " / " +
            soalLevel.length;


        hasilXP.textContent =
            jumlahXp;


        if (skor >= 80) {

            pesanHasil.textContent =
                "Sangat bagus! Pemahamanmu sangat baik.";

        } else if (skor >= 70) {

            pesanHasil.textContent =
                "Bagus! Terus tingkatkan kemampuanmu.";

        } else if (skor >= 50) {

            pesanHasil.textContent =
                "Cukup baik. Terus berlatih.";

        } else {

            pesanHasil.textContent =
                "Jangan menyerah. Coba lagi.";
        }
    }


    // ========================================
    // AWAL PROGRAM
    // ========================================

    tombolBeginner.disabled = true;

    tombolIntermediate.disabled = true;

    tombolAdvanced.disabled = true;


    ambilSoal();

});