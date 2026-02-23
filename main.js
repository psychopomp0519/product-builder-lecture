function getColorClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-10';
  if (num <= 30) return 'range-20';
  if (num <= 40) return 'range-30';
  return 'range-40';
}

function draw() {
  const ballsContainer = document.getElementById('balls');
  ballsContainer.innerHTML = '';

  const numbers = [];
  while (numbers.length < 7) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }

  const main = numbers.slice(0, 6).sort((a, b) => a - b);
  const bonus = numbers[6];

  main.forEach((num, i) => {
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = `ball ${getColorClass(num)}`;
      ball.textContent = num;
      ballsContainer.appendChild(ball);
    }, i * 200);
  });

  setTimeout(() => {
    const ball = document.createElement('div');
    ball.className = `ball bonus ${getColorClass(bonus)}`;
    ball.textContent = bonus;
    ballsContainer.appendChild(ball);
  }, 6 * 200);
}
