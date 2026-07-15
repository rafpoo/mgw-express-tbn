export const business = {
  name: "Maigeiwo Express Tabanan",
  shortName: "Maigeiwo Express",
  description:
    "Layanan pengiriman barang dari Tabanan, Bali ke luar negeri dengan konsultasi dan pendampingan persiapan paket.",
  phoneDisplay: "0812-3987-234",
  phoneInternational: "628123987234",
  whatsappUrl: "https://wa.me/628123987234",
  address:
    "Jl. Pondok Indah No.17X, Dauh Peken, Kec. Tabanan, Kabupaten Tabanan, Bali 82121",
  mapsUrl: "https://maps.app.goo.gl/cpr872gw23HBVARV6",
  instagramUrl: "https://www.instagram.com/maigeiwo.tabanan/",
  instagramHandle: "@maigeiwo.tabanan",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://maigeiwo-tabanan.example.com",
  hours: [
    { day: "Senin", hours: "08.00–17.00 WITA", open: true },
    { day: "Selasa", hours: "08.00–17.00 WITA", open: true },
    { day: "Rabu", hours: "08.00–17.00 WITA", open: true },
    { day: "Kamis", hours: "08.00–17.00 WITA", open: true },
    { day: "Jumat", hours: "08.00–17.00 WITA", open: true },
    { day: "Sabtu", hours: "08.00–17.00 WITA", open: true },
    { day: "Minggu", hours: "Tutup", open: false },
  ],
} as const;

export const services = [
  {
    icon: "package",
    title: "Paket ke luar negeri",
    description:
      "Pengiriman kebutuhan pribadi maupun usaha dari Bali ke berbagai tujuan internasional.",
  },
  {
    icon: "document",
    title: "Pengiriman dokumen",
    description:
      "Konsultasikan jenis dokumen, negara tujuan, dan kebutuhan pengirimannya bersama admin.",
  },
  {
    icon: "store",
    title: "Produk UMKM",
    description:
      "Dukungan persiapan kiriman produk lokal seperti garment, aksesori, dan produk kering.",
  },
  {
    icon: "chat",
    title: "Konsultasi pengiriman",
    description:
      "Cek kelayakan barang, kebutuhan dokumen, dan estimasi biaya sebelum mengirim.",
  },
  {
    icon: "shield",
    title: "Packing & pengecekan",
    description:
      "Bantuan persiapan packing dan pengecekan awal sesuai jenis barang yang dikirim.",
  },
] as const;

export const itemCategories = [
  "Dokumen",
  "Snack kering",
  "Skincare",
  "Garment",
  "Barang elektronik",
  "Vitamin",
  "Aksesori",
  "Sparepart",
] as const;

export const faqs = [
  {
    question: "Barang apa saja yang dapat dikirim ke luar negeri?",
    answer:
      "Materi layanan Maigeiwo mencantumkan dokumen, snack kering, skincare, garment, barang elektronik, vitamin, aksesori, dan sparepart. Namun penerimaan tetap bergantung pada detail barang serta aturan negara tujuan. Konfirmasikan foto, komposisi, dan detail barang kepada admin terlebih dahulu.",
  },
  {
    question: "Bagaimana cara mengetahui ongkir?",
    answer:
      "Isi form estimasi di website atau hubungi admin melalui WhatsApp. Ongkir dihitung berdasarkan negara tujuan, jenis barang, berat, dimensi, dan ketentuan pengiriman yang berlaku.",
  },
  {
    question: "Informasi apa yang dibutuhkan untuk mengecek ongkir?",
    answer:
      "Siapkan negara dan kota tujuan, jenis barang, perkiraan berat, ukuran paket, serta foto atau rincian barang. Informasi yang lengkap membantu admin memberikan estimasi yang lebih sesuai.",
  },
  {
    question: "Apakah semua jenis barang dapat dikirim?",
    answer:
      "Tidak selalu. Setiap negara memiliki aturan, batasan, dan dokumen yang berbeda. Jangan mengirim barang sebelum admin mengonfirmasi bahwa barang dapat diproses.",
  },
  {
    question: "Bagaimana cara menyiapkan paket?",
    answer:
      "Pisahkan barang berdasarkan jenisnya, siapkan detail isi dan nilai barang, lalu konsultasikan metode packing kepada admin. Hindari menutup permanen paket sebelum pengecekan bila admin meminta pemeriksaan isi.",
  },
  {
    question: "Di mana lokasi Maigeiwo Express Tabanan?",
    answer:
      "Drop point berada di Jl. Pondok Indah No.17X, Dauh Peken, Kecamatan Tabanan, Kabupaten Tabanan, Bali 82121. Gunakan tombol Google Maps di bagian Kontak untuk navigasi.",
  },
] as const;
