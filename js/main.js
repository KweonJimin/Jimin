// Scroll-reveal for feed items — quiet fade/slide-in, no external deps.
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.feed-item');

  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
});

// Custom trailing-ring cursor — fine-pointer devices only, degrades
// gracefully (native cursor stays visible until this finishes setting up).
document.addEventListener('DOMContentLoaded', function () {
  var canHover = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  var cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var curX = targetX;
  var curY = targetY;
  var ease = 0.18;

  window.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.classList.add('is-visible');
  });

  document.addEventListener('mouseleave', function () {
    cursor.classList.remove('is-visible');
  });

  (function tick() {
    curX += (targetX - curX) * ease;
    curY += (targetY - curY) * ease;
    cursor.style.transform = 'translate(' + curX + 'px,' + curY + 'px) translate(-50%,-50%)';
    requestAnimationFrame(tick);
  })();

  var hoverTargets = document.querySelectorAll('a, .feed-item__frame');
  hoverTargets.forEach(function (el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('is-hover'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hover'); });
  });
});
