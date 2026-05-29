// ==================== INITIAL DATA ====================
function initData() {
    if (!localStorage.getItem('cbt_data')) {
        const defaultData = {
            admin: [
                { id: 1, username: 'admin', password: btoa('admin123'), nama_lengkap: 'Administrator Utama', is_utama: true, created_at: '2026-05-20' },
                { id: 2, username: 'ndr', password: btoa('admin123'), nama_lengkap: 'Administrator', is_utama: false, created_at: '2026-05-20' },
                { id: 3, username: 'jaka', password: btoa('admin123'), nama_lengkap: 'Administrator', is_utama: false, created_at: '2026-05-20' }
            ],
            guru: [
                { id: 1, nip: '198001012010011001', username: 'ahmad_fauzi', password: btoa('guru123'), nama_lengkap: 'Ahmad Fauzi, S.Pd', created_at: '2026-05-20' },
                { id: 2, nip: '198502122010012002', username: 'siti_aminah', password: btoa('guru123'), nama_lengkap: 'Siti Aminah, S.Pd', created_at: '2026-05-20' },
                { id: 3, nip: '199003152010013003', username: 'budi_santoso', password: btoa('guru123'), nama_lengkap: 'Budi Santoso, S.Pd.I', created_at: '2026-05-20' }
            ],
            kelas: [
                { id: 1, nama_kelas: '7A' }, { id: 2, nama_kelas: '7B' }, { id: 3, nama_kelas: '7C' },
                { id: 4, nama_kelas: '8A' }, { id: 5, nama_kelas: '8B' }, { id: 6, nama_kelas: '8C' },
                { id: 7, nama_kelas: '9A' }, { id: 8, nama_kelas: '9B' }, { id: 9, nama_kelas: '9C' },
                { id: 10, nama_kelas: '12' }
            ],
            mata_pelajaran: [
                { id: 1, nama_mapel: 'Matematika' }, { id: 2, nama_mapel: 'Bahasa Indonesia' },
                { id: 3, nama_mapel: 'IPA' }, { id: 4, nama_mapel: 'Bahasa Inggris' },
                { id: 5, nama_mapel: 'IPS' }, { id: 6, nama_mapel: 'Pendidikan Agama Islam' }
            ],
            siswa: [
                { id: 1, nis: '006', username: 'fahmi_ramadhan', password: btoa('siswa123'), nama_lengkap: 'Fahmi Ramadhan', id_kelas: 9, created_at: '2026-05-20' },
                { id: 2, nis: '005', username: 'eka_prasetya', password: btoa('siswa123'), nama_lengkap: 'Eka Prasetya', id_kelas: 9, created_at: '2026-05-20' },
                { id: 3, nis: '004', username: 'dodi_saputra', password: btoa('siswa123'), nama_lengkap: 'Dodi Saputra', id_kelas: 8, created_at: '2026-05-20' },
                { id: 4, nis: '003', username: 'citra_anggraini', password: btoa('siswa123'), nama_lengkap: 'Citra Dewi Anggraini', id_kelas: 8, created_at: '2026-05-20' },
                { id: 5, nis: '002', username: 'bunga_lestari', password: btoa('siswa123'), nama_lengkap: 'Bunga Citra Lestari', id_kelas: 7, created_at: '2026-05-20' },
                { id: 6, nis: '001', username: 'andi_wijaya', password: btoa('siswa123'), nama_lengkap: 'Andi Wijaya', id_kelas: 7, created_at: '2026-05-20' },
                { id: 7, nis: '1', username: 'indra_sukamto', password: btoa('siswa123'), nama_lengkap: 'Indra Sukamto', id_kelas: 10, created_at: '2026-05-20' }
            ],
            ujian: [
                { id: 1, nama_ujian: 'UTS Matematika Ganjil', id_mapel: 1, tanggal_mulai: '2025-03-10T08:00', tanggal_akhir: '2025-03-10T09:30', durasi_menit: 90, status: 'nonaktif' },
                { id: 2, nama_ujian: 'UAS Matematika Genap', id_mapel: 1, tanggal_mulai: '2025-06-05T08:00', tanggal_akhir: '2025-06-05T10:00', durasi_menit: 120, status: 'nonaktif' },
                { id: 3, nama_ujian: 'UTS Bahasa Indonesia', id_mapel: 2, tanggal_mulai: '2025-03-12T08:00', tanggal_akhir: '2025-03-12T09:30', durasi_menit: 90, status: 'nonaktif' },
                { id: 4, nama_ujian: 'UAS Bahasa Indonesia', id_mapel: 2, tanggal_mulai: '2025-06-07T08:00', tanggal_akhir: '2025-06-07T10:00', durasi_menit: 120, status: 'nonaktif' },
                { id: 5, nama_ujian: 'UTS IPA', id_mapel: 3, tanggal_mulai: '2025-03-15T08:00', tanggal_akhir: '2025-03-15T09:30', durasi_menit: 90, status: 'nonaktif' },
                { id: 6, nama_ujian: 'UAS IPA', id_mapel: 3, tanggal_mulai: '2025-06-10T08:00', tanggal_akhir: '2025-06-10T10:00', durasi_menit: 120, status: 'nonaktif' },
                { id: 7, nama_ujian: 'UTS Bahasa Inggris', id_mapel: 4, tanggal_mulai: '2025-03-18T08:00', tanggal_akhir: '2025-03-18T09:30', durasi_menit: 90, status: 'nonaktif' },
                { id: 8, nama_ujian: 'UAS Bahasa Inggris', id_mapel: 4, tanggal_mulai: '2026-05-20T08:00', tanggal_akhir: '2026-05-21T10:00', durasi_menit: 120, status: 'aktif' }
            ],
            soal: [
                { id: 1, id_ujian: 8, jenis_soal: 'benar_salah', pertanyaan: 'Pernyataan: Bahasa Inggris adalah materi yang penting untuk dipelajari.', poin: 1, pilihan_json: null, jawaban_json: 'true' },
                { id: 2, id_ujian: 8, jenis_soal: 'menjodohkan', pertanyaan: 'Jodohkan pernyataan berikut dengan pasangan yang tepat!', poin: 2, pilihan_json: '{"pairs":[{"pernyataan":"1. Hello","pasangan":"A. Selamat pagi"},{"pernyataan":"2. Good morning","pasangan":"B. Halo"}]}', jawaban_json: '{"matches":[{"pernyataan":1,"pasangan":"B"},{"pernyataan":2,"pasangan":"A"}]}' },
                { id: 3, id_ujian: 8, jenis_soal: 'pilihan_ganda', pertanyaan: 'Berdasarkan materi tentang Descriptive Text, manakah pernyataan berikut yang paling tepat?', poin: 1, pilihan_json: '{"A":"Descriptive text menjelaskan tentang langkah-langkah membuat sesuatu","B":"Descriptive text bertujuan untuk menggambarkan suatu objek secara detail","C":"Descriptive text menceritakan kejadian secara kronologis","D":"Descriptive text berisi dialog antar tokoh"}', jawaban_json: 'B' },
                { id: 4, id_ujian: 8, jenis_soal: 'pilihan_ganda_komplek', pertanyaan: 'Pilihlah semua jawaban yang benar tentang Simple Present Tense!', poin: 2, pilihan_json: '{"A":"Digunakan untuk menyatakan kebiasaan","B":"Menggunakan verb-ing","C":"Digunakan untuk fakta umum","D":"Untuk subjek he/she/it, kata kerja ditambah s/es"}', jawaban_json: '["A","C","D"]' },
                { id: 5, id_ujian: 8, jenis_soal: 'essay', pertanyaan: 'Jelaskan secara lengkap tentang penggunaan Simple Past Tense beserta contohnya!', poin: 5, pilihan_json: null, jawaban_json: null }
            ],
            pengawas: [
                { id: 1, id_guru: 1, id_ujian: 1, ditugaskan_pada: '2026-05-20' },
                { id: 2, id_guru: 2, id_ujian: 2, ditugaskan_pada: '2026-05-20' },
                { id: 3, id_guru: 1, id_ujian: 3, ditugaskan_pada: '2026-05-20' },
                { id: 4, id_guru: 3, id_ujian: 4, ditugaskan_pada: '2026-05-20' }
            ],
            nilai_ujian: [
                { id: 1, id_siswa: 4, id_ujian: 5, nilai_total: 94, jumlah_benar: 20, jumlah_salah: 2, selesai_pada: '2026-05-20' },
                { id: 2, id_siswa: 2, id_ujian: 6, nilai_total: 92, jumlah_benar: 25, jumlah_salah: 3, selesai_pada: '2026-05-20' },
                { id: 3, id_siswa: 1, id_ujian: 7, nilai_total: 90, jumlah_benar: 28, jumlah_salah: 2, selesai_pada: '2026-05-20' },
                { id: 4, id_siswa: 4, id_ujian: 7, nilai_total: 89, jumlah_benar: 27, jumlah_salah: 3, selesai_pada: '2026-05-20' },
                { id: 5, id_siswa: 6, id_ujian: 1, nilai_total: 85, jumlah_benar: 22, jumlah_salah: 8, selesai_pada: '2026-05-20' },
                { id: 6, id_siswa: 2, id_ujian: 1, nilai_total: 88, jumlah_benar: 24, jumlah_salah: 6, selesai_pada: '2026-05-20' },
                { id: 7, id_siswa: 5, id_ujian: 4, nilai_total: 82, jumlah_benar: 20, jumlah_salah: 10, selesai_pada: '2026-05-20' },
                { id: 8, id_siswa: 6, id_ujian: 2, nilai_total: 82, jumlah_benar: 21, jumlah_salah: 9, selesai_pada: '2026-05-20' },
                { id: 9, id_siswa: 6, id_ujian: 3, nilai_total: 88, jumlah_benar: 24, jumlah_salah: 6, selesai_pada: '2026-05-20' },
                { id: 10, id_siswa: 5, id_ujian: 3, nilai_total: 84, jumlah_benar: 22, jumlah_salah: 8, selesai_pada: '2026-05-20' },
                { id: 11, id_siswa: 4, id_ujian: 3, nilai_total: 91, jumlah_benar: 26, jumlah_salah: 4, selesai_pada: '2026-05-20' },
                { id: 12, id_siswa: 3, id_ujian: 3, nilai_total: 77, jumlah_benar: 18, jumlah_salah: 12, selesai_pada: '2026-05-20' },
                { id: 13, id_siswa: 2, id_ujian: 3, nilai_total: 86, jumlah_benar: 23, jumlah_salah: 7, selesai_pada: '2026-05-20' },
                { id: 14, id_siswa: 1, id_ujian: 3, nilai_total: 89, jumlah_benar: 25, jumlah_salah: 5, selesai_pada: '2026-05-20' },
                { id: 15, id_siswa: 7, id_ujian: 3, nilai_total: 75, jumlah_benar: 16, jumlah_salah: 14, selesai_pada: '2026-05-20' },
                { id: 16, id_siswa: 6, id_ujian: 5, nilai_total: 90, jumlah_benar: 28, jumlah_salah: 2, selesai_pada: '2026-05-20' },
                { id: 17, id_siswa: 5, id_ujian: 5, nilai_total: 85, jumlah_benar: 22, jumlah_salah: 8, selesai_pada: '2026-05-20' }
            ],
            sesi_ujian: [
                { id: 1, id_siswa: 6, id_ujian: 8, token_akses: 'T4WC', waktu_mulai: new Date().toISOString(), status: 'active' }
            ],
            token_ujian: [
                { id: 1, id_ujian: 8, token: 'T4WC', is_active: true, expires_at: new Date(Date.now() + 86400000).toISOString() }
            ]
        };
        localStorage.setItem('cbt_data', JSON.stringify(defaultData));
    }
}
initData();

