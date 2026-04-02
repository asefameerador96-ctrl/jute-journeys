/* ============================================================
   SHAH AGRO — main.js
   GSAP ScrollTrigger + Three.js 3D process animation
   ============================================================ */

/* ── Loader ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ── Custom Cursor ──────────────────────────────────────────── */
(function initCursor() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animateCursor() {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .product-card, .stage-image-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }
})();

/* ── Navbar ──────────────────────────────────────────────────── */
(function initNavbar() {
  const nav    = document.getElementById('navbar');
  const burger = document.getElementById('nav-burger');
  const mobile = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  if (burger) {
    burger.addEventListener('click', () => mobile && mobile.classList.add('open'));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => mobile && mobile.classList.remove('open'));
  }
  if (mobile) {
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobile.classList.remove('open'));
    });
  }
})();

/* ── Hero Carousel ──────────────────────────────────────────── */
(function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function start() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); start(); });
  });

  slides[0].classList.add('active');
  dots[0] && dots[0].classList.add('active');
  start();
})();

/* ── Hero Mouse Parallax ────────────────────────────────────── */
(function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const innerLayers = hero.querySelectorAll('.hero-slide-inner');

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 18;
    targetY = (e.clientY / window.innerHeight - 0.5) * 12;
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    innerLayers.forEach(layer => {
      layer.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1)`;
    });
    requestAnimationFrame(animateParallax);
  }
  animateParallax();
})();

/* ── Reveal on scroll (IntersectionObserver) ────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-scale');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* ── Counters (Facts & Figures) ─────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.fact-num[data-target]');
  if (!nums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.target);
      const dec    = (target % 1 !== 0) ? 1 : 0;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const sup    = el.dataset.sup ? `<sup>${el.dataset.sup}</sup>` : '';
      let start    = 0;
      const dur    = 2000;
      const startTs = performance.now();

      function step(ts) {
        const p = Math.min((ts - startTs) / dur, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - p, 4);
        const val   = (eased * target).toFixed(dec);
        el.innerHTML = prefix + val + suffix + sup;
        if (p < 1) requestAnimationFrame(step);
        else el.innerHTML = prefix + target.toFixed(dec) + suffix + sup;
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
})();

/* ============================================================
   THREE.JS — Process scrollytelling 3D canvas
   ============================================================ */
(function initProcess3D() {
  const canvas = document.getElementById('process-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ---- Renderer ---- */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ---- Scene & Camera ---- */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  /* ---- Lights ---- */
  const ambientLight = new THREE.AmbientLight(0xffeedd, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xc9a84c, 3.5, 20);
  pointLight1.position.set(3, 3, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x3d7033, 2.5, 20);
  pointLight2.position.set(-3, -2, 2);
  scene.add(pointLight2);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);

  /* ---- Materials ---- */
  function makeGoldMat(wireframe = false) {
    return new THREE.MeshPhysicalMaterial({
      color: 0xc9a84c,
      metalness: 0.8,
      roughness: 0.2,
      wireframe,
      emissive: 0x4a2e00,
      emissiveIntensity: 0.2,
    });
  }
  function makeGreenMat() {
    return new THREE.MeshPhysicalMaterial({
      color: 0x2d5016,
      metalness: 0.1,
      roughness: 0.6,
      emissive: 0x0d2008,
      emissiveIntensity: 0.3,
    });
  }
  function makeGlassMat() {
    return new THREE.MeshPhysicalMaterial({
      color: 0xaaddcc,
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.9,
      transparent: true,
      opacity: 0.85,
      ior: 1.4,
    });
  }

  /* ---- Stage objects ---- */

  // Stage 0 — Seed: golden sphere
  const seedGroup = new THREE.Group();
  const seed = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 48, 48),
    makeGoldMat()
  );
  // Small bump displacement
  const seedWire = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.1 })
  );
  seedGroup.add(seed, seedWire);

  // Stage 1 — Plant shoot: green elongated capsule
  const plantGroup = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.14, 2.5, 16),
    makeGreenMat()
  );
  const leaf1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 12),
    makeGreenMat()
  );
  leaf1.scale.set(0.5, 1, 0.25);
  leaf1.position.set(0.5, 0.7, 0);
  leaf1.rotation.z = -0.4;
  const leaf2 = leaf1.clone();
  leaf2.scale.set(0.4, 0.8, 0.2);
  leaf2.position.set(-0.45, 0.2, 0);
  leaf2.rotation.z = 0.5;
  const top = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 24, 24),
    makeGreenMat()
  );
  top.position.y = 1.35;
  plantGroup.add(stem, leaf1, leaf2, top);

  // Stage 2 — Curing (fiber strands): golden bundles + water sphere
  const curingGroup = new THREE.Group();
  const water = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 48, 48),
    makeGlassMat()
  );
  for (let i = 0; i < 8; i++) {
    const strand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6),
      makeGoldMat()
    );
    strand.position.set(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.5
    );
    strand.rotation.set(Math.random(), Math.random(), Math.random());
    curingGroup.add(strand);
  }
  curingGroup.add(water);

  // Stage 3 — Buying: golden fiber bundle
  const buyingGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const fiber = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 2.8, 6),
      makeGoldMat()
    );
    fiber.position.set((Math.random() - 0.5) * 0.6, 0, (Math.random() - 0.5) * 0.3);
    fiber.rotation.z = (Math.random() - 0.5) * 0.25;
    buyingGroup.add(fiber);
  }
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(0.45, 0.07, 12, 32),
    makeGoldMat()
  );
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.1;
  buyingGroup.add(band);

  // Stage 4 — Manufacturing: spool/yarn shape
  const mfgGroup = new THREE.Group();
  const spool = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.5, 32),
    makeGoldMat()
  );
  const spoolCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.25, 0.7, 16),
    makeGreenMat()
  );
  for (let i = 0; i < 3; i++) {
    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.55 + i * 0.1, 0.03, 8, 32),
      makeGoldMat()
    );
    coil.rotation.x = Math.PI / 2;
    coil.position.y = 0.08 * i;
    mfgGroup.add(coil);
  }
  mfgGroup.add(spool, spoolCore);

  // Stage 5 — Packing & Exporting: woven bag → container box
  const packGroup = new THREE.Group();
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.2, 1.2),
    new THREE.MeshPhysicalMaterial({
      color: 0x8b6914,
      metalness: 0.3,
      roughness: 0.7,
      emissive: 0x2a1e00,
      emissiveIntensity: 0.2,
    })
  );
  // Shipping lines
  const lineGeo = new THREE.BoxGeometry(1.82, 0.04, 0.04);
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c });
  [-0.35, 0, 0.35].forEach(y => {
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.y = y;
    packGroup.add(line);
  });
  packGroup.add(box);

  // ---- Add all groups to scene (hidden except stage 0) ----
  const stageObjects = [seedGroup, plantGroup, curingGroup, buyingGroup, mfgGroup, packGroup];
  stageObjects.forEach((g, i) => {
    g.visible = (i === 0);
    scene.add(g);
  });

  /* ---- Particle system (golden dust) ---- */
  const particleCount = 200;
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    particleSizes[i] = Math.random() * 3 + 1;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
  const pMat = new THREE.PointsMaterial({
    color: 0xc9a84c,
    size: 0.04,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---- State ---- */
  let currentStage = 0;
  let targetStage  = 0;
  let morphProgress = 0;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let clock = new THREE.Clock();

  // Expose transition function
  window._processGoToStage = function(idx) {
    if (idx === currentStage) return;
    stageObjects[currentStage].visible = false;
    currentStage = idx;
    stageObjects[currentStage].visible = true;
    morphProgress = 0;

    // Scale-in animation
    stageObjects[currentStage].scale.set(0.01, 0.01, 0.01);
    const scaleUp = setInterval(() => {
      const s = stageObjects[currentStage].scale.x;
      if (s >= 1) { stageObjects[currentStage].scale.set(1, 1, 1); clearInterval(scaleUp); return; }
      const ns = s + (1 - s) * 0.18;
      stageObjects[currentStage].scale.set(ns, ns, ns);
    }, 16);
  };

  /* ---- Mouse track ---- */
  document.addEventListener('mousemove', e => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * -1.0;
  });

  /* ---- Scroll-driven stage detection ---- */
  const stageEls = document.querySelectorAll('.process-stage');
  const progressDots = document.querySelectorAll('.progress-dot');

  function onScroll() {
    stageEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.top < vh * 0.55 && rect.bottom > vh * 0.45) {
        if (i !== currentStage) {
          window._processGoToStage(i);
          stageEls.forEach(s => s.classList.remove('stage-active'));
          el.classList.add('stage-active');
          progressDots.forEach((d, j) => d.classList.toggle('active', j === i));
        }
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (stageEls.length) stageEls[0].classList.add('stage-active');

  progressDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stageEls[i] && stageEls[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  /* ---- Render loop ---- */
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    // Rotate active object
    const active = stageObjects[currentStage];
    if (active) {
      active.rotation.y = mouseX * 0.8 + t * 0.3;
      active.rotation.x = mouseY * 0.4 + Math.sin(t * 0.5) * 0.1;
      // Floating
      active.position.y = Math.sin(t * 0.7) * 0.15;
    }

    // Particles drift
    particles.rotation.y = t * 0.04;
    particles.rotation.x = t * 0.02;

    // Light pulse
    pointLight1.intensity = 3.5 + Math.sin(t * 1.2) * 0.5;

    renderer.render(scene, camera);
  }
  animate();

  /* ---- Resize ---- */
  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
})();

/* ============================================================
   GSAP SCROLL ANIMATIONS (if GSAP available)
   ============================================================ */
(function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* Facts numbers */
  gsap.utils.toArray('.fact-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 80%' }
      }
    );
  });

  /* Products cards */
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 80%' }
      }
    );
  });

  /* Process stages slide in */
  gsap.utils.toArray('.stage-content-left, .stage-content-right').forEach(el => {
    const dir = el.classList.contains('stage-content-left') ? -60 : 60;
    gsap.fromTo(el,
      { opacity: 0, x: dir },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el.closest('.process-stage'), start: 'top 65%' }
      }
    );
  });

  /* About section */
  const aboutGrid = document.querySelector('.about-grid');
  if (aboutGrid) {
    gsap.fromTo('.about-text',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: aboutGrid, start: 'top 70%' }
      }
    );
    gsap.fromTo('.about-images',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: aboutGrid, start: 'top 70%' }
      }
    );
  }

  /* Section headers */
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      }
    );
  });
})();

/* ── Smooth link scrolling for anchors ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Detail page hero parallax ──────────────────────────────── */
(function initDetailHero() {
  const bg = document.querySelector('.detail-hero-bg');
  if (!bg) return;
  bg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
  }, { passive: true });
})();
