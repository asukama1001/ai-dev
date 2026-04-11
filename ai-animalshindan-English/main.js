const KEYWORD_JA = {
  'Ambitious':       '野心家',
  'Intuitive':       '直感的',
  'Lucky':           '強運',
  'Bold':            '大胆',
  'Humble':          '謙虚',
  'Tenacious':       '粘り強い',
  'Sincere':         '誠実',
  'Reliable':        '頼もしい',
  'Energetic':       'エネルギッシュ',
  'Curious':         '好奇心旺盛',
  'Cheerful':        '明るい',
  'Caring':          '思いやり深い',
  'Artistic':        '芸術的',
  'Sociable':        '社交的',
  'Bright':          '快活',
  'Stylish':         'スタイリッシュ',
  'Just':            '正義感強い',
  'Friendly':        '友好的',
  'Leader':          'リーダー気質',
  'Devoted':         '献身的',
  'Passionate':      '情熱的',
  'Warm':            '温かい',
  'Adventurous':     '冒険心旺盛',
  'Positive':        'ポジティブ',
  'Courageous':      '勇敢',
  'Dedicated':       'ひたむき',
  'Meticulous':      '几帳面',
  'Mature':          '大人っぽい',
  'Optimistic':      '楽観的',
  'Patient':         '忍耐強い',
  'Resilient':       '不屈',
  'Analytical':      '分析力抜群',
  'Nurturing':       '面倒見がいい',
  'Intellectual':    '知的',
  'Loyal':           '義理堅い',
  'Trustworthy':     '信頼できる',
  'Methodical':      '計画的',
  'Elegant':         '上品',
  'Adaptable':       '適応力抜群',
  'Clever':          '賢い',
  'Graceful':        '気品ある',
  'Perceptive':      '察しがいい',
  'Supportive':      '支え上手',
  'Dignified':       '風格ある',
  'Polite':          '礼儀正しい',
  'Considerate':     '気配り上手',
  'Calm':            '冷静',
  'Peaceful':        '平和的',
  'Dependable':      '頼れる',
  'Logical':         '論理的',
  'Creative':        '創造的',
  'Unique':          '個性的',
  'Honest':          '正直',
  'Independent':     '自立心強い',
  'Selfless':        '無私',
  'Cooperative':     '協調性抜群',
  'Talented':        '多才',
  'Persuasive':      '説得力抜群',
  'Charismatic':     'カリスマ的',
  'Insightful':      '洞察力抜群',
  'Dynamic':         'ダイナミック',
  'Kind':            '優しい',
  'Approachable':    '親しみやすい',
  'Principled':      '信念が強い',
  'Competitive':     '負けず嫌い',
  'Visionary':       '先見の明がある',
  'Versatile':       '多才',
  'Observant':       '観察眼抜群',
  'Genuine':         '飾らない',
  'Determined':      '意志が強い',
  'Generous':        '寛大',
  'Gentle':          '穏やか',
  'Pure':            '純粋',
  'Sensible':        '感性豊か',
  'Harmonious':      '和を大切に',
  'Spirited':        '気概がある',
  'Proactive':       '積極的',
  'Rational':        '合理的',
  'Fair':            '公平',
  'Innovative':      '革新的',
  'Tolerant':        '包容力がある',
  'Resourceful':     '機転が利く',
  'Uncompromising':  '妥協しない',
  'Proud':           '誇り高い',
  'Expressive':      '表現豊か',
  'Athletic':        '運動神経抜群',
  'Stoic':           'ストイック',
  'Efficient':       '効率的',
  'Free-spirited':   '自由奔放',
  'Compassionate':   '慈悲深い',
};

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
  const keywordHTML = char.keywords
    .map(k => `<span class="keyword-badge">${k}<span class="keyword-ja">${KEYWORD_JA[k] ?? k}</span></span>`)
    .join('');
  result.innerHTML = `
    <img src="${char.img}" alt="${char.animal}">
    <div class="result-no">No.${char.no}</div>
    <div class="result-name">${char.name}</div>
    <div class="result-name-ja">${char.name_ja}</div>
    <span class="result-animal">${char.animal} / ${char.animal_ja}</span>
    <div class="keywords">${keywordHTML}</div>
    <p class="result-desc">${char.desc}</p>
    <p class="result-desc result-desc-ja">${char.desc_ja}</p>
  `;
  result.classList.add('visible');
}

document.getElementById('date').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btn').click();
});

document.getElementById('btn').addEventListener('click', () => {
  const input = document.getElementById('date').value.trim();
  const date = parseDate(input);
  if (!date) {
    alert('Please enter your date of birth as 8 digits (e.g. 19861001)\n生年月日を8桁で入力してください（例：19861001）');
    return;
  }
  const no = calcCharNo(date);
  const char = ANIMALS[no - 1];
  showResult(char);
});
