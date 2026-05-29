-- ======================================================
-- DATABASE: cbt_system
-- Sistem CBT (Computer Based Test) Sekolah
-- Versi: 2.0 (Sesuai dengan struktur localStorage pada aplikasi frontend)
-- ======================================================
-- Catatan: File ini untuk dokumentasi dan migrasi ke database sungguhan.
-- Aplikasi saat ini menggunakan localStorage, tetapi skema ini dapat
-- diimplementasikan ke MySQL/MariaDB untuk backend nyata.
-- ======================================================

-- Hapus database jika ada (berhati-hati, hanya untuk development)
-- DROP DATABASE IF EXISTS cbt_system;
CREATE DATABASE IF NOT EXISTS cbt_system
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cbt_system;

-- ======================================================
-- 1. TABEL ADMIN
-- ======================================================
CREATE TABLE admin (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'Hash password (biasanya bcrypt)',
    nama_lengkap VARCHAR(100) NOT NULL,
    is_utama BOOLEAN DEFAULT FALSE,
    created_at DATE DEFAULT (CURRENT_DATE)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ======================================================
-- 2. TABEL GURU
-- ======================================================
CREATE TABLE guru (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nip VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    created_at DATE DEFAULT (CURRENT_DATE)
) ENGINE=InnoDB;

-- ======================================================
-- 3. TABEL KELAS
-- ======================================================
CREATE TABLE kelas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(10) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ======================================================
-- 4. TABEL MATA PELAJARAN
-- ======================================================
CREATE TABLE mata_pelajaran (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_mapel VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ======================================================
-- 5. TABEL SISWA
-- ======================================================
CREATE TABLE siswa (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nis VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    id_kelas INT UNSIGNED NOT NULL,
    created_at DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_kelas) REFERENCES kelas(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ======================================================
-- 6. TABEL UJIAN
-- ======================================================
CREATE TABLE ujian (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_ujian VARCHAR(200) NOT NULL,
    id_mapel INT UNSIGNED NOT NULL,
    tanggal_mulai DATETIME NOT NULL,
    tanggal_akhir DATETIME NOT NULL,
    durasi_menit INT UNSIGNED NOT NULL,
    status ENUM('aktif', 'nonaktif') DEFAULT 'nonaktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mapel) REFERENCES mata_pelajaran(id) ON DELETE RESTRICT,
    CHECK (tanggal_akhir > tanggal_mulai)
) ENGINE=InnoDB;

-- ======================================================
-- 7. TABEL SOAL (mendukung 5 jenis soal dengan JSON)
-- ======================================================
CREATE TABLE soal (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ujian INT UNSIGNED NOT NULL,
    jenis_soal ENUM('pilihan_ganda', 'pilihan_ganda_komplek', 'menjodohkan', 'essay', 'benar_salah') NOT NULL,
    pertanyaan TEXT NOT NULL,
    poin INT UNSIGNED NOT NULL DEFAULT 1,
    pilihan_json JSON NULL COMMENT 'JSON berisi pilihan (untuk PG, menjodohkan, dll)',
    jawaban_json JSON NOT NULL COMMENT 'JSON berisi jawaban benar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ujian) REFERENCES ujian(id) ON DELETE CASCADE,
    INDEX idx_ujian (id_ujian)
) ENGINE=InnoDB;

-- ======================================================
-- 8. TABEL PENGAWAS (penugasan guru mengawasi ujian)
-- ======================================================
CREATE TABLE pengawas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_guru INT UNSIGNED NOT NULL,
    id_ujian INT UNSIGNED NOT NULL,
    ditugaskan_pada DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_guru) REFERENCES guru(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ujian) REFERENCES ujian(id) ON DELETE CASCADE,
    UNIQUE KEY unique_pengawas (id_guru, id_ujian)
) ENGINE=InnoDB;

-- ======================================================
-- 9. TABEL TOKEN UJIAN
-- ======================================================
CREATE TABLE token_ujian (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ujian INT UNSIGNED NOT NULL,
    token VARCHAR(10) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NULL,
    FOREIGN KEY (id_ujian) REFERENCES ujian(id) ON DELETE CASCADE,
    INDEX idx_token_active (token, is_active)
) ENGINE=InnoDB;

-- ======================================================
-- 10. TABEL NILAI UJIAN (ringkasan per siswa per ujian)
-- ======================================================
CREATE TABLE nilai_ujian (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_siswa INT UNSIGNED NOT NULL,
    id_ujian INT UNSIGNED NOT NULL,
    nilai_total DECIMAL(5,2) NOT NULL,
    jumlah_benar INT UNSIGNED DEFAULT 0,
    jumlah_salah INT UNSIGNED DEFAULT 0,
    jumlah_esai INT UNSIGNED DEFAULT 0,
    selesai_pada DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ujian) REFERENCES ujian(id) ON DELETE CASCADE,
    UNIQUE KEY unique_siswa_ujian (id_siswa, id_ujian)
) ENGINE=InnoDB;

