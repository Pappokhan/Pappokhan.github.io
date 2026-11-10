// Theme toggle, mobile menu, active link, publication filter, year
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    // dark / light
    var tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    // mobile menu
    var mb = document.getElementById('menuBtn'), menu = document.getElementById('menu');
    if (mb && menu) {
      mb.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu.classList.remove('open'); });
    }

    // active nav link
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('#menu a').forEach(function (a) {
      if (a.getAttribute('href').toLowerCase() === page) a.classList.add('active');
    });

    // publication filter
    var fb = document.querySelectorAll('.pubfilter button');
    fb.forEach(function (b) {
      b.addEventListener('click', function () {
        fb.forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        var f = b.getAttribute('data-f');
        document.querySelectorAll('[data-kind]').forEach(function (el) {
          el.style.display = (f === 'all' || el.getAttribute('data-kind') === f) ? '' : 'none';
        });
      });
    });

    var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
  });
})();
