const form = document.getElementById("registrationForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const konfirmasi = document.getElementById("konfirmasi");
const ekskul = document.getElementById("ekskul");


/* ==================================================
   VALIDASI FORM
================================================== */

function validasiNama() {

    if (nama.value.trim() === "") {

        nama.className = "invalid";

        document.getElementById("namaError").textContent =
            "Nama tidak boleh kosong.";

        return false;
    }

    if (nama.value.trim().length < 3) {

        nama.className = "invalid";

        document.getElementById("namaError").textContent =
            "Nama minimal 3 karakter.";

        return false;
    }

    nama.className = "valid";

    document.getElementById("namaError").textContent = "";

    return true;
}


function validasiEmail() {

    const polaEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        email.className = "invalid";

        document.getElementById("emailError").textContent =
            "Email tidak boleh kosong.";

        return false;
    }

    if (!polaEmail.test(email.value)) {

        email.className = "invalid";

        document.getElementById("emailError").textContent =
            "Format email belum benar.";

        return false;
    }

    email.className = "valid";

    document.getElementById("emailError").textContent = "";

    return true;
}


function validasiPassword() {

    if (password.value.length < 8) {

        password.className = "invalid";

        document.getElementById("passwordError").textContent =
            "Password minimal 8 karakter.";

        return false;
    }

    password.className = "valid";

    document.getElementById("passwordError").textContent = "";

    return true;
}


function validasiKonfirmasi() {

    if (konfirmasi.value === "") {

        konfirmasi.className = "invalid";

        document.getElementById("konfirmasiError").textContent =
            "Konfirmasi password harus diisi.";

        return false;
    }

    if (konfirmasi.value !== password.value) {

        konfirmasi.className = "invalid";

        document.getElementById("konfirmasiError").textContent =
            "Password tidak sama.";

        return false;
    }

    konfirmasi.className = "valid";

    document.getElementById("konfirmasiError").textContent = "";

    return true;
}


function validasiEkskul() {

    if (ekskul.value === "") {

        ekskul.className = "invalid";

        document.getElementById("ekskulError").textContent =
            "Silakan pilih ekstrakurikuler.";

        return false;
    }

    ekskul.className = "valid";

    document.getElementById("ekskulError").textContent = "";

    return true;
}


/* REAL-TIME VALIDATION */

nama.addEventListener("input", validasiNama);

email.addEventListener("input", validasiEmail);

password.addEventListener("input", function () {

    validasiPassword();

    if (konfirmasi.value !== "") {
        validasiKonfirmasi();
    }

});

konfirmasi.addEventListener(
    "input",
    validasiKonfirmasi
);

ekskul.addEventListener(
    "change",
    validasiEkskul
);


/* SUBMIT */

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const berhasil =
        validasiNama() &&
        validasiEmail() &&
        validasiPassword() &&
        validasiKonfirmasi() &&
        validasiEkskul();


    const success =
        document.getElementById("successMessage");


    if (berhasil) {

        success.style.display = "block";

        success.innerHTML = `
            🎉 <b>Pendaftaran Berhasil!</b><br>
            Data kamu sudah memenuhi semua ketentuan.
        `;

    } else {

        success.style.display = "none";
    }

});


/* ==================================================
   CHATBOT
================================================== */

const chatToggle =
    document.getElementById("chatToggle");

const chatbot =
    document.getElementById("chatbot");

const chatClose =
    document.getElementById("chatClose");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


/* BUKA CHAT */

chatToggle.addEventListener("click", function() {

    chatbot.classList.toggle("active");

});


/* TUTUP CHAT */

chatClose.addEventListener("click", function() {

    chatbot.classList.remove("active");

});


/* TAMBAH PESAN */