-- ======================================================
-- 11. TABEL SESI UJIAN SISWA (untuk monitoring)
-- ======================================================
CREATE TABLE sesi_ujian_siswa (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_siswa INT UNSIGNED NOT NULL,
    id_ujian INT UNSIGNED NOT NULL,
    token_akses VARCHAR(10) NOT NULL,
    waktu_mulai DATETIME NOT NULL,
    waktu_terakhir_aktivitas DATETIME NOT NULL,
    status ENUM('active', 'paused', 'finished') DEFAULT 'active',
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    FOREIGN KEY (id_siswa) REFERENCES siswa(id) ON DELETE CASCADE,
    FOREIGN KEY (id_ujian) REFERENCES ujian(id) ON DELETE CASCADE,
    INDEX idx_siswa_ujian (id_siswa, id_ujian, status)
) ENGINE=InnoDB;

-- ======================================================
-- DATA AWAL (Sesuai dengan default data di cbt.js)
-- Password menggunakan plain-text dalam contoh ini karena untuk demo.
-- Pada implementasi nyata, gunakan hash seperti bcrypt.
-- ======================================================

-- Admin
INSERT INTO admin (username, password, nama_lengkap, is_utama) VALUES
('admin', 'admin123', 'Administrator Utama', TRUE),
('ndr',   'admin123', 'Administrator', FALSE),
('jaka',  'admin123', 'Administrator', FALSE);

-- Guru
INSERT INTO guru (nip, username, password, nama_lengkap) VALUES
('198001012010011001', 'ahmad_fauzi', 'guru123', 'Ahmad Fauzi, S.Pd'),
('198502122010012002', 'siti_aminah', 'guru123', 'Siti Aminah, S.Pd'),
('199003152010013003', 'budi_santoso', 'guru123', 'Budi Santoso, S.Pd.I');

-- Kelas
INSERT INTO kelas (nama_kelas) VALUES 
('7A'),('7B'),('7C'),('8A'),('8B'),('8C'),('9A'),('9B'),('9C'),('12');

-- Mata Pelajaran
INSERT INTO mata_pelajaran (nama_mapel) VALUES
('Matematika'), ('Bahasa Indonesia'), ('IPA'), ('Bahasa Inggris'), ('IPS'), ('Pendidikan Agama Islam');

