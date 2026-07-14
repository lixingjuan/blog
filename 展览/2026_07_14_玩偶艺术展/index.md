# 07月14日 · 玩偶艺术展

<div class="exhibition-page">

<header class="exhibition-header">
  <p class="exhibition-date">2026.07.14</p>
  <h1 class="exhibition-title">玩偶艺术展</h1>
  <p class="exhibition-mood">怪诞 · 暗黑</p>
  <p class="exhibition-desc">深红墙面、黑白棋盘格地面，人偶静置于光与影之间——介于美丽与不安之间的展览现场。</p>
  <p class="exhibition-count">3 张照片 · 3 段视频</p>
</header>

<section class="curatorial-note">
  <p class="note-label">ROOM 01</p>
  <h2>进入房间</h2>
  <p>红色先到达眼睛，然后才是人偶。空间像一个被压低声音的舞台，所有角色都已经就位，只等观看者踏进去。</p>
</section>

<section class="gallery">
  <figure class="gallery-item gallery-item-wide">
    <a href="展览/2026-07-14/玩偶艺术展/IMG_7792.JPG" target="_blank" rel="noopener">
      <img src="展览/2026-07-14/玩偶艺术展/IMG_7792.JPG" alt="玩偶艺术展 1" loading="lazy" />
    </a>
    <figcaption>
      <span>红色房间</span>
      <small>这里可以写你的第一眼感受。</small>
    </figcaption>
  </figure>
  <figure class="gallery-item">
    <a href="展览/2026-07-14/玩偶艺术展/IMG_7793.JPG" target="_blank" rel="noopener">
      <img src="展览/2026-07-14/玩偶艺术展/IMG_7793.JPG" alt="玩偶艺术展 2" loading="lazy" />
    </a>
    <figcaption>
      <span>凝视</span>
      <small>这里可以写关于人偶、眼神、姿态的短句。</small>
    </figcaption>
  </figure>
  <figure class="gallery-item">
    <a href="展览/2026-07-14/玩偶艺术展/IMG_7794.JPG" target="_blank" rel="noopener">
      <img src="展览/2026-07-14/玩偶艺术展/IMG_7794.JPG" alt="玩偶艺术展 3" loading="lazy" />
    </a>
    <figcaption>
      <span>棋盘格</span>
      <small>这里可以写空间、地面、光线带来的气氛。</small>
    </figcaption>
  </figure>
</section>

<section class="curatorial-note curatorial-note-right">
  <p class="note-label">ROOM 02</p>
  <h2>静止的表演</h2>
  <p>它们没有动作，却不像真正静止。布景、身体和影子共同制造出一种轻微的悬疑感：美丽贴得很近，不安也贴得很近。</p>
</section>

<section class="video-section">
  <p class="note-label">MOTION</p>
  <h2 class="section-title">移动的片段</h2>
  <p class="section-intro">视频可以保留现场的迟疑、晃动和靠近。这里之后可以写你在现场走动时的感受。</p>
  <div class="video-grid">
    <figure class="video-item">
      <video src="展览/2026-07-14/玩偶艺术展/IMG_7799.MOV" controls preload="metadata" playsinline></video>
      <figcaption>片段一 · 这里可以写一句现场备注</figcaption>
    </figure>
    <figure class="video-item">
      <video src="展览/2026-07-14/玩偶艺术展/IMG_7800.MOV" controls preload="metadata" playsinline></video>
      <figcaption>片段二 · 这里可以写一句声音或运动的记忆</figcaption>
    </figure>
    <figure class="video-item">
      <video src="展览/2026-07-14/玩偶艺术展/IMG_7801.MOV" controls preload="metadata" playsinline></video>
      <figcaption>片段三 · 这里可以写一句收束感受</figcaption>
    </figure>
  </div>
</section>

</div>

