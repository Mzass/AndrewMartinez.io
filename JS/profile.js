import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

function iniciarModelo3D(containerId, modelPath) {
  const container = document.getElementById(containerId);
  if (!container) return console.warn(`❌ Contenedor "${containerId}" no encontrado.`);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.01, 100);
  camera.position.set(0, 0, 1.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  scene.background = null;

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(1, 1, 1);
  scene.add(light);

  const loader = new GLTFLoader();
  let modelo = null;

  loader.load(modelPath, (gltf) => {
    modelo = gltf.scene;

    // 🔧 Centrado visual ajustado:
    modelo.position.set(0, -0.03, 0); // ← ajusta verticalmente si aún parece alto o bajo
    modelo.scale.set(0.7, 0.7, 0.7); // ← un poco menor para evitar recorte
    modelo.rotation.set(0, 0, 0);

    // Centrar geometría automáticamente (opcional, depende de cómo exportaste)
    const box = new THREE.Box3().setFromObject(modelo);
    const center = new THREE.Vector3();
    box.getCenter(center);
    modelo.position.sub(center); // mover al centro da cena

    scene.add(modelo);
  }, undefined, (err) => {
    console.error(`❌ Error al cargar el modelo "${modelPath}":`, err);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (modelo) modelo.rotation.y += 0.008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// 👇 Inicializamos los dos modelos correctamente
iniciarModelo3D('contenedor-3d-github', './models/github.glb');
iniciarModelo3D('contenedor-3d-linkedin', './models/linkedin.glb');





document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".theme-toggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Alterna el ícone da lua / sol (opcional)
    const icon = toggleBtn.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
});


// Script extra para guardar foto y mantenerla seleccionada tras recarga (opcional con localStorage)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-gallery");
  const gallery = document.querySelector(".photo-gallery");
  const mainPhoto = document.getElementById("main-photo");
  const photoOptions = document.querySelectorAll(".gallery-photo");
  const saveBtn = document.querySelector(".save-photo-btn");

  // Cargar foto guardada si existe
  const savedPhoto = localStorage.getItem("selectedPhoto");
  if (savedPhoto) {
    mainPhoto.setAttribute("src", savedPhoto);
  }

  toggleBtn.addEventListener("click", () => {
    gallery.classList.toggle("hidden");
  });

  photoOptions.forEach(photo => {
    photo.addEventListener("click", () => {
      const newSrc = photo.getAttribute("src");
      mainPhoto.setAttribute("src", newSrc);
    });
  });

  saveBtn.addEventListener("click", () => {
    const selectedPhoto = mainPhoto.getAttribute("src");
    localStorage.setItem("selectedPhoto", selectedPhoto);
    alert(`✅Guardado correctamente.`);
    location.reload();
  });
});