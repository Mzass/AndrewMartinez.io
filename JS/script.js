document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.theme-toggle');
  
    // Alternar entre modo claro/oscuro
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  
      // Alterna ícono de sol/luna
      const icon = toggleBtn.querySelector('i');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    });
  
    // Botón para descargar CV
    document.querySelector('.download-cv').addEventListener('click', function () {
      const link = document.createElement('a');
      link.href = 'CV_AndrewMartinez.pdf'; // Reemplaza con tu fichero real
      link.download = 'CV_AndrewMartinez.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

      // Actualiza la foto del index si hay una guardada
  const savedPhoto = localStorage.getItem("selectedPhoto");
  const indexPhoto = document.getElementById("index-main-photo");
  if (savedPhoto && indexPhoto) {
    indexPhoto.src = savedPhoto;
  }

  });
  

 
