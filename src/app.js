// Second Look — page wiring. All analysis happens in rules.js, on this device.
import { analyze, LEVEL_TEXT, TACTIC_BY_ID } from './rules.js';
import { SAMPLES } from './samples.js';

const $ = (id) => document.getElementById(id);
const els = {
  message: $('message'), check: $('check'), clear: $('clear'), hint: $('empty-hint'),
  results: $('results'), verdict: $('verdict'), title: $('verdict-title'), count: $('verdict-count'),
  advice: $('verdict-advice'), highlighted: $('highlighted'), legend: $('legend'),
  findings: $('findings'),
};

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) if (c != null) node.append(c); // strings become text nodes (safe)
  return node;
}

/** Reprint the message with tactic phrases wrapped in <mark>. User text only ever goes in via text nodes. */
function renderHighlighted(text, phrases) {
  els.highlighted.replaceChildren();
  let pos = 0;
  for (const p of phrases) {
    if (p.start > pos) els.highlighted.append(text.slice(pos, p.start));
    const tactic = TACTIC_BY_ID[p.tactic];
    els.highlighted.append(el('mark', {
      class: tactic.color, title: `${tactic.name} — tap to see why`, tabindex: '0', role: 'button',
      'data-tactic': p.tactic,
      onclick: () => focusFinding(p.tactic),
      onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focusFinding(p.tactic); } },
    }, text.slice(p.start, p.end)));
    pos = p.end;
  }
  if (pos < text.length) els.highlighted.append(text.slice(pos));
}

function renderLegend(findings) {
  els.legend.replaceChildren(...findings.map((f) => el('span', { class: f.color }, f.name)));
}

/** One card per tactic found: name, the exact words, and why scammers use it. */
function renderFindings(findings) {
  if (!findings.length) {
    els.findings.replaceChildren(el('li', { class: 'none' }, 'Nothing from our list of scam tactics showed up in this message.'));
    return;
  }
  els.findings.replaceChildren(...findings.map((f) => el('li', { class: `finding ${f.color}`, id: `finding-${f.tactic}`, tabindex: '-1' },
    el('h4', {}, f.name),
    el('div', { class: 'words' }, 'Found: ', ...f.words.flatMap((w, i) => [i ? ', ' : '', el('q', {}, w)])),
    el('p', {}, f.why),
  )));
}

/** Tapping a highlight brings its explanation into view. */
function focusFinding(tacticId) {
  const card = document.getElementById(`finding-${tacticId}`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.focus({ preventScroll: true });
  card.classList.add('flash');
  setTimeout(() => card.classList.remove('flash'), 1200);
}

function renderVerdict(result) {
  const lv = LEVEL_TEXT[result.level];
  els.verdict.className = `verdict ${result.level}`;
  els.title.textContent = lv.label;
  els.count.textContent = result.signCount === 0
    ? 'No common warning signs found'
    : `${result.signCount} warning sign${result.signCount === 1 ? '' : 's'} found`;
  els.advice.textContent = lv.advice;
}

function runCheck() {
  const text = els.message.value;
  if (!text.trim()) {
    els.hint.hidden = false;
    els.results.hidden = true;
    els.message.focus();
    return;
  }
  els.hint.hidden = true;
  const result = analyze(text);
  renderVerdict(result);
  renderHighlighted(text, result.phrases);
  renderLegend(result.findings);
  renderFindings(result.findings);
  els.results.hidden = false;
  els.verdict.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

for (const s of SAMPLES) {
  $('sample-buttons').append(el('button', {
    class: 'chip', type: 'button',
    onclick: () => { els.message.value = s.text; runCheck(); },
  }, s.label));
}
els.check.addEventListener('click', runCheck);
els.clear.addEventListener('click', () => {
  els.message.value = '';
  els.results.hidden = true;
  els.hint.hidden = true;
  els.message.focus();
});
els.message.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) runCheck();
});