// Helper
function getData(table) {
    return JSON.parse(localStorage.getItem('cbt_data'))[table];
}
function saveData(table, newData) {
    const data = JSON.parse(localStorage.getItem('cbt_data'));
    data[table] = newData;
    localStorage.setItem('cbt_data', JSON.stringify(data));
}
function getNextId(table) {
    const items = getData(table);
    return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

// CRUD Admin
function getAdmin() { return getData('admin'); }
function addAdmin(username, password, nama_lengkap) {
    const admins = getAdmin();
    admins.push({ id: getNextId('admin'), username, password: btoa(password), nama_lengkap, is_utama: false, created_at: new Date().toISOString().slice(0,10) });
    saveData('admin', admins);
}
function deleteAdmin(id) {
    let admins = getAdmin();
    if (admins.find(a => a.id === id)?.is_utama) return false;
    admins = admins.filter(a => a.id !== id);
    saveData('admin', admins);
    return true;
}

// CRUD Guru
function getGuru() { return getData('guru'); }
function addGuru(nip, username, password, nama_lengkap) {
    const gurus = getGuru();
    gurus.push({ id: getNextId('guru'), nip, username, password: btoa(password), nama_lengkap, created_at: new Date().toISOString().slice(0,10) });
    saveData('guru', gurus);
}
function deleteGuru(id) {
    let gurus = getGuru();
    gurus = gurus.filter(g => g.id !== id);
    saveData('guru', gurus);
}

// CRUD Siswa
function getSiswa() { return getData('siswa'); }
function addSiswa(nis, username, password, nama_lengkap, id_kelas) {
    const siswa = getSiswa();
    siswa.push({ id: getNextId('siswa'), nis, username, password: btoa(password), nama_lengkap, id_kelas: parseInt(id_kelas), created_at: new Date().toISOString().slice(0,10) });
    saveData('siswa', siswa);
}
function deleteSiswa(id) {
    let siswa = getSiswa();
    siswa = siswa.filter(s => s.id !== id);
    saveData('siswa', siswa);
}

// CRUD Kelas
function getKelas() { return getData('kelas'); }
function addKelas(nama_kelas) {
    const kelas = getKelas();
    kelas.push({ id: getNextId('kelas'), nama_kelas });
    saveData('kelas', kelas);
}
function deleteKelas(id) {
    let kelas = getKelas();
    kelas = kelas.filter(k => k.id !== id);
    saveData('kelas', kelas);
}

// CRUD Mapel
function getMapel() { return getData('mata_pelajaran'); }
function addMapel(nama_mapel) {
    const mapel = getMapel();
    mapel.push({ id: getNextId('mata_pelajaran'), nama_mapel });
    saveData('mata_pelajaran', mapel);
}
function deleteMapel(id) {
    let mapel = getMapel();
    mapel = mapel.filter(m => m.id !== id);
    saveData('mata_pelajaran', mapel);
}

// CRUD Ujian
function getUjian() { return getData('ujian'); }
function addUjian(nama_ujian, id_mapel, tanggal_mulai, tanggal_akhir, durasi_menit, status) {
    const ujian = getUjian();
    ujian.push({ id: getNextId('ujian'), nama_ujian, id_mapel: parseInt(id_mapel), tanggal_mulai, tanggal_akhir, durasi_menit: parseInt(durasi_menit), status });
    saveData('ujian', ujian);
}
function updateUjian(id, data) {
    let ujian = getUjian();
    const index = ujian.findIndex(u => u.id === id);
    if (index !== -1) { ujian[index] = { ...ujian[index], ...data }; saveData('ujian', ujian); }
}
function deleteUjian(id) {
    let ujian = getUjian();
    ujian = ujian.filter(u => u.id !== id);
    saveData('ujian', ujian);
    let soal = getData('soal');
    soal = soal.filter(s => s.id_ujian !== id);
    saveData('soal', soal);
}

// CRUD Soal
function getSoal(id_ujian = null) {
    const soal = getData('soal');
    return id_ujian ? soal.filter(s => s.id_ujian === id_ujian) : soal;
}
function addSoal(id_ujian, jenis_soal, pertanyaan, poin, pilihan_json, jawaban_json) {
    const soal = getData('soal');
    soal.push({ id: getNextId('soal'), id_ujian: parseInt(id_ujian), jenis_soal, pertanyaan, poin: parseInt(poin), pilihan_json, jawaban_json });
    saveData('soal', soal);
}
function updateSoal(id, data) {
    let soal = getData('soal');
    const index = soal.findIndex(s => s.id === id);
    if (index !== -1) { soal[index] = { ...soal[index], ...data }; saveData('soal', soal); }
}
function deleteSoal(id) {
    let soal = getData('soal');
    soal = soal.filter(s => s.id !== id);
    saveData('soal', soal);
}

// CRUD Pengawas
function getPengawas() { return getData('pengawas'); }
function addPengawas(id_guru, id_ujian) {
    const pengawas = getPengawas();
    pengawas.push({ id: getNextId('pengawas'), id_guru: parseInt(id_guru), id_ujian: parseInt(id_ujian), ditugaskan_pada: new Date().toISOString().slice(0,10) });
    saveData('pengawas', pengawas);
}
function deletePengawas(id) {
    let pengawas = getPengawas();
    pengawas = pengawas.filter(p => p.id !== id);
    saveData('pengawas', pengawas);
}

// CRUD Nilai
function getNilai() { return getData('nilai_ujian'); }

// Helper untuk tampilan
function getNamaKelasById(id_kelas) {
    const k = getKelas().find(k => k.id === id_kelas);
    return k ? k.nama_kelas : '-';
}
function getNamaMapelById(id_mapel) {
    const m = getMapel().find(m => m.id === id_mapel);
    return m ? m.nama_mapel : '-';
}
function getNamaSiswaById(id_siswa) {
    const s = getSiswa().find(s => s.id === id_siswa);
    return s ? s.nama_lengkap : '-';
}
function getNISById(id_siswa) {
    const s = getSiswa().find(s => s.id === id_siswa);
    return s ? s.nis : '-';
}
function getNamaUjianById(id_ujian) {
    const u = getUjian().find(u => u.id === id_ujian);
    return u ? u.nama_ujian : '-';
}
function getNamaGuruById(id_guru) {
    const g = getGuru().find(g => g.id === id_guru);
    return g ? g.nama_lengkap : '-';
}
function getNIPById(id_guru) {
    const g = getGuru().find(g => g.id === id_guru);
    return g ? g.nip : '-';
}

// Autentikasi
function loginAdmin(username, password) {
    const admin = getAdmin().find(a => a.username === username && atob(a.password) === password);
    if (admin) {
        sessionStorage.setItem('loggedIn', 'admin');
        sessionStorage.setItem('userId', admin.id);
        sessionStorage.setItem('userName', admin.nama_lengkap);
        return true;
    }
    return false;
}
function loginGuru(username, password) {
    const guru = getGuru().find(g => (g.username === username || g.nip === username) && atob(g.password) === password);
    if (guru) {
        sessionStorage.setItem('loggedIn', 'guru');
        sessionStorage.setItem('userId', guru.id);
        sessionStorage.setItem('userName', guru.nama_lengkap);
        return true;
    }
    return false;
}
function logout() { sessionStorage.clear(); }
function isLoggedIn() { return sessionStorage.getItem('loggedIn') !== null; }
function getCurrentUser() {
    return { role: sessionStorage.getItem('loggedIn'), name: sessionStorage.getItem('userName'), id: parseInt(sessionStorage.getItem('userId')) };
}
function redirectIfNotLoggedIn() {
    if (!isLoggedIn()) window.location.href = 'login.html';
}