-- Siswa
INSERT INTO siswa (nis, username, password, nama_lengkap, id_kelas) VALUES
('006', 'fahmi_ramadhan', 'siswa123', 'Fahmi Ramadhan',       (SELECT id FROM kelas WHERE nama_kelas='9C')),
('005', 'eka_prasetya',   'siswa123', 'Eka Prasetya',         (SELECT id FROM kelas WHERE nama_kelas='9C')),
('004', 'dodi_saputra',   'siswa123', 'Dodi Saputra',         (SELECT id FROM kelas WHERE nama_kelas='9B')),
('003', 'citra_anggraini','siswa123', 'Citra Dewi Anggraini', (SELECT id FROM kelas WHERE nama_kelas='9B')),
('002', 'bunga_lestari',  'siswa123', 'Bunga Citra Lestari',  (SELECT id FROM kelas WHERE nama_kelas='9A')),
('001', 'andi_wijaya',    'siswa123', 'Andi Wijaya',          (SELECT id FROM kelas WHERE nama_kelas='9A')),
('1',   'indra_sukamto',  'siswa123', 'Indra Sukamto',        (SELECT id FROM kelas WHERE nama_kelas='12'));

-- Ujian
INSERT INTO ujian (nama_ujian, id_mapel, tanggal_mulai, tanggal_akhir, durasi_menit, status) VALUES
('UTS Matematika Ganjil',  (SELECT id FROM mata_pelajaran WHERE nama_mapel='Matematika'),      '2025-03-10 08:00:00', '2025-03-10 09:30:00', 90, 'nonaktif'),
('UAS Matematika Genap',   (SELECT id FROM mata_pelajaran WHERE nama_mapel='Matematika'),      '2025-06-05 08:00:00', '2025-06-05 10:00:00', 120, 'nonaktif'),
('UTS Bahasa Indonesia',   (SELECT id FROM mata_pelajaran WHERE nama_mapel='Bahasa Indonesia'),'2025-03-12 08:00:00', '2025-03-12 09:30:00', 90, 'nonaktif'),
('UAS Bahasa Indonesia',   (SELECT id FROM mata_pelajaran WHERE nama_mapel='Bahasa Indonesia'),'2025-06-07 08:00:00', '2025-06-07 10:00:00', 120, 'nonaktif'),
('UTS IPA',                (SELECT id FROM mata_pelajaran WHERE nama_mapel='IPA'),             '2025-03-15 08:00:00', '2025-03-15 09:30:00', 90, 'nonaktif'),
('UAS IPA',                (SELECT id FROM mata_pelajaran WHERE nama_mapel='IPA'),             '2025-06-10 08:00:00', '2025-06-10 10:00:00', 120, 'nonaktif'),
('UTS Bahasa Inggris',     (SELECT id FROM mata_pelajaran WHERE nama_mapel='Bahasa Inggris'),  '2025-03-18 08:00:00', '2025-03-18 09:30:00', 90, 'nonaktif'),
('UAS Bahasa Inggris',     (SELECT id FROM mata_pelajaran WHERE nama_mapel='Bahasa Inggris'),  '2026-05-20 08:00:00', '2026-05-21 10:00:00', 120, 'aktif');

-- Soal (contoh untuk UAS Bahasa Inggris id=8)
INSERT INTO soal (id_ujian, jenis_soal, pertanyaan, poin, pilihan_json, jawaban_json) VALUES
(8, 'benar_salah', 'Pernyataan: Bahasa Inggris adalah materi yang penting untuk dipelajari.', 1, NULL, 'true'),
(8, 'menjodohkan', 'Jodohkan pernyataan berikut dengan pasangan yang tepat!', 2, 
 '{"pairs":[{"pernyataan":"1. Hello","pasangan":"A. Selamat pagi"},{"pernyataan":"2. Good morning","pasangan":"B. Halo"}]}',
 '{"matches":[{"pernyataan":1,"pasangan":"B"},{"pernyataan":2,"pasangan":"A"}]}'),
(8, 'pilihan_ganda', 'Berdasarkan materi tentang Descriptive Text, manakah pernyataan berikut yang paling tepat?', 1,
 '{"A":"Descriptive text menjelaskan tentang langkah-langkah membuat sesuatu","B":"Descriptive text bertujuan untuk menggambarkan suatu objek secara detail","C":"Descriptive text menceritakan kejadian secara kronologis","D":"Descriptive text berisi dialog antar tokoh"}',
 '"B"'),
