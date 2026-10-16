// Hushapp — runs only in your browser; nothing is sent to WhatsApp.
const DEFAULTS = { enabled: true, mode: 'blur', ignored: [] };
let cfg = { ...DEFAULTS };

const norm = s => (s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/^~\s*/, '')
  .trim();
const digits = s => (s || '').replace(/\D/g, '');

// WhatsApp stores the sender in: data-pre-plain-text="[12:34, 16/10/2026] Name: "
function senderOf(el) {
  const pre = el.getAttribute('data-pre-plain-text') || '';
  const m = pre.match(/\]\s*(.+?):\s*$/);
  return m ? m[1] : '';
}

function isQuiet(sender) {
  if (!sender) return false;
  const n = norm(sender);
  const d = digits(sender);
  return cfg.ignored.some(entry => {
    const ed = digits(entry);
    // If the entry is a phone number, compare the last 10 digits
    if (ed.length >= 7 && d.length >= 7) {
      return d.slice(-10) === ed.slice(-10);
    }
    return norm(entry) === n;
  });
}

function scan() {
  document.querySelectorAll('div[data-pre-plain-text]').forEach(el => {
    const row = el.closest('[role="row"]') || el.closest('.message-in');
    if (!row) return;
    const hit = cfg.enabled && isQuiet(senderOf(el));
    if (!hit) {
      row.classList.remove('hush-hidden', 'hush-blur', 'hush-revealed');
      return;
    }
    row.classList.toggle('hush-hidden', cfg.mode === 'hide');
    row.classList.toggle('hush-blur', cfg.mode === 'blur' && !row.classList.contains('hush-revealed'));
  });
}

let timer = null;
const scheduleScan = () => {
  clearTimeout(timer);
  timer = setTimeout(scan, 150);
};

// Click a blurred message to reveal it
document.addEventListener('click', e => {
  const row = e.target.closest && e.target.closest('.hush-blur');
  if (!row) return;
  e.preventDefault();
  e.stopPropagation();
  row.classList.remove('hush-blur');
  row.classList.add('hush-revealed');
}, true);

function loadConfig() {
  chrome.storage.sync.get(DEFAULTS, data => {
    cfg = { ...DEFAULTS, ...data };
    document.querySelectorAll('.hush-revealed').forEach(r => r.classList.remove('hush-revealed'));
    scan();
  });
}

chrome.storage.onChanged.addListener(loadConfig);
new MutationObserver(scheduleScan).observe(document.body, { childList: true, subtree: true });
loadConfig();
