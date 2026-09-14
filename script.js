const form = document.getElementById("formPendaftaran");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nama = document.getElementById("nama");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let konfirmasi = document.getElementById("konfirmasi");
    let ekskul = document.getElementById("ekskul");

    let valid = true;

    document.querySelectorAll("small").forEach(function(x) {
        x.textContent = "";
    });

    document.querySelectorAll("input, select").forEach(function(x) {
        x.classList.remove("valid", "invalid");
    });

    if (nama.value.trim().length < 3) {
        document.getElementById("errorNama").textContent =
            "Nama minimal 3 karakter";
        nama.classList.add("invalid");
        valid = false;
    } else {
        nama.classList.add("valid");
    }

    let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email.value)) {
        document.getElementById("errorEmail").textContent =
            "Format email tidak valid";
        email.classList.add("invalid");
        valid = false;
    } else {
        email.classList.add("valid");
    }

    if (password.value.length < 8) {
        document.getElementById("errorPassword").textContent =
            "Password minimal 8 karakter";
        password.classList.add("invalid");
        valid = false;
    } else {
        password.classList.add("valid");
    }

    if (konfirmasi.value !== password.value || konfirmasi.value === "") {
        document.getElementById("errorKonfirmasi").textContent =
            "Password tidak sama";
        konfirmasi.classList.add("invalid");
        valid = false;
    } else {
        konfirmasi.classList.add("valid");
    }

    if (ekskul.value === "") {
        document.getElementById("errorEkskul").textContent =
            "Silakan pilih ekstrakurikuler";
        ekskul.classList.add("invalid");
        valid = false;
    } else {
        ekskul.classList.add("valid");
    }

    if (valid) {
        document.getElementById("pesan").textContent =
            "✓ Pendaftaran Berhasil!";
    }
});