<style>
  .exhibition-page {
    --bg: #050303;
    --surface: #13090c;
    --surface-strong: #210d13;
    --accent: #a51624;
    --accent-hot: #d93a46;
    --accent-dim: #8b1d28;
    --text: #fff3ea;
    --text-muted: #c2a49d;
    --border: rgba(210, 43, 58, 0.48);

    position: relative;
    width: 100%;
    min-height: calc(100vh - 76px);
    overflow: hidden;
    background:
      radial-gradient(circle at 18% 4%, rgba(165, 22, 36, 0.4), transparent 30rem),
      radial-gradient(circle at 86% 18%, rgba(255, 245, 230, 0.14), transparent 24rem),
      linear-gradient(180deg, #050303 0%, #0b0506 42%, #030202 100%);
    color: var(--text);
    margin: 0;
    padding: 0 24px 88px;
    font-family: Georgia, "Songti SC", "Noto Serif SC", serif;
  }

  .exhibition-page::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 42px 42px;
    mix-blend-mode: screen;
    opacity: 0.2;
    z-index: 0;
  }

  .exhibition-header {
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 76px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto 56px;
    padding: 72px 20px 64px;
    border-bottom: 1px solid var(--border);
    max-width: 1180px;
    background:
      radial-gradient(circle at 50% 42%, rgba(165, 22, 36, 0.22), transparent 22rem),
      linear-gradient(180deg, rgba(255, 243, 234, 0.02), rgba(0, 0, 0, 0));
  }

  #content .exhibition-page .exhibition-date {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: #ff5965;
    margin: 0 0 12px;
    text-transform: uppercase;
  }

  #content .exhibition-page .exhibition-title {
    font-size: clamp(3.2rem, 10vw, 9rem);
    font-weight: 400;
    line-height: 0.92;
    letter-spacing: 0;
    margin: 0 0 24px;
    color: #fff3ea;
    text-shadow:
      0 0 2px rgba(255, 243, 234, 0.92),
      0 0 30px rgba(217, 58, 70, 0.56),
      0 18px 48px rgba(0, 0, 0, 0.75);
  }

  #content .exhibition-page .exhibition-mood {
    font-size: 1rem;
    letter-spacing: 0.35em;
    color: #d8b8af;
    margin: 0 0 20px;
  }

  #content .exhibition-page .exhibition-desc {
    max-width: 680px;
    margin: 0 auto 18px;
    font-size: 1rem;
    line-height: 1.8;
    color: #d2bbb4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  #content .exhibition-page .exhibition-count {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 12px;
    color: #ff5965;
    margin: 0;
    letter-spacing: 0.1em;
  }

  .curatorial-note {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto 48px;
    padding: 0 20px;
    text-align: left;
  }

  .curatorial-note-right {
    margin-top: 64px;
    margin-right: max(24px, calc((100vw - 1360px) / 2));
    margin-left: auto;
  }

  #content .exhibition-page .note-label {
    margin: 0 0 12px;
    color: #ff5965;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 12px;
    letter-spacing: 0.22em;
  }

  #content .exhibition-page .curatorial-note h2,
  #content .exhibition-page .section-title {
    margin: 0 0 16px;
    color: #fff3ea;
    font-size: clamp(1.55rem, 3vw, 2.4rem);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0;
    text-align: left;
  }

  #content .exhibition-page .curatorial-note p:not(.note-label),
  #content .exhibition-page .section-intro {
    max-width: 620px;
    margin: 0;
    color: #cdb4ad;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 15px;
    line-height: 1.9;
  }

  .gallery {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
    gap: 14px;
    max-width: 1360px;
    margin: 0 auto;
  }

  .gallery-item {
    margin: 0;
    overflow: hidden;
    border-radius: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.36);
    transition: border-color 0.25s ease, transform 0.25s ease, filter 0.25s ease;
  }

  .gallery-item-wide {
    grid-row: span 2;
  }

  .gallery-item:hover {
    border-color: var(--accent-hot);
    transform: translateY(-4px) scale(1.01);
    filter: brightness(1.04);
  }

  .gallery-item a {
    display: block;
    line-height: 0;
  }

  #content .exhibition-page .gallery-item img {
    width: 100%;
    height: 100%;
    min-height: 260px;
    display: block;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    object-fit: cover;
    filter: contrast(1.08) saturate(0.86) brightness(0.96);
    transition: filter 0.3s ease;
  }

  #content .exhibition-page .gallery-item:hover img {
    filter: contrast(1.12) saturate(0.95) brightness(1);
  }

  .gallery-item figcaption {
    display: grid;
    gap: 6px;
    padding: 14px 16px 16px;
    border-top: 1px solid rgba(210, 43, 58, 0.26);
    background: rgba(10, 4, 5, 0.86);
  }

  .gallery-item figcaption span {
    color: #fff3ea;
    font-size: 15px;
    letter-spacing: 0.08em;
  }

  .gallery-item figcaption small {
    color: #a98b85;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 12px;
    line-height: 1.6;
  }

  #content .exhibition-page a {
    color: inherit;
    text-decoration: none;
  }

  #content .exhibition-page a:hover {
    color: inherit;
    text-decoration: none;
  }

  .video-section {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 80px auto 0;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }

  .section-title {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  #content .exhibition-page .video-section .note-label,
  #content .exhibition-page .video-section .section-intro {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  #content .exhibition-page .video-section .section-intro {
    margin-bottom: 32px;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    max-width: 960px;
    margin: 0 auto;
  }

  .video-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .video-item video {
    width: 100%;
    display: block;
    background: #000;
  }

  .video-item figcaption {
    padding: 10px 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  @media (max-width: 900px) {
    .exhibition-page {
      padding: 0 14px 60px;
    }

    .exhibition-header {
      min-height: 72vh;
      padding: 48px 14px;
    }

    .curatorial-note,
    .curatorial-note-right {
      margin: 0 auto 36px;
      padding: 0 4px;
    }

    .gallery {
      grid-template-columns: 1fr;
    }

    #content .exhibition-page .gallery-item img {
      height: auto;
    }
  }
</style>
