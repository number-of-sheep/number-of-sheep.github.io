(function () {
  'use strict';

  const API = 'https://script.google.com/macros/s/AKfycbxGH0cStxJZVNaLKXt4FRM6JcDgmJRRi_LZA1dV1vvLwaF5dr5TZeoTGJF8JZWUZwKd/exec';
  const PRICE_PER_20G = 2000;

  const form       = document.getElementById('coffee-form');
  const nameSel    = document.getElementById('coffee-name');
  const cupsEl     = document.getElementById('coffee-cups');
  const gramsInput = document.getElementById('coffee-grams');
  const totalGEl   = document.getElementById('coffee-total-g');
  const submitBtn  = document.getElementById('coffee-submit');
  const statusEl   = document.getElementById('coffee-status');
  const summaryEl  = document.getElementById('coffee-summary');
  const monthNameEl  = document.getElementById('coffee-month-name');
  const monthCupsEl  = document.getElementById('coffee-month-cups');
  const monthGramsEl = document.getElementById('coffee-month-grams');
  const monthCostEl  = document.getElementById('coffee-month-cost');
  const recentEl   = document.getElementById('coffee-recent');

  let cups = 0;

  function renderCups() {
    cupsEl.textContent = String(cups);
    const g = Number(gramsInput.value) || 0;
    totalGEl.textContent = formatNumber(cups * g);
  }

  function formatNumber(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  function formatWon(n) {
    return n.toLocaleString('ko-KR');
  }

  function formatDate(d) {
    if (typeof d === 'string' && /^\d{2}\.\d{2}\.\d{2} \d{2}:\d{2}$/.test(d)) {
      return d;
    }
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    const yy = String(dt.getFullYear()).slice(-2);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const hh = String(dt.getHours()).padStart(2, '0');
    const mi = String(dt.getMinutes()).padStart(2, '0');
    return `${yy}.${mm}.${dd} ${hh}:${mi}`;
  }

  function setStatus(msg, kind) {
    statusEl.textContent = msg || '';
    statusEl.dataset.kind = kind || '';
  }

  document.querySelectorAll('.coffee-counter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = Number(btn.dataset.delta);
      cups = Math.max(0, cups + delta);
      renderCups();
    });
  });

  gramsInput.addEventListener('input', renderCups);

  const MEMBERS_CACHE_KEY = 'coffee.members.v1';

  function populateMembers(members) {
    nameSel.innerHTML = '<option value="" disabled selected>이름 선택</option>';
    members.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      nameSel.appendChild(opt);
    });
    submitBtn.disabled = false;
  }

  async function loadMembers() {
    const cached = localStorage.getItem(MEMBERS_CACHE_KEY);
    if (cached) {
      try { populateMembers(JSON.parse(cached)); } catch (_) {}
    }

    try {
      const res = await fetch(API);
      const data = await res.json();
      const members = data.members || [];
      const fresh = JSON.stringify(members);
      if (fresh !== cached) {
        localStorage.setItem(MEMBERS_CACHE_KEY, fresh);
        populateMembers(members);
      }
    } catch (err) {
      if (!cached) {
        setStatus('구성원 목록을 불러오지 못했습니다. 새로고침 해주세요.', 'error');
      }
    }
  }

  function renderSummary(payload) {
    monthNameEl.textContent  = payload.name || '';
    monthCupsEl.textContent  = payload.monthCups;
    monthGramsEl.textContent = formatNumber(payload.monthGrams);
    const cost = Math.round(payload.monthGrams / 20 * PRICE_PER_20G);
    monthCostEl.textContent  = formatWon(cost);

    recentEl.innerHTML = '';
    (payload.recent5 || []).forEach(row => {
      const [ts, name, c, gpc, tg, price, memo] = row;
      const li = document.createElement('li');
      li.className = 'coffee-recent-item';
      const memoPart = memo ? ` — ${escapeHtml(memo)}` : '';
      li.innerHTML =
        `<span class="coffee-recent-when">${formatDate(ts)}</span> ` +
        `<span class="coffee-recent-who">${escapeHtml(name)}</span> ` +
        `<span class="coffee-recent-what">${c}잔 · ${formatNumber(Number(tg))}g</span>` +
        `<span class="coffee-recent-memo">${memoPart}</span>`;
      recentEl.appendChild(li);
    });

    summaryEl.hidden = false;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameSel.value;
    const gramsPerCup = Number(gramsInput.value);

    if (!name)  { setStatus('이름을 선택하세요.', 'error'); return; }
    if (cups <= 0) { setStatus('잔 수를 1 이상으로 입력하세요.', 'error'); return; }
    if (!(gramsPerCup > 0)) { setStatus('한 잔당 원두 g을 입력하세요.', 'error'); return; }

    submitBtn.disabled = true;
    setStatus('저장 중…', 'loading');

    try {
      const res = await fetch(API, {
        method: 'POST',
        body: JSON.stringify({ name, cups, gramsPerCup }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      const data = await res.json();
      if (!data.ok) throw new Error('server rejected');

      renderSummary(data);
      setStatus('저장되었습니다.', 'ok');

      cups = 0;
      nameSel.selectedIndex = 0;
      renderCups();
    } catch (err) {
      setStatus('저장에 실패했습니다. 잠시 후 다시 시도하세요.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  renderCups();
  loadMembers();
})();
