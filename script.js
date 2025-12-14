// 4K Wallpaper Generator - Clear Interface with 30+ Wallpaper Categories
// Inspired by popular wallpaper sites like Unsplash, Wallpaper Engine, etc.

(function () {
  // Canvas elements
  const canvas = document.getElementById('wallpaperCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const wallpaperImage = document.getElementById('wallpaperImage');
  const fullscreenCanvas = document.getElementById('fullscreenCanvas');
  const fullscreenCtx = fullscreenCanvas.getContext('2d', { alpha: false });
  
  // UI Elements
  const wallpaperGrid = document.getElementById('wallpaperGrid');
  const categoryTabs = document.querySelectorAll('.tab-btn');
  const controlsPanel = document.getElementById('controlsPanel');
  const closePanelBtn = document.getElementById('closePanelBtn');
  const currentWallpaperName = document.getElementById('currentWallpaperName');
  const canvasContainer = document.querySelector('.canvas-container');
  const canvasPlaceholder = document.querySelector('.canvas-placeholder');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fullscreenModal = document.getElementById('fullscreenModal');
  const closeFullscreenBtn = document.getElementById('closeFullscreenBtn');
  
  const resolutionSelect = document.getElementById('resolution');
  const customWidthInput = document.getElementById('customWidth');
  const customHeightInput = document.getElementById('customHeight');
  const customWidthLabel = document.getElementById('customWidthLabel');
  const customHeightLabel = document.getElementById('customHeightLabel');
  const isLiveSelect = document.getElementById('isLive');
  const animSpeedInput = document.getElementById('animSpeed');
  const speedValue = document.getElementById('speedValue');
  const colorThemeSelect = document.getElementById('colorTheme');
  const intensityInput = document.getElementById('intensity');
  const intensityValue = document.getElementById('intensityValue');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const previewBtn = document.getElementById('previewBtn');
  const randomizeBtn = document.getElementById('randomizeBtn');

  // Resolution presets
  const resolutions = {
    '1080p': { width: 1920, height: 1080 },
    '1440p': { width: 2560, height: 1440 },
    '4k': { width: 3840, height: 2160 },
    '8k': { width: 7680, height: 4320 },
    'custom': null
  };

  // Color themes
  const colorThemes = {
    vibrant: ['#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#00F5D4'],
    pastel: ['#FFB4C6', '#FFD6A5', '#BFEAF5', '#C7F9CC', '#DAD2FF'],
    dark: ['#0A0E27', '#1A1F3A', '#2D3561', '#4A5F8C', '#6B8AB8'],
    light: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E'],
    neon: ['#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#00F5D4'],
    warm: ['#FF5E5B', '#FFA41B', '#FFD166', '#FF9F9F', '#FF6B6B'],
    cool: ['#006994', '#00A8CC', '#4ECDC4', '#95E1D3', '#6BCAE2']
  };

  // Wallpaper Database - 30+ wallpapers organized by category
  const wallpapers = [
    // Monuments/Tourist Places Category - Real Images
    // Using verified Unsplash photo IDs - if images don't match, you can replace imageUrl with correct URLs
    { id: 'taj-mahal', name: 'Taj Mahal', category: 'monuments', icon: '🕌', description: 'Iconic Indian monument in Agra', imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'red-fort', name: 'Red Fort Delhi', category: 'monuments', icon: '🏰', description: 'Historic Red Fort in Delhi', imageUrl: 'https://media.istockphoto.com/id/1135362065/photo/gate-of-the-red-fort-delhi-india.jpg?s=612x612&w=0&k=20&c=HgP-J8TfJfOtKSgHButs40iHG-tYUa4MyZQq5qGxr_E=' },
    { id: 'gateway-india', name: 'Gateway of India', category: 'monuments', icon: '🌉', description: 'Famous landmark in Mumbai', imageUrl: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'golden-temple', name: 'Golden Temple', category: 'monuments', icon: '🕍', description: 'Golden Temple in Amritsar', imageUrl: 'https://images.unsplash.com/photo-1583821017783-4333717df070?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'mysore-palace', name: 'Mysore Palace', category: 'monuments', icon: '🏛️', description: 'Beautiful palace in Karnataka', imageUrl: 'https://images.unsplash.com/photo-1657856855186-7cf4909a4f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww' },
    { id: 'hawa-mahal', name: 'Hawa Mahal', category: 'monuments', icon: '🏯', description: 'Palace of Winds in Jaipur', imageUrl: 'https://images.unsplash.com/photo-1739255054356-00d070b921eb?q=80&w=659&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'qutub-minar', name: 'Qutub Minar', category: 'monuments', icon: '🗼', description: 'Tallest brick minaret in Delhi', imageUrl: 'https://plus.unsplash.com/premium_photo-1697730320983-f99aab252a44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cXV0dWIlMjBtaW5hcnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'charminar', name: 'Charminar', category: 'monuments', icon: '🕌', description: 'Iconic monument in Hyderabad', imageUrl: 'https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhcm1pbmFyfGVufDB8fDB8fHww' },
    { id: 'lotus-temple', name: 'Lotus Temple', category: 'monuments', icon: '🪷', description: 'Baha\'i House of Worship in Delhi', imageUrl: 'https://images.unsplash.com/photo-1688257609244-3f2a893f19d6?q=80&w=938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'india-gate', name: 'India Gate', category: 'monuments', icon: '🏛️', description: 'War memorial in New Delhi', imageUrl: 'https://images.unsplash.com/photo-1705927122615-02dcef3b1465?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWElMjBnYXRlfGVufDB8fDB8fHww' },
    
    // Nature Category
    { id: 'aurora', name: 'Aurora Borealis', category: 'nature', icon: '🌌', description: 'Northern lights dancing across the sky', imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'mountain', name: 'Mountain Peak', category: 'nature', icon: '⛰️', description: 'Majestic mountain landscape', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'forest', name: 'Forest Path', category: 'nature', icon: '🌲', description: 'Misty forest with sunlight rays', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'ocean', name: 'Ocean Waves', category: 'nature', icon: '🌊', description: 'Calm ocean with gentle waves', imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'sunset', name: 'Sunset Beach', category: 'nature', icon: '🌅', description: 'Beautiful sunset over the ocean', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'desert', name: 'Desert Dunes', category: 'nature', icon: '🏜️', description: 'Golden sand dunes at sunset', imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'lake', name: 'Mountain Lake', category: 'nature', icon: '🏔️', description: 'Serene mountain lake reflection', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'rainforest', name: 'Rainforest', category: 'nature', icon: '🌿', description: 'Lush tropical rainforest', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=3840&h=2160&fit=crop&auto=format' },
    
    // Space Category
    { id: 'nebula', name: 'Cosmic Nebula', category: 'space', icon: '🌌', description: 'Colorful space nebula clouds', imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'galaxy', name: 'Spiral Galaxy', category: 'space', icon: '🌠', description: 'Beautiful spiral galaxy', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'stars', name: 'Starry Night', category: 'space', icon: '⭐', description: 'Twinkling stars in deep space', imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'planet', name: 'Alien Planet', category: 'space', icon: '🪐', description: 'Exotic planet with rings', imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'eclipse', name: 'Solar Eclipse', category: 'space', icon: '🌑', description: 'Dramatic solar eclipse', imageUrl: 'https://images.unsplash.com/photo-1495763228012-c01e6fb0a0d1?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'asteroids', name: 'Asteroid Field', category: 'space', icon: '☄️', description: 'Asteroids floating in space', imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=3840&h=2160&fit=crop&auto=format' },
    
    // Abstract Category - Keep generated for these
    { id: 'abstract', name: 'Abstract Flow', category: 'abstract', icon: '🎨', description: 'Flowing abstract patterns' },
    { id: 'geometric', name: 'Geometric Shapes', category: 'abstract', icon: '🔷', description: 'Modern geometric patterns' },
    { id: 'particles', name: 'Particle System', category: 'abstract', icon: '✨', description: 'Animated particle effects' },
    { id: 'mandala', name: 'Mandala Art', category: 'abstract', icon: '🌀', description: 'Intricate mandala patterns' },
    { id: 'gradient', name: 'Gradient Waves', category: 'abstract', icon: '🌈', description: 'Smooth gradient transitions' },
    { id: 'liquid', name: 'Liquid Motion', category: 'abstract', icon: '💧', description: 'Flowing liquid effects' },
    
    // City Category - Indian Cities
    { id: 'lucknow', name: 'Lucknow', category: 'city', icon: '🏛️', description: 'City of Nawabs in Uttar Pradesh', imageUrl: 'https://images.unsplash.com/photo-1688287580970-70fe8e0f4bef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHVja25vd3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'delhi', name: 'Delhi', category: 'city', icon: '🏙️', description: 'Capital city of India', imageUrl: 'https://plus.unsplash.com/premium_photo-1697730323859-b093b74df90a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'mumbai', name: 'Mumbai', category: 'city', icon: '🌉', description: 'Financial capital of India', imageUrl: 'https://images.unsplash.com/photo-1660145416818-b9a2b1a1f193?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'hyderabad', name: 'Hyderabad', category: 'city', icon: '🏰', description: 'City of Pearls in Telangana', imageUrl: 'https://media.istockphoto.com/id/1453611880/photo/urban-cityscape-of-hyderabad.jpg?s=1024x1024&w=is&k=20&c=4LZjca7Gf7uVYjFaYzbe1j1e9PDzYS5rGY9M5p95EYA=' },
    
    // Minimal Category - Keep generated
    { id: 'minimal', name: 'Minimalist', category: 'minimal', icon: '⚪', description: 'Clean minimal design' },
    { id: 'dots', name: 'Dot Matrix', category: 'minimal', icon: '⚫', description: 'Simple dot patterns' },
    { id: 'lines', name: 'Parallel Lines', category: 'minimal', icon: '➖', description: 'Clean line patterns' },
    { id: 'circles', name: 'Concentric Circles', category: 'minimal', icon: '⭕', description: 'Simple circle patterns' },
    
    // Anime Style Category
    { id: 'sakura', name: 'Cherry Blossoms', category: 'anime', icon: '🌸', description: 'Anime-style cherry blossoms', imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'anime', name: 'Anime Sky', category: 'anime', icon: '☁️', description: 'Anime cloud patterns', imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=3840&h=2160&fit=crop&auto=format' },
    { id: 'kawaii', name: 'Kawaii Style', category: 'anime', icon: '💖', description: 'Cute kawaii patterns' }
  ];

  // Current state
  let currentWallpaper = null;
  let isAnimating = false;
  let animationFrame = null;
  let animationTime = 0;
  let currentWidth = 3840;
  let currentHeight = 2160;
  let activeCategory = 'all';

  // Seeded RNG
  function RNG(seed) {
    let x = seed >>> 0;
    if (x === 0) x = 0xDEADBEEF;
    return function () {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return ((x >>> 0) / 4294967296);
    };
  }

  // Initialize canvas
  function setCanvasResolution(width, height) {
    currentWidth = width;
    currentHeight = height;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    fullscreenCanvas.width = width;
    fullscreenCanvas.height = height;
  }

  // Get palette
  function getPalette(wallpaperId) {
    const theme = colorThemeSelect.value;
    if (theme === 'auto') {
      // Category-based palettes
      const categoryPalettes = {
        nature: ['#00FF87', '#00D4FF', '#4ECDC4', '#95E1D3', '#2D5016', '#3E7B27'],
        space: ['#0A0E27', '#1A1F3A', '#7B2CBF', '#9D4EDD', '#C77DFF', '#FFFFFF'],
        abstract: ['#FF006E', '#FFBE0B', '#3A86FF', '#8338EC', '#00F5D4', '#FF4500'],
        city: ['#00FFFF', '#FF00FF', '#00FF00', '#FFFF00', '#FF0080', '#000000'],
        minimal: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#000000', '#333333', '#666666'],
        anime: ['#FFB4C6', '#FFD6A5', '#BFEAF5', '#C7F9CC', '#DAD2FF', '#FF9F9F']
      };
      const wallpaper = wallpapers.find(w => w.id === wallpaperId);
      return categoryPalettes[wallpaper?.category] || colorThemes.vibrant;
    }
    return colorThemes[theme] || colorThemes.vibrant;
  }

  // Wallpaper renderers (keeping key ones, adding new ones)
  function renderWallpaper(wallpaperId, time = 0) {
    const palette = getPalette(wallpaperId);
    const intensity = intensityInput.value / 10;
    const speed = animSpeedInput.value / 10;
    animationTime = time * speed;

    switch(wallpaperId) {
      case 'aurora': drawAurora(animationTime, palette, intensity); break;
      case 'mountain': drawMountain(animationTime, palette, intensity); break;
      case 'forest': drawForest(animationTime, palette, intensity); break;
      case 'ocean': drawOcean(animationTime, palette, intensity); break;
      case 'sunset': drawSunset(animationTime, palette, intensity); break;
      case 'desert': drawDesert(animationTime, palette, intensity); break;
      case 'lake': drawLake(animationTime, palette, intensity); break;
      case 'rainforest': drawRainforest(animationTime, palette, intensity); break;
      case 'nebula': drawNebula(animationTime, palette, intensity); break;
      case 'galaxy': drawGalaxy(animationTime, palette, intensity); break;
      case 'stars': drawStars(animationTime, palette, intensity); break;
      case 'planet': drawPlanet(animationTime, palette, intensity); break;
      case 'eclipse': drawEclipse(animationTime, palette, intensity); break;
      case 'asteroids': drawAsteroids(animationTime, palette, intensity); break;
      case 'abstract': drawAbstract(animationTime, palette, intensity); break;
      case 'geometric': drawGeometric(animationTime, palette, intensity); break;
      case 'particles': drawParticles(animationTime, palette, intensity); break;
      case 'mandala': drawMandala(animationTime, palette, intensity); break;
      case 'gradient': drawGradient(animationTime, palette, intensity); break;
      case 'liquid': drawLiquid(animationTime, palette, intensity); break;
      case 'lucknow': drawCyber(animationTime, palette, intensity); break;
      case 'delhi': drawSkyline(animationTime, palette, intensity); break;
      case 'mumbai': drawTokyo(animationTime, palette, intensity); break;
      case 'hyderabad': drawNeon(animationTime, palette, intensity); break;
      case 'minimal': drawMinimal(animationTime, palette, intensity); break;
      case 'dots': drawDots(animationTime, palette, intensity); break;
      case 'lines': drawLines(animationTime, palette, intensity); break;
      case 'circles': drawCircles(animationTime, palette, intensity); break;
      case 'sakura': drawSakura(animationTime, palette, intensity); break;
      case 'anime': drawAnimeSky(animationTime, palette, intensity); break;
      case 'kawaii': drawKawaii(animationTime, palette, intensity); break;
      default: drawAurora(animationTime, palette, intensity);
    }
  }

  // Drawing functions (keeping existing ones, adding new ones)
  function drawAurora(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#0A0E27');
    bgGradient.addColorStop(1, '#1A1F3A');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(42);
    for (let i = 0; i < 500; i++) {
      const x = rand() * w, y = rand() * h, size = rand() * 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + rand() * 0.7})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    for (let wave = 0; wave < 3 + Math.floor(intensity / 2); wave++) {
      const color = palette[wave % palette.length];
      const offsetY = h * 0.3 + wave * 80;
      const amplitude = 100 + intensity * 20;
      const frequency = 0.002 + wave * 0.001;
      const speed = time * (0.0001 + wave * 0.00005);
      
      ctx.beginPath();
      ctx.moveTo(0, offsetY);
      for (let x = 0; x < w; x += 2) {
        const y = offsetY + Math.sin(x * frequency + speed) * amplitude * (1 - x / w * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, offsetY, 0, h);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawMountain(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);
    
    const rand = RNG(100);
    for (let i = 0; i < 3; i++) {
      const peakX = w * (0.2 + i * 0.3);
      const peakY = h * (0.3 + i * 0.1);
      const baseY = h * 0.6;
      
      ctx.fillStyle = palette[i % palette.length];
      ctx.beginPath();
      ctx.moveTo(peakX - 200, baseY);
      ctx.lineTo(peakX, peakY);
      ctx.lineTo(peakX + 200, baseY);
      ctx.lineTo(w, baseY);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    }
    
    // Snow caps
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 3; i++) {
      const peakX = w * (0.2 + i * 0.3);
      const peakY = h * (0.3 + i * 0.1);
      ctx.beginPath();
      ctx.arc(peakX, peakY, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawForest(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.4);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#98D8C8');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.4);
    
    ctx.fillStyle = '#2D5016';
    ctx.fillRect(0, h * 0.4, w, h * 0.6);
    
    const rand = RNG(456);
    for (let i = 0; i < 50 + intensity * 10; i++) {
      const x = rand() * w;
      const treeHeight = 100 + rand() * 200;
      const treeWidth = 30 + rand() * 40;
      const y = h - treeHeight;
      
      ctx.fillStyle = '#3E2723';
      ctx.fillRect(x - 10, y + treeHeight * 0.7, 20, treeHeight * 0.3);
      
      const color = palette[Math.floor(rand() * palette.length)];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, treeWidth, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawOcean(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#4682B4');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);
    
    const oceanGradient = ctx.createLinearGradient(0, h * 0.6, 0, h);
    oceanGradient.addColorStop(0, '#4682B4');
    oceanGradient.addColorStop(1, '#1E3A5F');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, h * 0.6, w, h * 0.4);
    
    const waveCount = 5 + Math.floor(intensity / 2);
    for (let i = 0; i < waveCount; i++) {
      const y = h * 0.6 + i * (h * 0.4 / waveCount);
      const amplitude = 20 + intensity * 5;
      const frequency = 0.01 + i * 0.005;
      const speed = time * (0.0005 + i * 0.0002);
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < w; x += 2) {
        const waveY = y + Math.sin(x * frequency + speed) * amplitude;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 - i * 0.05})`;
      ctx.fill();
    }
  }

  function drawSunset(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#FF5E5B');
    gradient.addColorStop(0.3, '#FFA41B');
    gradient.addColorStop(0.6, '#FFD166');
    gradient.addColorStop(1, '#8E7CA9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    const sunY = h * 0.3;
    const sunX = w * 0.5;
    const sunSize = 100 + intensity * 20;
    
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize);
    sunGradient.addColorStop(0, '#FFD700');
    sunGradient.addColorStop(0.5, '#FFA500');
    sunGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawDesert(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGradient.addColorStop(0, '#FFD89B');
    skyGradient.addColorStop(1, '#FFB347');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.5);
    
    const sandGradient = ctx.createLinearGradient(0, h * 0.5, 0, h);
    sandGradient.addColorStop(0, '#F4A460');
    sandGradient.addColorStop(1, '#CD853F');
    ctx.fillStyle = sandGradient;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
    
    const rand = RNG(789);
    for (let i = 0; i < 20; i++) {
      const x = rand() * w;
      const y = h * 0.5 + rand() * h * 0.5;
      const duneHeight = 30 + rand() * 50;
      const duneWidth = 100 + rand() * 200;
      
      ctx.fillStyle = `rgba(244, 164, 96, ${0.6 + rand() * 0.4})`;
      ctx.beginPath();
      ctx.ellipse(x, y, duneWidth, duneHeight, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawLake(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    drawMountain(time, palette, intensity);
    
    const lakeY = h * 0.7;
    ctx.fillStyle = '#4682B4';
    ctx.fillRect(0, lakeY, w, h - lakeY);
    
    const rand = RNG(321);
    for (let i = 0; i < 100; i++) {
      const x = rand() * w;
      const y = lakeY + rand() * (h - lakeY);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + rand() * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, 2 + rand() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRainforest(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#87CEEB');
    bgGradient.addColorStop(1, '#228B22');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(654);
    for (let i = 0; i < 100 + intensity * 20; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const size = 20 + rand() * 60;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawNebula(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(123);
    for (let i = 0; i < 1000; i++) {
      const x = rand() * w, y = rand() * h;
      const twinkle = Math.sin(time * 0.001 + i) * 0.5 + 0.5;
      const size = (rand() * 2 + 1) * twinkle;
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    for (let i = 0; i < 3; i++) {
      const color = palette[i % palette.length];
      const centerX = w * (0.2 + i * 0.3);
      const centerY = h * (0.3 + i * 0.2);
      const radius = 200 + intensity * 50;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + '80');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawGalaxy(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, w, h);
    
    const centerX = w / 2;
    const centerY = h / 2;
    const rotation = time * 0.0001;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    
    for (let arm = 0; arm < 2; arm++) {
      const color = palette[arm % palette.length];
      for (let i = 0; i < 200; i++) {
        const angle = (Math.PI * 2 / 2) * arm + i * 0.05;
        const radius = i * 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawStars(time, palette, intensity) {
    drawNebula(time, palette, intensity);
  }

  function drawPlanet(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, w, h);
    
    const centerX = w / 2;
    const centerY = h / 2;
    const planetRadius = 200 + intensity * 50;
    
    const planetGradient = ctx.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY, planetRadius);
    planetGradient.addColorStop(0, palette[0]);
    planetGradient.addColorStop(0.5, palette[1]);
    planetGradient.addColorStop(1, palette[2]);
    
    ctx.fillStyle = planetGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Rings
    ctx.strokeStyle = palette[3];
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, planetRadius + 50 + i * 30, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawEclipse(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FF8C00');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    const moonX = w / 2;
    const moonY = h / 2;
    const moonRadius = 150;
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();
    
    const coronaGradient = ctx.createRadialGradient(moonX, moonY, moonRadius, moonX, moonY, moonRadius + 50);
    coronaGradient.addColorStop(0, 'transparent');
    coronaGradient.addColorStop(1, '#FFD700');
    ctx.fillStyle = coronaGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius + 50, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawAsteroids(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(987);
    for (let i = 0; i < 50 + intensity * 10; i++) {
      const x = (rand() * w + time * 0.1) % w;
      const y = rand() * h;
      const size = 10 + rand() * 30;
      
      ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawAbstract(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const bgGradient = ctx.createLinearGradient(0, 0, w, h);
    bgGradient.addColorStop(0, palette[0]);
    bgGradient.addColorStop(0.5, palette[1]);
    bgGradient.addColorStop(1, palette[2]);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(789);
    for (let i = 0; i < 20 + intensity * 5; i++) {
      const x = rand() * w, y = rand() * h, size = 50 + rand() * 200;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * 0.0001 + i);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawGeometric(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#0A0E27';
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(321);
    const shapeCount = 30 + intensity * 10;
    
    for (let i = 0; i < shapeCount; i++) {
      const x = rand() * w, y = rand() * h, size = 30 + rand() * 150;
      const color = palette[Math.floor(rand() * palette.length)];
      const rotation = time * 0.0001 + i * 0.1;
      const sides = 3 + Math.floor(rand() * 5);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      for (let j = 0; j < sides; j++) {
        const angle = (Math.PI * 2 / sides) * j;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      if (rand() > 0.5) ctx.fill();
      else ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  let particleSystem = null;
  function drawParticles(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, w, h);
    
    const particleCount = Math.min(200 + intensity * 50, 500);
    
    if (!particleSystem || particleSystem.length !== particleCount) {
      const rand = RNG(654);
      particleSystem = [];
      for (let i = 0; i < particleCount; i++) {
        particleSystem.push({
          x: rand() * w, y: rand() * h,
          vx: (rand() - 0.5) * 2, vy: (rand() - 0.5) * 2,
          size: 2 + rand() * 4,
          color: palette[Math.floor(rand() * palette.length)]
        });
      }
    }
    
    particleSystem.forEach((p) => {
      p.x += p.vx * (1 + time * 0.0001);
      p.y += p.vy * (1 + time * 0.0001);
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawMandala(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#0A0E27';
    ctx.fillRect(0, 0, w, h);
    
    const centerX = w / 2, centerY = h / 2;
    const layers = 5 + Math.floor(intensity / 2);
    const rotation = time * 0.00005;
    
    for (let layer = 0; layer < layers; layer++) {
      const radius = 50 + layer * 100;
      const elements = 6 + layer * 2;
      const color = palette[layer % palette.length];
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * (layer % 2 === 0 ? 1 : -1));
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8 - layer * 0.1;
      ctx.lineWidth = 2;
      
      for (let i = 0; i < elements; i++) {
        const angle = (Math.PI * 2 / elements) * i;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(radius, 0);
        ctx.beginPath();
        ctx.ellipse(0, 0, 30, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawGradient(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    for (let i = 0; i < palette.length; i++) {
      gradient.addColorStop(i / (palette.length - 1), palette[i]);
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    const waveCount = 3 + Math.floor(intensity / 2);
    for (let i = 0; i < waveCount; i++) {
      const y = h * (0.2 + i * 0.2);
      const amplitude = 20 + intensity * 5;
      const frequency = 0.01;
      const speed = time * 0.0005;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - i * 0.05})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < w; x += 2) {
        const waveY = y + Math.sin(x * frequency + speed) * amplitude;
        ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }
  }

  function drawLiquid(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#0A0E27';
    ctx.fillRect(0, 0, w, h);
    
    const blobCount = 5 + Math.floor(intensity / 2);
    const rand = RNG(147);
    
    for (let i = 0; i < blobCount; i++) {
      const x = w * (0.1 + i * 0.2);
      const y = h * (0.3 + Math.sin(time * 0.001 + i) * 0.2);
      const size = 100 + intensity * 20;
      const color = palette[i % palette.length];
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawCyber(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    
    ctx.strokeStyle = '#00FFFF';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.2;
    const gridSize = 50;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    
    const rand = RNG(147);
    for (let i = 0; i < 30 + intensity * 5; i++) {
      const x = rand() * w, y = rand() * h, size = 20 + rand() * 100;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.8;
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }

  function drawSkyline(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#1a1a2e');
    skyGradient.addColorStop(1, '#16213e');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);
    
    const rand = RNG(258);
    for (let i = 0; i < 20 + intensity * 5; i++) {
      const x = rand() * w;
      const buildingHeight = 50 + rand() * (h * 0.6);
      const buildingWidth = 30 + rand() * 80;
      
      ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
      ctx.fillRect(x, h * 0.6, buildingWidth, buildingHeight);
      
      // Windows
      ctx.fillStyle = '#FFD700';
      for (let j = 0; j < Math.floor(buildingHeight / 20); j++) {
        if (rand() > 0.3) {
          ctx.fillRect(x + 5, h * 0.6 + j * 20, 8, 8);
          ctx.fillRect(x + buildingWidth - 13, h * 0.6 + j * 20, 8, 8);
        }
      }
    }
  }

  function drawTokyo(time, palette, intensity) {
    drawSkyline(time, palette, intensity);
    
    const w = canvas.width, h = canvas.height;
    const rand = RNG(369);
    
    // Neon signs
    for (let i = 0; i < 10; i++) {
      const x = rand() * w;
      const y = h * 0.4 + rand() * h * 0.3;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.fillStyle = color;
      ctx.font = 'bold 24px Arial';
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      ctx.fillText('東京', x, y);
      ctx.shadowBlur = 0;
    }
  }

  function drawNeon(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(741);
    for (let i = 0; i < 15 + intensity * 3; i++) {
      const x = rand() * w;
      const y = h * 0.3 + rand() * h * 0.4;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.shadowBlur = 30;
      ctx.shadowColor = color;
      ctx.globalAlpha = 0.9;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 100, y);
      ctx.lineTo(x + 120, y + 30);
      ctx.lineTo(x + 20, y + 30);
      ctx.closePath();
      ctx.stroke();
      
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }

  function drawMinimal(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(852);
    for (let i = 0; i < 5 + Math.floor(intensity / 2); i++) {
      const x = rand() * w;
      const y = rand() * h;
      const size = 50 + rand() * 150;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawDots(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    
    const dotSize = 5;
    const spacing = 30;
    const rand = RNG(963);
    
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        if (rand() > 0.7) {
          const color = palette[Math.floor(rand() * palette.length)];
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function drawLines(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    
    const lineCount = 10 + Math.floor(intensity);
    const rand = RNG(159);
    
    for (let i = 0; i < lineCount; i++) {
      const y = (h / lineCount) * i;
      const color = palette[i % palette.length];
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function drawCircles(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    
    const centerX = w / 2;
    const centerY = h / 2;
    const circleCount = 5 + Math.floor(intensity / 2);
    
    for (let i = 0; i < circleCount; i++) {
      const radius = 50 + i * 80;
      const color = palette[i % palette.length];
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawSakura(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#FFB6C1');
    skyGradient.addColorStop(1, '#FFE4E1');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(357);
    for (let i = 0; i < 100 + intensity * 20; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const size = 10 + rand() * 20;
      
      ctx.fillStyle = '#FFB6C1';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      for (let petal = 0; petal < 5; petal++) {
        const angle = (Math.PI * 2 / 5) * petal;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (petal === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawAnimeSky(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(468);
    for (let i = 0; i < 30; i++) {
      const x = rand() * w;
      const y = rand() * h * 0.6;
      const size = 30 + rand() * 50;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.arc(x + size * 0.6, y, size * 0.8, 0, Math.PI * 2);
      ctx.arc(x + size * 1.2, y, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawKawaii(time, palette, intensity) {
    const w = canvas.width, h = canvas.height;
    const bgGradient = ctx.createLinearGradient(0, 0, w, h);
    bgGradient.addColorStop(0, '#FFB4C6');
    bgGradient.addColorStop(1, '#FFD6A5');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    const rand = RNG(579);
    for (let i = 0; i < 50 + intensity * 10; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const size = 20 + rand() * 40;
      const color = palette[Math.floor(rand() * palette.length)];
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Cute face
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x - size * 0.3, y - size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y + size * 0.2, size * 0.2, 0, Math.PI);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Build wallpaper grid
  function buildWallpaperGrid(category = 'all') {
    wallpaperGrid.innerHTML = '';
    const filtered = category === 'all' ? wallpapers : wallpapers.filter(w => w.category === category);
    
    filtered.forEach(wallpaper => {
      const item = document.createElement('div');
      item.className = 'wallpaper-item';
      item.innerHTML = `
        <div class="wallpaper-thumbnail" data-id="${wallpaper.id}">
          <div class="wallpaper-icon">${wallpaper.icon}</div>
          <div class="wallpaper-overlay">
            <div class="wallpaper-name">${wallpaper.name}</div>
            <div class="wallpaper-description">${wallpaper.description}</div>
          </div>
        </div>
      `;
      item.querySelector('.wallpaper-thumbnail').addEventListener('click', () => {
        selectWallpaper(wallpaper.id);
      });
      wallpaperGrid.appendChild(item);
    });
  }

  // Select wallpaper
  function selectWallpaper(wallpaperId) {
    currentWallpaper = wallpapers.find(w => w.id === wallpaperId);
    currentWallpaperName.textContent = currentWallpaper.name;
    controlsPanel.style.display = 'block';
    canvasPlaceholder.style.display = 'none';
    
    // Check if wallpaper has a real image URL
    if (currentWallpaper.imageUrl) {
      // Display real image
      canvas.style.display = 'none';
      wallpaperImage.style.display = 'block';
      wallpaperImage.src = currentWallpaper.imageUrl + '&sig=' + Date.now(); // Add timestamp to prevent caching
      wallpaperImage.onerror = function() {
        // Fallback if image fails to load
        console.error('Image failed to load, using fallback');
        this.style.display = 'none';
        canvas.style.display = 'block';
        renderWallpaper(wallpaperId);
      };
      // Hide animation controls for real images
      playPauseBtn.style.display = 'none';
      isLiveSelect.value = 'static';
    } else {
      // Use canvas rendering for generated wallpapers
      wallpaperImage.style.display = 'none';
      canvas.style.display = 'block';
      playPauseBtn.style.display = 'inline-block';
      fullscreenBtn.style.display = 'inline-block';
      
      // Generate initial render
      renderWallpaper(wallpaperId);
      
      // Start animation if live
      if (isLiveSelect.value === 'live') {
        isAnimating = true;
        animate();
      }
    }
    
    fullscreenBtn.style.display = 'inline-block';
    
    // Scroll to controls
    controlsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Animation loop
  function animate() {
    if (isAnimating && currentWallpaper && !currentWallpaper.imageUrl && isLiveSelect.value === 'live') {
      renderWallpaper(currentWallpaper.id, Date.now());
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  }

  // Event listeners
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      buildWallpaperGrid(activeCategory);
    });
  });

  closePanelBtn.addEventListener('click', () => {
    controlsPanel.style.display = 'none';
  });

  resolutionSelect.addEventListener('change', () => {
    if (resolutionSelect.value === 'custom') {
      customWidthLabel.style.display = 'flex';
      customHeightLabel.style.display = 'flex';
      setCanvasResolution(customWidthInput.value, customHeightInput.value);
    } else {
      customWidthLabel.style.display = 'none';
      customHeightLabel.style.display = 'none';
      const res = resolutions[resolutionSelect.value];
      setCanvasResolution(res.width, res.height);
    }
    if (currentWallpaper && !currentWallpaper.imageUrl) {
      renderWallpaper(currentWallpaper.id);
    }
  });

  customWidthInput.addEventListener('input', () => {
    if (resolutionSelect.value === 'custom') {
      setCanvasResolution(customWidthInput.value, customHeightInput.value);
      if (currentWallpaper) renderWallpaper(currentWallpaper.id);
    }
  });

  customHeightInput.addEventListener('input', () => {
    if (resolutionSelect.value === 'custom') {
      setCanvasResolution(customWidthInput.value, customHeightInput.value);
      if (currentWallpaper) renderWallpaper(currentWallpaper.id);
    }
  });

  animSpeedInput.addEventListener('input', (e) => {
    speedValue.textContent = e.target.value;
  });

  intensityInput.addEventListener('input', (e) => {
    intensityValue.textContent = e.target.value;
  });

  generateBtn.addEventListener('click', () => {
    if (currentWallpaper) {
      if (currentWallpaper.imageUrl) {
        // Reload image with new timestamp
        wallpaperImage.src = currentWallpaper.imageUrl + '&sig=' + Date.now();
      } else {
        particleSystem = null;
        renderWallpaper(currentWallpaper.id);
      }
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (currentWallpaper) {
      const link = document.createElement('a');
      link.download = `wallpaper-${currentWallpaper.id}-${currentWidth}x${currentHeight}.png`;
      
      if (currentWallpaper.imageUrl && wallpaperImage.complete) {
        // Download real image
        link.href = wallpaperImage.src;
      } else {
        // Download canvas image
        link.href = canvas.toDataURL('image/png');
      }
      link.click();
    }
  });

  previewBtn.addEventListener('click', () => {
    if (currentWallpaper) {
      fullscreenModal.style.display = 'flex';
      
      if (currentWallpaper.imageUrl && wallpaperImage.complete) {
        // Show image in fullscreen
        const img = document.createElement('img');
        img.src = wallpaperImage.src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        fullscreenCanvas.style.display = 'none';
        if (fullscreenCanvas.parentElement.querySelector('img.fullscreen-img')) {
          fullscreenCanvas.parentElement.querySelector('img.fullscreen-img').remove();
        }
        img.className = 'fullscreen-img';
        fullscreenCanvas.parentElement.appendChild(img);
      } else {
        // Show canvas in fullscreen
        if (fullscreenCanvas.parentElement.querySelector('img.fullscreen-img')) {
          fullscreenCanvas.parentElement.querySelector('img.fullscreen-img').remove();
        }
        fullscreenCanvas.style.display = 'block';
        fullscreenCanvas.width = window.innerWidth;
        fullscreenCanvas.height = window.innerHeight;
        const scale = Math.min(window.innerWidth / currentWidth, window.innerHeight / currentHeight);
        fullscreenCtx.save();
        fullscreenCtx.scale(scale, scale);
        fullscreenCtx.drawImage(canvas, 0, 0);
        fullscreenCtx.restore();
        
        function fullscreenAnimate() {
          if (fullscreenModal.style.display !== 'none' && currentWallpaper) {
            renderWallpaper(currentWallpaper.id, Date.now());
            fullscreenCtx.clearRect(0, 0, fullscreenCanvas.width, fullscreenCanvas.height);
            const scale = Math.min(window.innerWidth / currentWidth, window.innerHeight / currentHeight);
            fullscreenCtx.save();
            fullscreenCtx.scale(scale, scale);
            fullscreenCtx.drawImage(canvas, 0, 0);
            fullscreenCtx.restore();
            requestAnimationFrame(fullscreenAnimate);
          }
        }
        if (isLiveSelect.value === 'live' && !currentWallpaper.imageUrl) fullscreenAnimate();
      }
    }
  });

  closeFullscreenBtn.addEventListener('click', () => {
    fullscreenModal.style.display = 'none';
    if (fullscreenCanvas.parentElement.querySelector('img.fullscreen-img')) {
      fullscreenCanvas.parentElement.querySelector('img.fullscreen-img').remove();
    }
    fullscreenCanvas.style.display = 'block';
  });

  playPauseBtn.addEventListener('click', () => {
    isAnimating = !isAnimating;
    playPauseBtn.textContent = isAnimating ? '⏸' : '▶';
    if (isAnimating && isLiveSelect.value === 'live') {
      animate();
    } else {
      cancelAnimationFrame(animationFrame);
    }
  });

  fullscreenBtn.addEventListener('click', () => {
    previewBtn.click();
  });

  randomizeBtn.addEventListener('click', () => {
    const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    selectWallpaper(randomWallpaper.id);
    colorThemeSelect.value = ['auto', 'vibrant', 'pastel', 'dark', 'neon'][Math.floor(Math.random() * 5)];
    intensityInput.value = 3 + Math.floor(Math.random() * 5);
    intensityValue.textContent = intensityInput.value;
  });

  isLiveSelect.addEventListener('change', () => {
    if (isLiveSelect.value === 'live' && currentWallpaper && !currentWallpaper.imageUrl) {
      isAnimating = true;
      animate();
    } else {
      isAnimating = false;
      cancelAnimationFrame(animationFrame);
      if (currentWallpaper && !currentWallpaper.imageUrl) {
        renderWallpaper(currentWallpaper.id);
      }
    }
  });

  [colorThemeSelect, intensityInput].forEach(el => {
    el.addEventListener('change', () => {
      if (currentWallpaper && !currentWallpaper.imageUrl) {
        particleSystem = null;
        if (!isAnimating) renderWallpaper(currentWallpaper.id);
      }
    });
  });

  // Initialize
  setCanvasResolution(3840, 2160);
  buildWallpaperGrid('all');
})();
