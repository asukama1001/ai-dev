function parseDate(input) {
  const s = input.replace(/\D/g, '');
  if (s.length !== 8) return null;
  const yyyy = s.slice(0, 4);
  const mm   = s.slice(4, 6);
  const dd   = s.slice(6, 8);
  const date = new Date(`${yyyy}-${mm}-${dd}`);
  if (isNaN(date.getTime())) return null;
  return date;
}

function calcCharNo(date) {
  const serial = date.getTime() / 86400000 + 25569;
  let no = (Math.floor(serial) + 8) % 60 + 1;
  if (no === 0) no = 60;
  return no;
}

function showResult(char) {
  const result = document.getElementById('result');
  result.innerHTML = `
    <img class="result-img" src="${char.img}" alt="${char.animal}">
    <div class="result-meta">
      <div class="result-no">No.${char.no}</div>
      <div class="result-name">${char.name}</div>
      <span class="result-animal">${char.animal}</span>
    </div>
    <div class="result-desc-wrap">
      <p class="result-desc">${char.desc}</p>
    </div>
  `;
  result.classList.add('visible');
}

window.addEventListener('load', () => {
  ANIMALS.forEach(char => {
    const img = new Image();
    img.src = char.img;
  });
});

document.getElementById('date').addEventListener('beforeinput', (e) => {
  if (e.data && !/^[0-9０-９]+$/.test(e.data)) e.preventDefault();
});

document.getElementById('date').addEventListener('compositionend', (e) => {
  const el = e.target;
  el.value = el.value
    .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[^0-9]/g, '');
});

document.getElementById('date').addEventListener('input', (e) => {
  const el = e.target;
  const converted = el.value
    .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[^0-9]/g, '');
  if (el.value !== converted) {
    const pos = el.selectionStart - (el.value.length - converted.length);
    el.value = converted;
    el.setSelectionRange(pos, pos);
  }
});

document.getElementById('date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btn').click();
});

document.getElementById('btn').addEventListener('click', () => {
  const input = document.getElementById('date').value.trim();
  const date = parseDate(input);
  if (!date) {
    alert('生年月日を8桁で入力してください（例：19861001）');
    return;
  }
  const no = calcCharNo(date);
  const char = ANIMALS[no - 1];
  showResult(char);
});
