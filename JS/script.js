document.addEventListener('DOMContentLoaded', function () {
  // 📄 Botón para descargar CV
  document.querySelector('.download-cv')?.addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = 'CV_AndrewMartinez.pdf'; // ← Ajusta según tu archivo real
    link.download = 'CV_AndrewMartinez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // 🖼️ Cargar imagen seleccionada del perfil (si existe)
  const savedPhoto = localStorage.getItem("selectedPhoto");
  const indexPhoto = document.getElementById("index-main-photo");
  if (savedPhoto && indexPhoto) {
    indexPhoto.src = savedPhoto;
  }
});
