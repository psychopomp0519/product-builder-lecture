function getColorClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-10';
  if (num <= 30) return 'range-20';
  if (num <= 40) return 'range-30';
  return 'range-40';
}

var drawHistory = [];

function draw() {
  var ballsContainer = document.getElementById('balls');
  ballsContainer.innerHTML = '';

  var numbers = [];
  while (numbers.length < 7) {
    var n = Math.floor(Math.random() * 45) + 1;
    if (numbers.indexOf(n) === -1) numbers.push(n);
  }

  var main = numbers.slice(0, 6).sort(function(a, b) { return a - b; });
  var bonus = numbers[6];

  main.forEach(function(num, i) {
    setTimeout(function() {
      var ball = document.createElement('div');
      ball.className = 'ball ' + getColorClass(num);
      ball.textContent = num;
      ballsContainer.appendChild(ball);
    }, i * 200);
  });

  setTimeout(function() {
    var ball = document.createElement('div');
    ball.className = 'ball bonus ' + getColorClass(bonus);
    ball.textContent = bonus;
    ballsContainer.appendChild(ball);
  }, 6 * 200);

  drawHistory.unshift({ main: main, bonus: bonus });
  if (drawHistory.length > 5) drawHistory.pop();

  setTimeout(function() {
    renderHistory();
  }, 7 * 200);
}

function renderHistory() {
  var container = document.getElementById('history');
  if (!container || drawHistory.length < 2) return;

  var html = '<p class="history-title">최근 추첨 이력</p>';
  for (var i = 1; i < drawHistory.length; i++) {
    var entry = drawHistory[i];
    html += '<div class="history-item">';
    for (var j = 0; j < entry.main.length; j++) {
      html += '<div class="history-ball ' + getColorClass(entry.main[j]) + '">' + entry.main[j] + '</div>';
    }
    html += '<div class="history-ball bonus ' + getColorClass(entry.bonus) + '">' + entry.bonus + '</div>';
    html += '</div>';
  }
  container.innerHTML = html;
}

function toggleTheme() {
  var body = document.body;
  var btn = document.getElementById('themeBtn');
  body.classList.toggle('light');
  var isLight = body.classList.contains('light');
  btn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

(function initTheme() {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    var btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '🌙';
  }
})();
