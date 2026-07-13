"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { business, faqs, itemCategories, services } from "./business";
import { Icon, type IconName } from "./icons";

const nav = [
  ["Beranda", "#beranda"], ["Layanan", "#layanan"], ["Cara Kirim", "#cara-kirim"],
  ["Tentang", "#tentang"], ["FAQ", "#faq"], ["Kontak", "#kontak"],
] as const;

const reasons = [
  "Drop point berlokasi di Tabanan",
  "Konsultasi langsung melalui WhatsApp",
  "Pendampingan dari pengecekan hingga persiapan",
  "Informasi kiriman dijelaskan dengan bahasa sederhana",
] as const;

const steps = [
  ["01", "Hubungi admin", "Sampaikan kebutuhan kiriman melalui WhatsApp atau form estimasi."],
  ["02", "Kirim detail paket", "Berikan negara tujuan, jenis barang, berat, dimensi, dan foto barang."],
  ["03", "Terima estimasi", "Admin membantu mengecek kelayakan dan memberikan arahan persiapan."],
  ["04", "Serahkan paket", "Antar paket ke drop point atau ikuti instruksi lanjutan dari admin."],
] as const;

function WaLink({ children, className = "", message }: { children: React.ReactNode; className?: string; message?: string }) {
  const href = message ? `${business.whatsappUrl}?text=${encodeURIComponent(message)}` : business.whatsappUrl;
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function DimensionalCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("20");
  const [height, setHeight] = useState("20");
  const [actualWeight, setActualWeight] = useState("0.9");

  const numericLength = Math.max(0, Number(length) || 0);
  const numericWidth = Math.max(0, Number(width) || 0);
  const numericHeight = Math.max(0, Number(height) || 0);
  const numericActualWeight = Math.max(0, Number(actualWeight) || 0);
  const dimensionalWeight = (numericLength * numericWidth * numericHeight) / 5000;
  const chargeableWeight = Math.max(dimensionalWeight, numericActualWeight);
  const roundedWeight = Math.ceil(chargeableWeight);
  const dimensionIsHigher = dimensionalWeight >= numericActualWeight;

  return (
    <div className="dimension-calculator">
      <div className="dimension-inputs">
        <div className="dimension-field"><label htmlFor="package-length">Panjang <span>cm</span></label><input id="package-length" type="number" min="0" step="0.1" inputMode="decimal" value={length} onChange={(event) => setLength(event.target.value)} /></div>
        <div className="dimension-field"><label htmlFor="package-width">Lebar <span>cm</span></label><input id="package-width" type="number" min="0" step="0.1" inputMode="decimal" value={width} onChange={(event) => setWidth(event.target.value)} /></div>
        <div className="dimension-field"><label htmlFor="package-height">Tinggi <span>cm</span></label><input id="package-height" type="number" min="0" step="0.1" inputMode="decimal" value={height} onChange={(event) => setHeight(event.target.value)} /></div>
        <div className="dimension-field"><label htmlFor="actual-weight">Berat timbangan <span>kg</span></label><input id="actual-weight" type="number" min="0" step="0.1" inputMode="decimal" value={actualWeight} onChange={(event) => setActualWeight(event.target.value)} /></div>
      </div>
      <div className="dimension-result" aria-live="polite">
        <div className="result-formula"><small>Berat dimensi</small><strong>({numericLength || 0} × {numericWidth || 0} × {numericHeight || 0}) ÷ 5000</strong><span>= {dimensionalWeight.toFixed(2)} kg</span></div>
        <div className="result-comparison"><div><span>Berat timbangan</span><strong>{numericActualWeight.toFixed(2)} kg</strong></div><div><span>Berat dimensi</span><strong>{dimensionalWeight.toFixed(2)} kg</strong></div></div>
        <div className="result-final"><span><Icon name="check" /></span><div><small>Perkiraan berat yang digunakan</small><strong>{roundedWeight} kg</strong><p>{dimensionIsHigher ? "Berat dimensi lebih besar" : "Berat timbangan lebih besar"} dan dibulatkan ke atas.</p></div></div>
      </div>
    </div>
  );
}

function EstimateForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Halo Maigeiwo Express Tabanan, saya ingin meminta estimasi pengiriman.", "",
      `Nama: ${data.get("name")}`,
      `Nomor WhatsApp: ${data.get("phone")}`,
      `Negara tujuan: ${data.get("country")}`,
      `Jenis barang: ${data.get("item")}`,
      `Berat perkiraan: ${data.get("weight")} kg`,
      `Dimensi paket: ${data.get("dimensions") || "Belum diketahui"}`,
      `Catatan: ${data.get("notes") || "Tidak ada"}`, "",
      "Mohon dibantu pengecekan dan estimasinya. Terima kasih.",
    ];
    setStatus("loading");
    window.open(`${business.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setStatus("success"), 450);
  }

  return (
    <form className="estimate-form" onSubmit={submit} aria-describedby="form-note">
      <div className="field"><label htmlFor="name">Nama</label><input id="name" name="name" autoComplete="name" required placeholder="Nama lengkap" /></div>
      <div className="field"><label htmlFor="phone">Nomor WhatsApp</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{8,18}" required placeholder="Contoh: 0812 3456 7890" /></div>
      <div className="field"><label htmlFor="country">Negara tujuan</label><input id="country" name="country" required placeholder="Contoh: Singapura" /></div>
      <div className="field"><label htmlFor="item">Jenis barang</label><input id="item" name="item" required placeholder="Contoh: pakaian" /></div>
      <div className="field"><label htmlFor="weight">Berat perkiraan (kg)</label><input id="weight" name="weight" type="number" min="0.1" step="0.1" required placeholder="Contoh: 2.5" /></div>
      <div className="field"><label htmlFor="dimensions">Dimensi paket <span>(opsional)</span></label><input id="dimensions" name="dimensions" placeholder="P × L × T dalam cm" /></div>
      <div className="field field-full"><label htmlFor="notes">Catatan <span>(opsional)</span></label><textarea id="notes" name="notes" rows={4} placeholder="Detail isi, kota tujuan, atau kebutuhan lain" /></div>
      <button className="button button-primary form-submit" type="submit" disabled={status === "loading"}><Icon name="whatsapp" /> {status === "loading" ? "Menyiapkan pesan..." : "Kirim ke WhatsApp"}</button>
      <p id="form-note" className="form-note" aria-live="polite">{status === "success" ? "Pesan siap. Lanjutkan pengiriman di WhatsApp." : "Data tidak disimpan di website; input hanya disusun menjadi pesan WhatsApp."}</p>
    </form>
  );
}

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      <header className="site-header">
        <div className="header-shell">
          <a href="#beranda" className="brand" aria-label="Maigeiwo Express Tabanan, kembali ke beranda">
            <Image src="/images/maigeiwo-logo.jpg" width={352} height={75} alt="Logo Maigeiwo, Bridging You and Indonesia" priority />
          </a>
          <nav className="desktop-nav" aria-label="Navigasi utama">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          <WaLink className="button button-primary header-cta" message="Halo Maigeiwo Express Tabanan, saya ingin bertanya tentang ongkir pengiriman ke luar negeri."><Icon name="whatsapp" /> Tanya Ongkir</WaLink>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Tutup menu" : "Buka menu"}><Icon name={menuOpen ? "x" : "menu"} /></button>
        </div>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navigasi mobile">
          {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<Icon name="chevron" /></a>)}
          <WaLink className="button button-primary" message="Halo Maigeiwo Express Tabanan, saya ingin bertanya tentang ongkir pengiriman ke luar negeri."><Icon name="whatsapp" /> Tanya Ongkir</WaLink>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="beranda">
          <div className="route-grid" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> Drop point pengiriman internasional di Tabanan</div>
              <h1>Kirim paket ke luar negeri <span>dari Tabanan</span> jadi lebih mudah.</h1>
              <p className="hero-lead">Maigeiwo Express Tabanan membantu masyarakat Bali menyiapkan pengiriman internasional dengan proses yang jelas, ramah, dan didampingi sejak awal.</p>
              <div className="hero-actions">
                <WaLink className="button button-primary button-large" message="Halo Maigeiwo Express Tabanan, saya ingin konsultasi pengiriman paket ke luar negeri."><Icon name="whatsapp" /> Konsultasi via WhatsApp</WaLink>
                <a className="button button-secondary button-large" href="#cara-kirim">Lihat cara pengiriman <Icon name="arrow" /></a>
              </div>
              <div className="trust-points" aria-label="Keunggulan layanan">
                {[["chat", "Konsultasi mudah"], ["shield", "Pengecekan barang"], ["globe", "Tujuan internasional"]].map(([icon, label]) => <div key={label}><span><Icon name={icon as IconName} /></span>{label}</div>)}
              </div>
            </div>
            <div className="hero-visual reveal">
              <div className="hero-photo">
                <Image src="/images/kantor-maigeiwo-tabanan.png" alt="Tampak depan kantor Maigeiwo Express Tabanan" fill sizes="(max-width: 900px) 100vw, 48vw" priority className="cover-photo" />
                <div className="photo-shade" />
                <div className="photo-caption"><span><Icon name="map" /></span><div><small>Drop Point Tabanan</small><strong>Dauh Peken, Bali</strong></div></div>
              </div>
              <div className="rate-card"><small>Tarif pada materi layanan</small><strong>Mulai Rp38.000<span>/kg</span></strong><p>*Tergantung tujuan, jenis, dan detail paket.</p></div>
              <div className="plane-chip"><Icon name="plane" /> Bali <span /> Dunia</div>
            </div>
          </div>
          <div className="container hero-foot"><p>Datang langsung atau mulai dari WhatsApp</p><span /><div><Icon name="clock" /><strong>Senin–Sabtu</strong> 08.00–17.00 WITA</div><div><Icon name="phone" /><strong>{business.phoneDisplay}</strong></div></div>
        </section>

        <section className="section services-section" id="layanan">
          <div className="container">
            <div className="section-heading split-heading"><div><div className="eyebrow">Layanan kami</div><h2>Satu tempat untuk menyiapkan kiriman Anda.</h2></div><p>Dari pengecekan awal hingga paket siap diproses, admin membantu Anda memahami langkah yang diperlukan.</p></div>
            <div className="service-grid">{services.map((service, index) => <article className={`service-card ${index === 0 ? "featured" : ""}`} key={service.title}><div className="service-icon"><Icon name={service.icon as IconName} /></div><span className="card-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><WaLink className="text-link" message={`Halo Maigeiwo Express Tabanan, saya ingin bertanya tentang ${service.title.toLowerCase()}.`}>Konsultasikan <Icon name="arrow" /></WaLink></article>)}</div>
            <p className="service-disclaimer"><Icon name="shield" /> Kelayakan pengiriman selalu diperiksa berdasarkan jenis barang dan aturan negara tujuan.</p>
          </div>
        </section>

        <section className="section about-section" id="tentang">
          <div className="container about-grid">
            <div className="about-visual"><div className="about-photo"><Image src="/images/banner-pengiriman-internasional.png" alt="Banner layanan pengiriman internasional Maigeiwo Express Tabanan" fill sizes="(max-width: 900px) 100vw, 44vw" className="cover-photo" /></div><div className="local-card"><Icon name="map" /><div><strong>Berangkat dari Tabanan</strong><span>Melayani kebutuhan pribadi & UMKM Bali</span></div></div></div>
            <div className="about-copy"><div className="eyebrow">Tentang Maigeiwo Tabanan</div><h2>Jembatan sederhana untuk kiriman lintas negara.</h2><p>Maigeiwo Express Tabanan hadir sebagai drop point dan tempat konsultasi bagi masyarakat Tabanan dan Bali yang ingin mengirim barang ke luar negeri. Fokus kami adalah membantu proses terasa lebih mudah dipahami—mulai dari mengecek jenis barang sampai menyiapkan paket.</p><div className="reason-list">{reasons.map((reason) => <div key={reason}><span><Icon name="check" /></span>{reason}</div>)}</div><WaLink className="text-link strong-link" message="Halo Maigeiwo Express Tabanan, saya ingin konsultasi kebutuhan pengiriman saya.">Ceritakan kebutuhan kiriman Anda <Icon name="arrow" /></WaLink></div>
          </div>
        </section>

        <section className="section categories-section"><div className="container categories-grid"><div className="category-copy"><div className="eyebrow light">Contoh kategori barang</div><h2>Apa yang ingin Anda kirim?</h2><p>Kategori berikut tercantum pada materi layanan Maigeiwo. Penerimaan akhir tetap melalui pengecekan admin.</p><WaLink className="button button-light" message="Halo Maigeiwo Express Tabanan, saya ingin mengecek apakah barang saya dapat dikirim ke luar negeri.">Cek barang saya <Icon name="arrow" /></WaLink></div><div className="category-list">{itemCategories.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><Icon name="check" /></div>)}</div></div></section>

        <section className="section process-section" id="cara-kirim"><div className="container"><div className="section-heading centered"><div className="eyebrow">Cara pengiriman</div><h2>Empat langkah, tanpa dibuat rumit.</h2><p>Mulai dengan detail sederhana. Admin akan memberi arahan sesuai kebutuhan kiriman Anda.</p></div><div className="process-grid">{steps.map(([number, title, description], index) => <article className="process-card" key={number}><div className="step-top"><span>{number}</span>{index < steps.length - 1 && <div className="step-line" />}</div><div className="process-icon"><Icon name={(["chat", "box", "document", "truck"] as IconName[])[index]} /></div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="process-cta"><div><Icon name="chat" /><p><strong>Belum yakin harus mulai dari mana?</strong><span>Kirim foto barang dan negara tujuan kepada admin.</span></p></div><WaLink className="button button-primary" message="Halo Maigeiwo Express Tabanan, saya belum yakin cara memulai pengiriman. Mohon dibantu.">Mulai konsultasi <Icon name="arrow" /></WaLink></div></div></section>

        <section className="section dimension-section" id="hitung-dimensi">
          <div className="container">
            <div className="dimension-heading">
              <div>
                <div className="eyebrow">Cara menghitung dimensi paket</div>
                <h2>Ukuran paket juga menentukan berat kiriman.</h2>
              </div>
              <p>Kurir membandingkan berat timbangan dengan berat dimensi. Nilai yang lebih besar digunakan sebagai dasar perhitungan, kemudian dibulatkan ke atas.</p>
            </div>
            <div className="dimension-layout">
              <div className="dimension-guide-card">
                <figure className="dimension-illustration">
                  <Image src="/images/dimensi-paket-maigeiwo.png" alt="Ilustrasi paket berukuran panjang, lebar, dan tinggi masing-masing 20 cm dengan berat 0,9 kg" fill sizes="(max-width: 900px) 100vw, 46vw" />
                </figure>
                <div className="dimension-formula-card">
                  <small>Rumus berat dimensi</small>
                  <div className="dimension-formula"><span>Panjang</span><b>×</b><span>Lebar</span><b>×</b><span>Tinggi</span><b>÷</b><strong>5000</strong></div>
                  <p>Contoh: (20 × 20 × 20) ÷ 5000 = <strong>1,6 kg</strong></p>
                </div>
              </div>
              <div className="calculator-card"><div className="calculator-head"><div><small>Kalkulator berat dimensi</small><strong>Coba ukuran paket Anda</strong></div><Icon name="box" /></div><DimensionalCalculator /></div>
            </div>
            <p className="dimension-disclaimer"><Icon name="shield" /> Kalkulator ini mengikuti pembagi 5000 dari materi Maigeiwo. Hasil akhir dan ketentuan pembulatan tetap dikonfirmasi oleh admin.</p>
          </div>
        </section>

        <section className="section estimate-section" id="estimasi"><div className="container estimate-grid"><div className="estimate-copy"><div className="eyebrow light">Estimasi ongkir</div><h2>Dapatkan arahan awal untuk paket Anda.</h2><p>Lengkapi data berikut. Saat dikirim, detail akan otomatis dirapikan menjadi pesan WhatsApp untuk admin Maigeiwo.</p><div className="estimate-note"><Icon name="shield" /><div><strong>Informasi yang membantu</strong><span>Negara tujuan, jenis barang, berat, dan ukuran paket.</span></div></div><div className="estimate-route" aria-hidden="true"><Icon name="map" /><span /><Icon name="plane" /><span /><Icon name="globe" /></div></div><div className="form-card"><EstimateForm /></div></div></section>

        <section className="section proof-section"><div className="container proof-grid"><div><div className="eyebrow">Kepercayaan dimulai dari kejelasan</div><h2>Datang, konsultasi, lalu kirim dengan lebih tenang.</h2></div><div className="proof-card"><Icon name="map" /><h3>Drop point fisik di Tabanan</h3><p>Kunjungi lokasi bisnis untuk berkonsultasi dan menyerahkan paket secara langsung.</p><a href={business.mapsUrl} target="_blank" rel="noreferrer" className="text-link">Lihat lokasi <Icon name="arrow" /></a></div><div className="proof-card testimonial-placeholder"><Icon name="chat" /><h3>Ulasan pelanggan</h3><p>Ulasan asli akan ditampilkan di sini setelah teks dan nama peninjau dikonfirmasi. Kami tidak menggunakan testimoni rekaan.</p><span>Menunggu ulasan terverifikasi</span></div></div></section>

        <section className="section faq-section" id="faq"><div className="container faq-grid"><div className="faq-intro"><div className="eyebrow">Pertanyaan umum</div><h2>Hal yang sering ditanyakan sebelum mengirim.</h2><p>Masih ada yang ingin dipastikan? Admin siap membantu melalui WhatsApp.</p><WaLink className="button button-secondary" message="Halo Maigeiwo Express Tabanan, saya punya pertanyaan tentang pengiriman ke luar negeri.">Tanya admin <Icon name="arrow" /></WaLink></div><div className="accordion">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{faq.question}</span><span className="summary-icon">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

        <section className="section contact-section" id="kontak"><div className="container contact-shell"><div className="contact-copy"><div className="eyebrow light">Kunjungi kami</div><h2>Drop Point Maigeiwo Express Tabanan</h2><div className="contact-list"><a href={business.mapsUrl} target="_blank" rel="noreferrer"><span><Icon name="map" /></span><div><small>Alamat</small><strong>{business.address}</strong></div></a><WaLink><span><Icon name="phone" /></span><div><small>WhatsApp / Telepon</small><strong>{business.phoneDisplay}</strong></div></WaLink><a href={business.instagramUrl} target="_blank" rel="noreferrer"><span><Icon name="instagram" /></span><div><small>Instagram</small><strong>{business.instagramHandle}</strong></div></a></div><div className="contact-actions"><a href={business.mapsUrl} target="_blank" rel="noreferrer" className="button button-light"><Icon name="map" /> Buka Google Maps</a><WaLink className="button button-outline-light"><Icon name="whatsapp" /> Hubungi WhatsApp</WaLink></div></div><div className="hours-card"><div className="hours-head"><div><small>Jam operasional</small><strong>Waktu Indonesia Tengah</strong></div><Icon name="clock" /></div><div className="hours-list">{business.hours.map((item) => <div key={item.day}><span>{item.day}</span><strong className={item.open ? "" : "closed"}>{item.hours}</strong></div>)}</div><p>Untuk kunjungan dengan paket khusus, sebaiknya konfirmasi terlebih dahulu.</p></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Image src="/images/maigeiwo-logo.jpg" width={352} height={75} alt="Maigeiwo" /><p>Bridging you and Indonesia melalui layanan konsultasi pengiriman internasional dari Tabanan, Bali.</p></div><div><h3>Navigasi</h3>{nav.slice(0, 5).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div><h3>Hubungi</h3><p>{business.address}</p><WaLink>{business.phoneDisplay}</WaLink><a href={business.instagramUrl} target="_blank" rel="noreferrer">{business.instagramHandle}</a></div><div><h3>Jam buka</h3><p>Senin–Sabtu<br /><strong>08.00–17.00 WITA</strong></p><p>Minggu<br /><strong>Tutup</strong></p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Maigeiwo Express Tabanan.</span><span>Jasa pengiriman luar negeri dari Tabanan, Bali.</span></div></footer>

      <WaLink className="floating-wa" message="Halo Maigeiwo Express Tabanan, saya ingin konsultasi pengiriman ke luar negeri."><Icon name="whatsapp" /><span>Tanya Ongkir</span></WaLink>
      <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Kembali ke atas"><Icon name="chevron" /></button>
      <div className="mobile-cta"><WaLink message="Halo Maigeiwo Express Tabanan, saya ingin konsultasi pengiriman ke luar negeri."><Icon name="whatsapp" /> Konsultasi & tanya ongkir</WaLink></div>
    </>
  );
}
