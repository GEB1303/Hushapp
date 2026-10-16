const DEFAULTS = { enabled: true, mode: 'blur', ignored: [] };

const $ = id => document.getElementById(id);
const enabledEl = $('enabled');
const modeEl = $('mode');
const entryEl = $('entry');
const listEl = $('list');
const emptyEl = $('empty');

let cfg = { ...DEFAULTS };

function save() {
  chrome.storage.sync.set(cfg);
}

function render() {
  enabledEl.checked = cfg.enabled;
  modeEl.value = cfg.mode;
  listEl.innerHTML = '';
  cfg.ignored.forEach((name, i) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = name;
    const del = document.createElement('button');
    del.textContent = '×';
    del.title = 'Remove';
    del.addEventListener('click', () => {
      cfg.ignored.splice(i, 1);
      save();
      render();
    });
    li.append(span, del);
    listEl.append(li);
  });
  emptyEl.style.display = cfg.ignored.length ? 'none' : 'block';
}

function add() {
  const value = entryEl.value.trim();
  if (!value) return;
  const exists = cfg.ignored.some(x => x.toLowerCase() === value.toLowerCase());
  if (!exists) {
    cfg.ignored.push(value);
    save();
    render();
  }
  entryEl.value = '';
  entryEl.focus();
}

$('add').addEventListener('click', add);
entryEl.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
enabledEl.addEventListener('change', () => { cfg.enabled = enabledEl.checked; save(); });
modeEl.addEventListener('change', () => { cfg.mode = modeEl.value; save(); });

chrome.storage.sync.get(DEFAULTS, data => {
  cfg = { ...DEFAULTS, ...data };
  render();
});
