(function () {
  const page = document.body.dataset.page;
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value !== undefined && value !== null) el.textContent = value;
  };
  const setLines = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el || value === undefined) return;
    el.innerHTML = String(value).split('|').map((line, i) => i ? '<br>' + line : line).join('');
  };
  const setImage = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.src = value;
  };
  const setHref = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.href = value;
  };
  const escape = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  fetch('data/pages.json').then(r => r.json()).then(data => {
    const settings = data.settings || {};
    document.title = document.title.replace(/^OG Style|^Mobili|^Il restauro|^Chi siamo|^Contatti/, settings.site_name || 'OG Style');
    document.querySelectorAll('.logo').forEach(img => { if (settings.logo) img.src = settings.logo; });
    document.querySelectorAll('footer div:first-child').forEach(el => el.textContent = settings.tagline || el.textContent);
    document.querySelectorAll('footer div:last-child').forEach(el => el.textContent = settings.footer_text || el.textContent);

    if (page === 'home') {
      const d = data.home;
      setText('#home-kicker', d.kicker); setText('#hero-title', d.hero_title); setText('#hero-emphasis', d.hero_emphasis); setText('#hero-text', d.hero_text);
      setImage('#hero-image', d.hero_image); setText('#featured-label', d.featured_label); setText('#featured-title', d.featured_title);
      setText('#creations-label', d.creations_label); setLines('#creations-title', d.creations_title); setText('#creations-text', d.creations_text);
      setText('#approach-label', d.approach_label); setLines('#approach-title', d.approach_title); setText('#approach-text', d.approach_text);
      setText('#about-label', d.about_label); setLines('#about-title', d.about_title); setText('#about-quote', d.about_quote); setText('#about-text', d.about_text);
      setText('#contact-label', d.contact_label); setLines('#contact-title', d.contact_title); setText('#contact-text', d.contact_text);
    }
    if (page === 'restauro') {
      const d = data.restauro;
      setText('#restauro-label', d.label); setLines('#restauro-title', d.title); setText('#restauro-intro', d.intro);
      setText('#work-label', d.work_label); setLines('#work-title', d.work_title); setText('#work-text', d.work_text);
      setText('#before-label', d.before_label); setLines('#before-title', d.before_title);
    }
    if (page === 'about') {
      const d = data.about;
      setText('#about-page-label', d.label); setLines('#about-page-title', d.title); setText('#about-page-quote', d.quote); setText('#about-page-text1', d.text1); setText('#about-page-text2', d.text2);
      setText('#inspiration-label', d.inspiration_label); setLines('#inspiration-title', d.inspiration_title); setText('#inspiration-text', d.inspiration_text);
    }
    if (page === 'contacts') {
      const d = data.contacts;
      setText('#contacts-label', d.label); setLines('#contacts-title', d.title); setText('#contacts-text', d.text);
      setHref('#instagram-link', d.instagram); setText('#instagram-label', d.instagram_label);
      setHref('#whatsapp-link', d.whatsapp); setText('#whatsapp-label', d.whatsapp_label);
      setHref('#email-link', 'mailto:' + d.email); setText('#email-label', d.email); setText('#zone-label', d.zone);
    }
  }).catch(console.error);

  if (page === 'portfolio') {
    fetch('data/portfolio.json').then(r => r.json()).then(data => {
      const grid = document.querySelector('#portfolio-grid'); if (!grid) return;
      grid.innerHTML = (data.items || []).map(item => `
        <a class="work-card${item.large ? ' large' : ''}">
          <img src="${escape(item.image)}" alt="${escape(item.title)}">
          <div class="overlay"><span class="badge">${escape(item.badge)}</span><h3>${escape(item.title)}</h3>${item.description ? `<p>${escape(item.description)}</p>` : ''}</div>
        </a>`).join('');
    }).catch(console.error);
  }
})();