function tambahPesan(text, tipe) {

    const pesan =
        document.createElement("div");

    pesan.className =
        "message " + tipe;

    pesan.innerHTML = text;

    chatMessages.appendChild(pesan);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/*OTAK CHATBOT*/

function jawabanBot(pertanyaan) {

    const q =
        pertanyaan.toLowerCase();


    /* SAPAAN */

    if (
        q.includes("halo") ||
        q.includes("hai") ||
        q.includes("hello") ||
        q.includes("hi")
    ) {

        return `
        Hai juga! 👋😊<br>
        Aku siap membantumu untuk melakukan pendaftaran<br><br>

        Aku bisa membantu kamu tentang:
        <br>• Cara pendaftaran
        <br>• Nama lengkap
        <br>• Email
        <br>• Password
        <br>• Konfirmasi password
        <br>• Pilihan ekstrakurikuler
        <br>• Validasi form
        <br>• Tombol submit
        `;
    }


    /* CARA DAFTAR */

    if (
        q.includes("cara daftar") ||
        q.includes("cara mengisi") ||
        q.includes("cara isi") ||
        q.includes("pendaftaran")
    ) {

        return `
        📝 <b>Cara mendaftar:</b><br><br>

        1️⃣ Isi nama lengkap.<br>
        2️⃣ Masukkan email yang benar.<br>
        3️⃣ Buat password minimal 8 karakter.<br>
        4️⃣ Ulangi password pada konfirmasi.<br>
        5️⃣ Pilih ekstrakurikuler.<br>
        6️⃣ Klik <b>Daftar Sekarang</b>.<br><br>

        Jika semua data benar,
        pendaftaran akan berhasil. 🎉
        `;
    }


    /* NAMA */

    if (
        q.includes("nama") ||
        q.includes("minimal nama")
    ) {

        return `
        👤 <b>Nama Lengkap</b><br><br>

        Nama tidak boleh kosong
        dan harus memiliki minimal
        <b>3 karakter</b>.<br><br>

        Contoh:<br>
        ✅ Mita<br>
        ❌ mi
        `;
    }


    /* EMAIL */

    if (
        q.includes("email") ||
        q.includes("gmail")
    ) {

        return `
        📧 <b>Email</b><br><br>

        Email harus menggunakan
        format email yang benar.<br><br>

        Contoh benar:<br>
        ✅ nama@gmail.com<br><br>

        Contoh salah:<br>
        ❌ nama@gmail
        `;
    }


    /* PASSWORD */

    if (
        q.includes("password") ||
        q.includes("sandi")
    ) {

        return `
        🔐 <b>Password</b><br><br>

        Password harus memiliki
        minimal <b>8 karakter</b>.<br><br>

        Contoh:<br>
        ✅ sekolah123<br>
        ❌ 12345
        `;
    }


    /* KONFIRMASI */

    if (
        q.includes("konfirmasi") ||
        q.includes("tidak sama") ||
        q.includes("beda password")
    ) {

        return `
        🔁 <b>Konfirmasi Password</b><br><br>

        Isi dengan password yang
        <b>sama persis</b> dengan
        password sebelumnya.<br><br>

        Kalau berbeda, kolom akan
        diberi tanda merah. 🔴
        `;
    }


    /* EKSKUL */

    if (
        q.includes("ekskul") ||
        q.includes("ekstrakurikuler")
    ) {

        return `
        🎯 <b>Pilihan Ekstrakurikuler</b><br><br>

        Pilihan yang tersedia:<br>

        • Pramuka<br>
        • Paskibra<br>
        • Osis<br>
        • PMR<br>
        • Rohis<br>
        • Paduan suara<br>
        • Jurnalis<br>
        • Bahasa Jepang<br>
        • Pencak Silat<br>
        • Drumband<br>
        • Rebana<br>
        • Tari<br><br>

        Kamu tinggal memilihnya
        melalui dropdown.
        `;
    }


    /* KENAPA MERAH */

    if (
        q.includes("merah") ||
        q.includes("error") ||
        q.includes("salah")
    ) {

        return `
        🔴 <b>Kenapa kolom berwarna merah?</b><br><br>

        Warna merah berarti
        input kamu masih salah
        atau belum memenuhi ketentuan.<br><br>

        Coba periksa pesan kecil
        di bawah kolom tersebut.
        `;
    }


    /* WARNA HIJAU */

    if (
        q.includes("hijau") ||
        q.includes("benar") ||
        q.includes("valid")
    ) {

        return `
        🟢 <b>Warna hijau</b> berarti
        data pada kolom tersebut
        sudah benar dan memenuhi
        ketentuan.
        `;
    }


    /* SUBMIT */

    if (
        q.includes("submit") ||
        q.includes("tombol") ||
        q.includes("berhasil")
    ) {

        return `
        🚀 <b>Tombol Daftar Sekarang</b><br><br>

        Setelah semua kolom benar,
        klik tombol tersebut.<br><br>

        Jika semua valid,
        akan muncul pesan
        <b>"Pendaftaran Berhasil!"</b> 🎉
        `;
    }


    /* REFRESH */

    if (
        q.includes("refresh") ||
        q.includes("reload")
    ) {

        return `
        🔄 Tenang, form ini menggunakan
        <b>event.preventDefault()</b>.<br><br>

        Jadi halaman tidak akan
        melakukan refresh ketika
        tombol submit ditekan.
        `;
    }


    /* JAVASCRIPT */

    if (
        q.includes("javascript") ||
        q.includes("js")
    ) {

        return `
        💻 JavaScript digunakan untuk
        membuat form menjadi interaktif.<br><br>

        JavaScript mengecek:
        <br>• Nama
        <br>• Email
        <br>• Password
        <br>• Konfirmasi password
        <br>• Pilihan ekskul
        `;
    }


    /* CSS */

    if (
        q.includes("css") ||
        q.includes("tampilan") ||
        q.includes("warna")
    ) {

        return `
        🎨 CSS digunakan untuk mengatur
        tampilan website seperti warna,
        ukuran, jarak, tombol,
        card, dan tampilan responsive.
        `;
    }


    /* HTML */

    if (q.includes("html")) {

        return `
        🌐 HTML digunakan untuk membuat
        struktur halaman, seperti input,
        dropdown, tombol, form,
        dan chatbot.
        `;
    }


    /* TERIMA KASIH */

    if (
        q.includes("terima kasih") ||
        q.includes("makasih") ||
        q.includes("thanks")
    ) {

        return `
        Sama-sama! 😄✨<br>
        Semoga pendaftarannya lancar!
        `;
    }


    /* BYE */

    if (
        q.includes("bye") ||
        q.includes("dadah")
    ) {

        return `
        Dadah! 👋😊<br>
        Jangan lupa lengkapi semua
        data sebelum submit ya!
        `;
    }

    /* DEFAULT */

    return `
    Hmm, aku belum menemukan
    jawabannya 😅<br><br>

    Coba tanyakan salah satu ini:

    <br>💡 <b>cara daftar</b>
    <br>👤 <b>nama</b>
    <br>📧 <b>email</b>
    <br>🔐 <b>password</b>
    <br>🔁 <b>konfirmasi password</b>
    <br>🎯 <b>ekskul</b>
    <br>🔴 <b>kenapa merah</b>
    <br>🟢 <b>warna hijau</b>
    <br>🚀 <b>submit</b>
    <br>💻 <b>JavaScript</b>
    `;
}


/*KIRIM CHAT*/

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const pertanyaan =
        chatInput.value.trim();


    if (pertanyaan === "") {
        return;
    }


    tambahPesan(
        pertanyaan,
        "user"
    );


    chatInput.value = "";


    setTimeout(function() {

        tambahPesan(
            jawabanBot(pertanyaan),
            "bot"
        );

    }, 350);

});


/* TOMBOL PERTANYAAN CEPAT*/

document
.querySelectorAll(".quick-buttons button")
.forEach(function(button) {

    button.addEventListener("click", function() {

        const pertanyaan =
            button.dataset.question;


        tambahPesan(
            pertanyaan,
            "user"
        );


        setTimeout(function() {

            tambahPesan(
                jawabanBot(pertanyaan),
                "bot"
            );

        }, 300);

    });

});