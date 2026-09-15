document.addEventListener('DOMContentLoaded', function () {

    // 1. Smooth Scroll untuk Link Navigasi Fitur
    const tautanFitur = document.querySelector('a[href="#fitur"]');
    if (tautanFitur) {
        tautanFitur.addEventListener('click', function (kejadian) {
            kejadian.preventDefault();
            const elemenTujuan = document.querySelector('#fitur');
            if (elemenTujuan) {
                elemenTujuan.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // 2. Mengubah Tampilan Header saat Di-scroll
    const elemenHeader = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            elemenHeader.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.2)';
        } else {
            elemenHeader.style.boxShadow = '0 4px 25px rgba(99, 102, 241, 0.1)';
        }
    });

    // 3. Animasi Sederhana pada Kartu Belajar saat Hover
    const daftarKartu = document.querySelectorAll('.kartu-belajar');
    daftarKartu.forEach(function (kartu) {
        kartu.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });
        kartu.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

});