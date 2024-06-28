export const assessWaterConditions = (ph, turbidity, waveLevel) => {
   let result = {
      phStatus: {},
      turbidityStatus: {},
      waveLevelStatus: {},
      rekomendasi: []
   };

   // Menilai pH
   if (ph >= 6.5 && ph <= 8.5) {
      result.phStatus = {
         keterangan: "pH Ideal",
         deskripsi: "pH air dalam kisaran ini dianggap ideal untuk kehidupan akuatik dan kegiatan manusia.",
         catatan: "Perubahan signifikan dari kisaran ini dapat mempengaruhi keseimbangan ekosistem perairan."
      };
   } else if (ph < 6.5) {
      result.phStatus = {
         keterangan: "pH Rendah",
         deskripsi: "pH rendah dapat mengindikasikan keasaman tinggi dalam air.",
         catatan: "Lingkungan ini mungkin tidak cocok untuk beberapa spesies akuatik sensitif."
      };
   } else if (ph > 8.5) {
      result.phStatus = {
         keterangan: "pH Tinggi",
         deskripsi: "pH tinggi dapat menunjukkan kondisi alkalis dalam air.",
         catatan: "Beberapa spesies akuatik dapat sensitif terhadap perubahan ini."
      };
   }

   // Menilai Turbidity
   if (turbidity >= 0 && turbidity <= 10) {
      result.turbidityStatus = {
         keterangan: "Turbidity Rendah",
         deskripsi: "Air jernih dengan sedikit atau tidak ada partikel tersuspensi.",
         catatan: "Penetrasi cahaya maksimum untuk ekosistem akuatik."
      };
   } else if (turbidity > 10 && turbidity <= 50) {
      result.turbidityStatus = {
         keterangan: "Turbidity Sedang",
         deskripsi: "Air sedang keruh dengan partikel tersuspensi yang sedang.",
         catatan: "Pengaruh moderat terhadap transparansi dan produktivitas ekosistem."
      };
   } else if (turbidity > 50) {
      result.turbidityStatus = {
         keterangan: "Turbidity Tinggi",
         deskripsi: "Air sangat keruh dengan partikel tersuspensi yang tinggi.",
         catatan: "Pengurangan drastis terhadap transparansi dan potensial gangguan terhadap biota akuatik."
      };
   }

   // Menilai WaveLevel
   switch (waveLevel.toLowerCase()) {
      case "permukaan air tenang":
         result.waveLevelStatus = {
            keterangan: "Permukaan Air Tenang",
            deskripsi: "Tidak ada gelombang yang terlihat, permukaan air sangat tenang.",
            catatan: "Kondisi ideal untuk aktivitas seperti snorkeling atau perahu dayung."
         };
         break;
      case "permukaan air stabil":
         result.waveLevelStatus = {
            keterangan: "Permukaan Air Stabil",
            deskripsi: "Arus stabil dengan gelombang kecil atau tidak signifikan.",
            catatan: "Navigasi relatif mudah dengan risiko kecil terhadap pengguna air."
         };
         break;
      case "permukaan air bergelombang":
         result.waveLevelStatus = {
            keterangan: "Permukaan Air Bergelombang",
            deskripsi: "Permukaan air dengan gelombang moderat, tetapi masih dapat dilalui dengan relatif mudah.",
            catatan: "Waspada terhadap gelombang yang mungkin mempengaruhi navigasi."
         };
         break;
      case "gelombang air sangat deras":
         result.waveLevelStatus = {
            keterangan: "Gelombang Air Sangat Deras",
            deskripsi: "Gelombang air sangat besar dan kuat, dapat menciptakan kondisi berbahaya untuk navigasi.",
            catatan: "Diperlukan keterampilan dan peralatan khusus untuk navigasi atau aktivitas di perairan."
         };
         break;
      default:
         result.waveLevelStatus = {
            keterangan: "Kategori Gelombang Tidak Dikenali",
            deskripsi: "Kategori gelombang tidak dikenali.",
            catatan: "Pastikan parameter waveLevel sesuai dengan nilai yang diberikan."
         };
   }

   // Memberikan rekomendasi kondisi air
   if (ph < 6.5) {
      result.rekomendasi.push({
         keterangan: "Bahaya",
         deskripsi: "pH air terlalu rendah, menunjukkan kondisi asam yang berpotensi berbahaya.",
         catatan: "Disarankan untuk tidak menggunakan air ini untuk aktivitas apapun."
      });
   } else if (ph > 8.5) {
      result.rekomendasi.push({
         keterangan: "Bahaya",
         deskripsi: "pH air terlalu tinggi, menunjukkan kondisi alkalis yang berpotensi berbahaya.",
         catatan: "Disarankan untuk tidak menggunakan air ini untuk aktivitas apapun."
      });
   } else {
      result.rekomendasi.push({
         keterangan: "Aman",
         deskripsi: "pH air dalam kisaran ideal.",
         catatan: "Aman digunakan untuk berbagai aktivitas."
      });
   }

   if (turbidity > 50) {
      result.rekomendasi.push({
         keterangan: "Bahaya",
         deskripsi: "Kekeruhan air terlalu tinggi.",
         catatan: "Air ini tidak cocok untuk aktivitas apapun."
      });
   } else if (turbidity > 10) {
      result.rekomendasi.push({
         keterangan: "Waspada",
         deskripsi: "Kekeruhan air sedang.",
         catatan: "Perhatikan kondisi air sebelum melakukan aktivitas."
      });
   } else {
      result.rekomendasi.push({
         keterangan: "Aman",
         deskripsi: "Kekeruhan air rendah.",
         catatan: "Air ini aman digunakan untuk aktivitas."
      });
   }

   switch (waveLevel) {
      case "Permukaan air tenang":
         result.rekomendasi.push({
            keterangan: "Aman",
            deskripsi: "Gelombang air sangat tenang.",
            catatan: "Kondisi ideal untuk aktivitas air."
         });
         break;
      case "Permukaan air stabil":
         result.rekomendasi.push({
            keterangan: "Aman",
            deskripsi: "Gelombang air stabil.",
            catatan: "Aman digunakan untuk aktivitas air."
         });
         break;
      case "Permukaan air bergelombang":
         result.rekomendasi.push({
            keterangan: "Waspada",
            deskripsi: "Gelombang air moderat.",
            catatan: "Perhatikan kondisi gelombang sebelum melakukan aktivitas air."
         });
         break;
      case "Gelombang air sangat deras":
         result.rekomendasi.push({
            keterangan: "Bahaya",
            deskripsi: "Gelombang air sangat deras.",
            catatan: "Diperlukan keterampilan dan peralatan khusus untuk aktivitas air."
         });
         break;
      default:
         result.rekomendasi.push({
            keterangan: "Tidak Dikenal",
            deskripsi: "Kategori gelombang tidak dikenali.",
            catatan: "Pastikan parameter waveLevel sesuai dengan nilai yang diberikan."
         });
   }

   return result;
}