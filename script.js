// ===== Validasi Form =====
const form = document.getElementById('regForm');
const f = {
  nama: document.getElementById('nama'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  konfirmasi: document.getElementById('konfirmasi'),
  ekskul: document.getElementById('ekskul')
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rules = {
  nama: v => v.trim().length >= 3 ? '' : (v.trim() === '' ? 'Nama tidak boleh kosong.' : 'Nama minimal 3 karakter.'),
  email: v => emailRegex.test(v.trim()) ? '' : 'Format email belum benar, contoh: nama@email.com.',
  password: v => v.length >= 8 ? '' : 'Password minimal 8 karakter.',
  konfirmasi: v => v !== '' && v === f.password.value ? '' : 'Konfirmasi harus sama persis dengan password.',
  ekskul: v => v ? '' : 'Pilih satu ekstrakurikuler.'
};
const okText = { nama:'Nama valid.', email:'Email valid.', password:'Password kuat cukup.', konfirmasi:'Password cocok.', ekskul:'Pilihan tersimpan.' };

function validate(name) {
  const input = f[name], wrap = input.closest('.field');
  const err = rules[name](input.value);
  wrap.classList.toggle('error', !!err);
  wrap.classList.toggle('valid', !err);
  wrap.querySelector('.msg').textContent = err || okText[name];
  return !err;
}

Object.keys(f).forEach(n => {
  const ev = n === 'ekskul' ? 'change' : 'input';
  f[n].addEventListener(ev, () => {
    validate(n);
    if (n === 'password') { meter(); if (f.konfirmasi.value) validate('konfirmasi'); }
  });
});

function meter() {
  const v = f.password.value;
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  const bar = document.getElementById('meterBar');
  bar.style.width = (v ? Math.max(s,1) * 25 : 0) + '%';
  bar.style.background = ['#d6303a','#d6303a','#f08c00','#74b816','#12a071'][v ? Math.max(s,1) : 0];
}

document.querySelectorAll('.eye').forEach(b => b.addEventListener('click', () => {
  const i = document.getElementById(b.dataset.target);
  i.type = i.type === 'password' ? 'text' : 'password';
}));

const successBox = document.getElementById('success');
form.addEventListener('submit', e => {
  e.preventDefault(); // cegah reload halaman
  const allValid = Object.keys(f).map(validate).every(Boolean);
  if (allValid) {
    successBox.textContent = `Pendaftaran berhasil! Selamat bergabung di ${f.ekskul.value}, ${f.nama.value.trim().split(' ')[0]}.`;
    successBox.hidden = false;
    alert('Pendaftaran Berhasil!');
    form.reset();
    document.querySelectorAll('.field').forEach(w => { w.classList.remove('valid','error'); w.querySelector('.msg').textContent=''; });
    meter();
    botSay('Selamat, pendaftaranmu berhasil! 🎉');
  } else {
    successBox.hidden = true;
    const first = form.querySelector('.field.error input, .field.error select');
    if (first) first.focus();
  }
});

// ===== Chatbot (rule-based) =====
const box = document.getElementById('chatBox'), log = document.getElementById('chatLog');
const quick = document.getElementById('quick'), input = document.getElementById('chatInput');

const ekskulInfo = {
pramuka: 'Pramuka: kegiatan kepemimpinan, kedisiplinan, kemah, dan keterampilan. Jadwal: Jumat sore.',
paskibra: 'Paskibra: latihan baris-berbaris, kedisiplinan, dan pengibaran bendera. Jadwal: Sabtu pagi.',
osis: 'Osis: belajar berorganisasi, kepemimpinan, dan mengadakan berbagai kegiatan sekolah. Jadwal: Senin.',
pmr: 'PMR: belajar pertolongan pertama, kesehatan, dan kegiatan sosial. Jadwal: Rabu sore.',
rohis: 'Rohis: kegiatan keagamaan, belajar bersama, dan memperdalam ilmu agama. Jadwal: Jumat.',
paduanSuara: 'Paduan Suara: latihan vokal dan bernyanyi bersama untuk berbagai acara sekolah. Jadwal: Kamis.',
jurnalis: 'Jurnalis: belajar menulis berita, fotografi, dan membuat informasi sekolah. Jadwal: Rabu.',
bahasaJepang: 'Bahasa Jepang: belajar bahasa, tulisan, budaya, dan percakapan Jepang. Jadwal: Selasa.',
pencakSilat: 'Pencak Silat: latihan bela diri, ketangkasan, dan kedisiplinan. Jadwal: Selasa & Kamis.',
drumband: 'Drumband: latihan musik, kekompakan, dan penampilan dalam berbagai acara sekolah. Jadwal: Jumat.',
rebana: 'Rebana: belajar memainkan alat musik rebana dan membawakan lagu-lagu islami. Jadwal: Kamis.',
tari: 'Tari: belajar berbagai gerakan dan koreografi tari tradisional maupun modern. Jadwal: Sabtu.'
};

const intents = [
  { k:['halo','hai','hi','selamat'], a:'Halo! Aku bisa bantu soal cara mengisi form dan info ekstrakurikuler.' },
  { k:['nama'], a:'Nama lengkap wajib diisi, minimal 3 karakter.' },
  { k:['email'], a:'Email harus berformat benar, misalnya nama@email.com.' },
  { k:['konfirmasi','sama'], a:'Konfirmasi password harus sama persis dengan kolom password.' },
  { k:['password','sandi','kata sandi'], a:'Password minimal 8 karakter. Tambahkan huruf besar, angka, dan simbol agar indikator kekuatannya penuh.' },
  { k:['daftar','cara','isi','langkah'], a:'Langkahnya:\n1. Isi nama & email\n2. Buat password lalu konfirmasi\n3. Pilih ekstrakurikuler\n4. Klik "Daftar sekarang"\nKolom yang salah akan bergaris merah, yang benar bergaris hijau.' },
  { k:['error','merah','salah','gagal'], a:'Garis merah berarti isian belum sesuai. Baca pesan di bawah kolom, perbaiki, sampai garisnya hijau.' },
  { k:['ekskul','ekstrakurikuler','pilihan','rekomendasi'], a:'Tersedia: Pramuka, Paskibra, Osis, PMR, Rohis, Paduan suara, Jurnalis, Bahasa Jepang, Pencak Silat, Drumband, Rebana, Tari. Ketik salah satu namanya untuk info detail.' },
  { k:['jadwal'], a:'Jadwal berbeda tiap ekskul. Ketik nama ekskul-nya, misalnya "Robotik".' },
  { k:['terima kasih','makasih','thanks'], a:'Sama-sama! Semoga betah di ekskul pilihanmu 😊' }
];

function addBubble(t, who) {
  const d = document.createElement('div');
  d.className = 'bubble ' + who; d.textContent = t;
  log.appendChild(d); log.scrollTop = log.scrollHeight;
}
function botSay(t) { setTimeout(() => addBubble(t, 'bot'), 350); }

function reply(text) {
  const q = text.toLowerCase();
  for (const key in ekskulInfo) {
    if (q.includes(key)) {
      const name = { coding:'Coding Club' }[key] || key[0].toUpperCase() + key.slice(1);
      const opt = [...f.ekskul.options].find(o => o.text.toLowerCase().startsWith(key.slice(0,4)));
      if (opt) { f.ekskul.value = opt.value || opt.text; validate('ekskul'); }
      return ekskulInfo[key] + '\nAku sudah pilihkan di form untukmu.';
    }
  }
  const hit = intents.find(i => i.k.some(w => q.includes(w)));
  return hit ? hit.a : 'Maaf, aku belum paham. Coba tanya soal cara daftar, aturan password, email, atau nama ekskul.';
}

function send(text) {
  if (!text.trim()) return;
  addBubble(text, 'user');
  botSay(reply(text));
}

['Cara daftar','Aturan password','Pilihan ekskul'].forEach(t => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = t;
  b.addEventListener('click', () => send(t.replace('Rekomendasi ','')));
  quick.appendChild(b);
});

document.getElementById('chatForm').addEventListener('submit', e => {
  e.preventDefault(); send(input.value); input.value = '';
});
function toggleChat(open) {
  box.hidden = !open;
  if (open && !log.children.length) addBubble('Halo! Aku asisten pendaftaran. Mau tanya apa?', 'bot');
  if (open) input.focus();
}
document.getElementById('chatToggle').addEventListener('click', () => toggleChat(box.hidden));
document.getElementById('chatClose').addEventListener('click', () => toggleChat(false));