(8, 'pilihan_ganda_komplek', 'Pilihlah semua jawaban yang benar tentang Simple Present Tense!', 2,
 '{"A":"Digunakan untuk menyatakan kebiasaan","B":"Menggunakan verb-ing","C":"Digunakan untuk fakta umum","D":"Untuk subjek he/she/it, kata kerja ditambah s/es"}',
 '["A","C","D"]'),
(8, 'essay', 'Jelaskan secara lengkap tentang penggunaan Simple Past Tense beserta contohnya!', 5, NULL, NULL);

-- Pengawas
INSERT INTO pengawas (id_guru, id_ujian, ditugaskan_pada) VALUES
(1, 1, '2026-05-20'),
(2, 2, '2026-05-20'),
(1, 3, '2026-05-20'),
(3, 4, '2026-05-20');

-- Token ujian aktif untuk UAS Bahasa Inggris (id=8)
INSERT INTO token_ujian (id_ujian, token, is_active, expires_at) VALUES
(8, 'T4WC', TRUE, DATE_ADD(NOW(), INTERVAL 1 DAY));

-- Nilai ujian (sesuai data demo)
INSERT INTO nilai_ujian (id_siswa, id_ujian, nilai_total, jumlah_benar, jumlah_salah, selesai_pada) VALUES
((SELECT id FROM siswa WHERE nis='003'), 5, 94, 20, 2, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='005'), 6, 92, 25, 3, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='006'), 7, 90, 28, 2, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='003'), 7, 89, 27, 3, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='001'), 1, 85, 22, 8, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='005'), 1, 88, 24, 6, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='002'), 4, 82, 20, 10, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='001'), 2, 82, 21, 9, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='001'), 3, 88, 24, 6, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='002'), 3, 84, 22, 8, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='003'), 3, 91, 26, 4, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='004'), 3, 77, 18, 12, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='005'), 3, 86, 23, 7, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='006'), 3, 89, 25, 5, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='1'),   3, 75, 16, 14, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='001'), 5, 90, 28, 2, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='002'), 5, 85, 22, 8, '2026-05-20'),
((SELECT id FROM siswa WHERE nis='004'), 1, 74, 15, 15, '2026-05-20');

-- Sesi ujian aktif
INSERT INTO sesi_ujian_siswa (id_siswa, id_ujian, token_akses, waktu_mulai, waktu_terakhir_aktivitas, status, ip_address) VALUES
((SELECT id FROM siswa WHERE nis='001'), 8, 'T4WC', NOW(), NOW(), 'active', '192.168.1.100');

-- Index tambahan untuk performa
CREATE INDEX idx_admin_username ON admin(username);
CREATE INDEX idx_guru_username ON guru(username);
CREATE INDEX idx_siswa_username ON siswa(username);
CREATE INDEX idx_ujian_status ON ujian(status);
CREATE INDEX idx_ujian_tanggal ON ujian(tanggal_mulai, tanggal_akhir);
CREATE INDEX idx_token_aktif ON token_ujian(token, is_active);
CREATE INDEX idx_nilai_siswa ON nilai_ujian(id_siswa);
CREATE INDEX idx_nilai_ujian ON nilai_ujian(id_ujian);

-- ======================================================
-- AKHIR SCRIPT
-- ======================================================
-- Catatan:
-- 1. Password dalam contoh ini menggunakan teks biasa untuk kemudahan demo.
--    Di production, gunakan password hash (misal bcrypt) dan sesuaikan panjang kolom.
-- 2. Database ini dirancang untuk MySQL 5.7+ atau MariaDB 10.2+
-- 3. Untuk integrasi dengan aplikasi frontend yang menggunakan localStorage,
--    file ini hanya sebagai dokumentasi skema.
-- ======================================================