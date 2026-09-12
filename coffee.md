---
layout: bare
title: Coffee Log
permalink: /coffee/
---

<div class="coffee-page-container">
  <header class="page-header">
    <h1 class="page-title">Coffee Log</h1>
    <p class="page-subtitle">이름을 선택하고 잔 수와 한 잔당 원두 그램 수를 입력해주세요.</p>
  </header>

  <form id="coffee-form" class="coffee-form" autocomplete="off">
    <div class="coffee-field">
      <label for="coffee-name">이름</label>
      <select id="coffee-name" required>
        <option value="" disabled selected>불러오는 중…</option>
      </select>
    </div>

    <div class="coffee-field">
      <label>잔 수</label>
      <div class="coffee-counter">
        <button type="button" class="coffee-counter-btn" data-delta="-1" aria-label="감소">−</button>
        <span id="coffee-cups" class="coffee-counter-value">0</span>
        <button type="button" class="coffee-counter-btn" data-delta="1" aria-label="증가">+</button>
      </div>
    </div>

    <div class="coffee-field">
      <label for="coffee-grams">한 잔당 원두 (g)</label>
      <input type="number" id="coffee-grams" min="0" step="0.1" value="20" required>
    </div>

    <div class="coffee-field">
      <div class="coffee-total">총 <span id="coffee-total-g">0</span> g</div>
    </div>

    <button type="submit" id="coffee-submit" class="coffee-submit" disabled>제출</button>
    <p id="coffee-status" class="coffee-status" role="status" aria-live="polite"></p>
  </form>

  <section id="coffee-summary" class="coffee-summary" hidden>
    <h3><span id="coffee-month-name"></span>님의 이번 달 총 소모량</h3>
    <ul class="coffee-summary-list">
      <li><span class="coffee-summary-label">총 잔 수</span><span class="coffee-summary-value"><strong id="coffee-month-cups">0</strong> 잔</span></li>
      <li><span class="coffee-summary-label">총 원두</span><span class="coffee-summary-value"><strong id="coffee-month-grams">0</strong> g</span></li>
      <li><span class="coffee-summary-label">총액</span><span class="coffee-summary-value"><strong id="coffee-month-cost">0</strong> 원</span></li>
    </ul>

    <h3>최근 5건</h3>
    <ol id="coffee-recent" class="coffee-recent-list"></ol>
  </section>
</div>

<script src="{{ '/assets/js/coffee.js' | relative_url }}"></script>
