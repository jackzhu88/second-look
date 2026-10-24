// Second Look — page wiring. All analysis happens in rules.js, on this device.
import { analyze, LEVEL_TEXT, TACTIC_BY_ID } from './rules.js';
import { SAMPLES } from './samples.js';

const $ = (id) => document.getElementById(id);
const els = {
  message: $('message'), check: $('check'), clear: $('clear'), hint: $('empty-hint'),
  results: $('results'), verdict: $('verdict'), title: $('verdict-title'), count: $('verdict-count'),
  advice: $('verdict-advice'), highlighted: $('highlighted'), legend: $('legend'),
  findings: $('findings'), linksBlock: $('links-block'), links: $('links'),
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

function markLink(text, link, i) {
  const go = () => focusCard(`link-${i}`);
  return el('mark', {
    class: link.risky ? 'link' : 'link-ok', title: link.risky ? 'Suspicious link — tap to see why' : 'Link',
    tabindex: '0', role: 'button', onclick: go,
    onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } },
  }, text.slice(link.start, link.end));
}

/** Reprint the message with tactic phrases and links wrapped in <mark>. User text only ever goes in via text nodes. */
function renderHighlighted(text, phrases, links = []) {
  els.highlighted.replaceChildren();
  const spans = [...phrases.map((p) => ({ ...p, kind: 'tactic' })), ...links.map((l, i) => ({ ...l, kind: 'link', i }))]
    .sort((a, b) => a.start - b.start);
  let pos = 0;
  for (const p of spans) {
    if (p.start < pos) continue;
    if (p.start > pos) els.highlighted.append(text.slice(pos, p.start));
    if (p.kind === 'link') { els.highlighted.append(markLink(text, p, p.i)); pos = p.end; continue; }
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

function renderLegend(findings, links = []) {
  const items = findings.map((f) => el('span', { class: f.color }, f.name));
  if (links.some((l) => l.risky)) items.push(el('span', { class: 'red' }, 'Suspicious link (dotted)'));
  els.legend.replaceChildren(...items);
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
function focusFinding(tacticId) { focusCard(`finding-${tacticId}`); }

function focusCard(id) {
  const card = document.getElementById(id);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.focus({ preventScroll: true });
  card.classList.add('flash');
  setTimeout(() => card.classList.remove('flash'), 1200);
}

/** Link cards: the real site you'd visit, and what looks wrong. */
function renderLinks(links) {
  els.linksBlock.hidden = links.length === 0;
  els.links.replaceChildren(...links.map((l, i) => el('li', { class: `link-item${l.risky ? '' : ' ok'}`, id: `link-${i}`, tabindex: '-1' },
    el('h4', {}, l.risky ? 'Don’t tap this link' : 'Link looks ordinary'),
    el('p', {}, 'You would really be visiting ', el('span', { class: 'site' }, l.site), l.brand ? ` (${l.brand}’s real website).` : '.'),
    l.risky
      ? el('ul', {}, ...l.issues.map((t) => el('li', {}, t)))
      : el('p', { class: 'small muted' }, 'No obvious tricks in this address — still, only open it if you expected this message.'),
  )));
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
  renderHighlighted(text, result.phrases, result.links);
  renderLegend(result.findings, result.links);
  renderFindings(result.findings);
  renderLinks(result.links);
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
