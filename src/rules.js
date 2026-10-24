// Second Look — the rule book.
// Pure functions, no DOM, no network. Shared by the browser app and the Node tests.

/** Scam tactics, each with plain-language explanation and the step it implies. */
export const TACTICS = [
  {
    id: 'urgency',
    name: 'Rush and pressure',
    color: 'amber',
    weight: 2,
    why: 'Scammers rush you so you act before you have time to think or ask someone. Real companies give you time.',
    step: 'Slow down. A real problem will still be there in an hour — nothing here needs an answer right now.',
    patterns: [
      /\b(act|respond|reply|call|pay|click) (now|immediately|today|right away)\b/gi,
      /\bimmediate(ly)?\b/gi,
      /\burgent(ly)?\b/gi,
      /\bwithin (the next )?\d+ ?(hours?|hrs?|minutes?|mins?)\b/gi,
      /\b(final|last) (notice|warning|reminder|chance|attempt)\b/gi,
      /\bexpires? (today|tonight|soon|in \d+)\b/gi,
      /\b(will|may) be (suspended|closed|locked|blocked|deactivated|terminated|cancell?ed|returned to sender)\b/gi,
      /\bas soon as possible\b|\basap\b/gi,
      /\bright (away|now)\b/gi,
      /\bbefore it'?s too late\b/gi,
    ],
  },
  {
    id: 'payment',
    name: 'Unusual way to pay',
    color: 'red',
    weight: 3,
    why: 'Gift cards, crypto, wire transfers and payment apps are almost impossible to get back. No real agency or company asks for them.',
    step: 'Do not pay anything and do not buy gift cards or crypto. If you already paid, call your bank or card company now.',
    patterns: [
      /\b((itunes|apple|google play|steam|amazon|target|walmart|ebay|visa) )?gift ?cards?\b/gi,
      /\b(itunes|google play|steam) cards?\b/gi,
      /\b(bitcoin|btc|crypto(currency)?|usdt|tether|ethereum)\b/gi,
      /\bbitcoin atm\b/gi,
      /\bwire (transfer|the money|money|funds)\b/gi,
      /\b(western union|moneygram|zelle|cash ?app|venmo)\b/gi,
      /\b(small|processing|redelivery|delivery|customs|release|clearance|handling|unlock) fee\b/gi,
      /\bpay (a|the) (small )?fee\b/gi,
      /\$\s?\d+(\.\d{2})? (fee|charge|payment)\b/gi,
    ],
  },
  {
    id: 'credentials',
    name: 'Asks for codes or private details',
    color: 'red',
    weight: 3,
    why: 'Your codes, passwords and ID numbers are the keys to your accounts. Real companies never ask you to send them in a message or call.',
    step: 'Never share a code, password, PIN or ID number. If you already did, change that password and call the company using the number on your card or official app.',
    patterns: [
      /\b(verify|confirm|update|validate) (your )?(account|identity|details|information|info|payment|billing|password)\b/gi,
      /\b(one[- ]time|verification|security|confirmation|6[- ]digit) (code|passcode|password|pin)\b/gi,
      /\b(otp|2fa code)\b/gi,
      /\b(send|share|give|read|tell) (me |us )?(the |that |your )?codes?\b/gi,
      /\b(social security|ssn|national insurance|medicare) (number|card)?\b/gi,
      /\b(bank|card|login|account) (details|number|credentials|info)\b/gi,
      /\b(password|pin number)\b/gi,
    ],
  },
  {
    id: 'impersonation',
    name: 'Pretends to be someone you trust',
    color: 'violet',
    weight: 2,
    why: 'Scammers borrow the name of a bank, delivery company, government office or family member because you already trust them.',
    step: "Contact the person or company yourself using a number or app you already have — not the link or number in this message.",
    patterns: [
      /\b(irs|hmrc|social security administration|medicare|tax office|customs office|police department|the police|fbi|sheriff)\b/gi,
      /\b(usps|ups|fedex|dhl|royal mail|postal service)\b/gi,
      /\b(amazon|paypal|apple|microsoft|netflix|wells fargo|chase|bank of america|your bank)\b( (support|security|team|department|account|customer service))?/gi,
      /\b(fraud|security) (department|team|alert)\b/gi,
      /\b(grandma|grandpa|grandmother|grandfather|nana|mom|mum|dad),? (it'?s|its) me\b/gi,
      /\b(it'?s|its) me\b/gi,
      /\b(this is|here is) my new number\b|\bnew (phone )?number\b/gi,
      /\blost my phone\b/gi,
    ],
  },
  {
    id: 'too-good',
    name: 'Too good to be true',
    color: 'green',
    weight: 2,
    why: 'Prizes you never entered, guaranteed profits and surprise refunds are bait. The "catch" is usually a fee or your details.',
    step: "Don't reply or click to claim anything. Real prizes and refunds don't require you to pay or share details first.",
    patterns: [
      /\byou('ve| have)? (won|been selected|been chosen)\b/gi,
      /\b(winner|lottery|jackpot|sweepstakes|inheritance)\b/gi,
      /\bclaim (your )?(prize|reward|refund|gift|money)\b/gi,
      /\b(guaranteed|risk[- ]free) (returns?|profits?|income)\b/gi,
      /\bdouble your (money|investment)\b/gi,
      /\b(free|exclusive) (gift|iphone|reward)\b/gi,
      /\b(unclaimed|pending) (refund|reward|funds|package)\b/gi,
    ],
  },
  {
    id: 'secrecy',
    name: 'Asks you to keep it secret',
    color: 'violet',
    weight: 3,
    why: "Being told not to tell anyone is a huge red flag. Scammers isolate you because a friend or relative would spot the trick.",
    step: 'Tell someone you trust right now. Anyone who asks you to keep money matters secret is not on your side.',
    patterns: [
      /\b(don'?t|do not) tell (anyone|anybody|mom|mum|dad|your (family|bank|kids|children))\b/gi,
      /\bkeep (this|it) (between us|secret|confidential|quiet|private)\b/gi,
      /\b(don'?t|do not) (contact|call|tell) (the|your) (bank|police)\b/gi,
      /\b(don'?t|do not) hang up\b/gi,
      /\bembarrass(ed|ing)\b/gi,
    ],
  },
  {
    id: 'threat',
    name: 'Threats and fear',
    color: 'red',
    weight: 2,
    why: 'Threats of arrest, fines or legal trouble are meant to scare you into paying. Real agencies send letters and never demand instant payment.',
    step: "Don't respond to threats. Look up the agency's official number yourself and ask whether there is any real problem.",
    patterns: [
      /\b(arrest(ed)?|warrant|jail|prison|bail|deport(ed|ation)?)\b/gi,
      /\b(legal action|lawsuit|sued|court)\b/gi,
      /\b(penalt(y|ies)|fined|a fine of)\b/gi,
      /\b(in trouble|accident|hospital)\b/gi,
    ],
  },
];

export const TACTIC_BY_ID = Object.fromEntries(TACTICS.map((t) => [t.id, t]));

/** Find every tactic phrase in the text with its position. Overlaps are merged (first match wins). */
export function findPhrases(text) {
  const raw = [];
  TACTICS.forEach((tactic, order) => {
    for (const re of tactic.patterns) {
      re.lastIndex = 0;
      for (const m of text.matchAll(re)) {
        if (!m[0].trim()) continue;
        raw.push({ tactic: tactic.id, start: m.index, end: m.index + m[0].length, text: m[0], order });
      }
    }
  });
  raw.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start) || a.order - b.order);
  const merged = [];
  for (const r of raw) {
    const last = merged[merged.length - 1];
    if (last && r.start < last.end) {
      if (r.end > last.end && r.tactic === last.tactic) {
        last.end = r.end;
        last.text = text.slice(last.start, last.end);
      }
      continue;
    }
    merged.push({ tactic: r.tactic, start: r.start, end: r.end, text: r.text });
  }
  return merged;
}

/** Map a numeric score and tactic set to a level. */
export function levelFor(score, tacticIds) {
  const has = (id) => tacticIds.includes(id);
  if (has('payment') && (has('urgency') || has('threat') || has('secrecy'))) return 'high';
  if (has('credentials') && (has('urgency') || has('impersonation'))) return 'high';
  if (score >= 5) return 'high';
  if (score >= 2) return 'caution';
  return 'low';
}

export const LEVEL_TEXT = {
  low: {
    label: 'Low risk',
    advice: "No common warning signs found. That doesn't guarantee it's safe — if it asks for money or codes, check another way first.",
  },
  caution: {
    label: 'Be careful',
    advice: 'This has some warning signs. Before you reply, click or pay, check with the sender using a number or app you already trust.',
  },
  high: {
    label: 'High risk',
    advice: 'This looks like a scam. Do not reply, click links, pay or share codes. Good instinct to check.',
  },
};

/** Analyze a message. Returns everything the page needs to render. */
export function analyze(text) {
  const input = String(text ?? '');
  const links = extractLinks(input).map((l) => ({ ...l, ...inspectLink(l.url) }));
  // Words inside a link are explained by the link card instead of a tactic card.
  const phrases = findPhrases(input).filter((p) => !links.some((l) => p.start < l.end && p.end > l.start));
  const tacticIds = TACTICS.map((t) => t.id).filter((id) => phrases.some((p) => p.tactic === id));
  const riskyLinks = links.filter((l) => l.risky);
  let score = tacticIds.reduce((sum, id) => sum + TACTIC_BY_ID[id].weight, 0);
  if (riskyLinks.length) score += 3;
  let level = levelFor(score, tacticIds);
  if (riskyLinks.length && ['urgency', 'payment', 'credentials', 'impersonation', 'too-good'].some((id) => tacticIds.includes(id))) level = 'high';
  const findings = tacticIds.map((id) => ({
    tactic: id,
    name: TACTIC_BY_ID[id].name,
    why: TACTIC_BY_ID[id].why,
    color: TACTIC_BY_ID[id].color,
    words: [...new Set(phrases.filter((p) => p.tactic === id).map((p) => p.text))],
  }));
  const result = { level, score, phrases, findings, links, signCount: findings.length + (riskyLinks.length ? 1 : 0) };
  result.steps = nextSteps(result);
  return result;
}

// ---------------------------------------------------------------------------
// Link checker: where would this link really take you?

export const BRANDS = [
  { name: 'USPS', token: 'usps', sites: ['usps.com'] },
  { name: 'PayPal', token: 'paypal', sites: ['paypal.com'] },
  { name: 'Amazon', token: 'amazon', sites: ['amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.de', 'amazon.com.au'] },
  { name: 'Apple', token: 'apple', sites: ['apple.com', 'icloud.com'] },
  { name: 'iCloud', token: 'icloud', sites: ['icloud.com', 'apple.com'] },
  { name: 'Microsoft', token: 'microsoft', sites: ['microsoft.com', 'live.com', 'office.com'] },
  { name: 'Netflix', token: 'netflix', sites: ['netflix.com'] },
  { name: 'FedEx', token: 'fedex', sites: ['fedex.com'] },
  { name: 'UPS', token: 'ups', sites: ['ups.com'] },
  { name: 'DHL', token: 'dhl', sites: ['dhl.com'] },
  { name: 'Chase', token: 'chase', sites: ['chase.com'] },
  { name: 'Wells Fargo', token: 'wellsfargo', sites: ['wellsfargo.com'] },
  { name: 'Bank of America', token: 'bankofamerica', sites: ['bankofamerica.com'] },
  { name: 'the IRS', token: 'irs', sites: ['irs.gov'] },
  { name: 'Google', token: 'google', sites: ['google.com'] },
  { name: 'Facebook', token: 'facebook', sites: ['facebook.com'] },
  { name: 'WhatsApp', token: 'whatsapp', sites: ['whatsapp.com'] },
  { name: 'Coinbase', token: 'coinbase', sites: ['coinbase.com'] },
  { name: 'Royal Mail', token: 'royalmail', sites: ['royalmail.com'] },
];

const SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'cutt.ly', 'rb.gy', 'ow.ly', 'buff.ly', 't.ly', 'shorturl.at', 'tiny.cc', 'rebrand.ly'];
const ODD_TLDS = ['top', 'xyz', 'icu', 'click', 'zip', 'mov', 'loan', 'work', 'support', 'rest', 'cfd', 'sbs', 'buzz', 'cyou', 'monster', 'quest', 'help', 'live', 'vip', 'win', 'bond', 'gq', 'tk', 'ml', 'cf', 'ga'];
const SECOND_LEVEL = ['co.uk', 'org.uk', 'gov.uk', 'ac.uk', 'com.au', 'net.au', 'co.nz', 'co.jp', 'com.br', 'co.in', 'com.mx'];
const COMMON_TLDS = ['com', 'net', 'org', 'gov', 'edu', 'io', 'co', 'us', 'uk', 'ca', 'info', 'me', 'ly', 'gl', 'gd', 'at', 'cc'];

/** The part of a host name that actually decides which site you're on (e.g. help-center.top). */
export function siteOf(host) {
  const labels = host.toLowerCase().replace(/\.$/, '').split('.');
  if (labels.length <= 2) return labels.join('.');
  const lastTwo = labels.slice(-2).join('.');
  return SECOND_LEVEL.includes(lastTwo) ? labels.slice(-3).join('.') : lastTwo;
}

/** Undo common look-alike swaps: 0→o, 1→l, rn→m, etc. */
function unLookalike(s) {
  return s.toLowerCase().replace(/rn/g, 'm').replace(/vv/g, 'w').replace(/0/g, 'o').replace(/[1|!]/g, 'l').replace(/3/g, 'e').replace(/5/g, 's').replace(/4/g, 'a').replace(/7/g, 't');
}

/** Find links (with or without http://) in a message, with their positions. */
export function extractLinks(text) {
  const tlds = [...new Set([...COMMON_TLDS, ...ODD_TLDS])].join('|');
  const re = new RegExp(String.raw`\b(?:https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|(?:[a-z0-9-]+\.)+(?:${tlds})(?:\/[^\s<>"']*)?(?![a-z0-9-]))`, 'gi');
  const out = [];
  for (const m of String(text).matchAll(re)) {
    let url = m[0].replace(/[.,;:!?)\]]+$/, '');
    if (!url.includes('.')) continue;
    out.push({ url, start: m.index, end: m.index + url.length });
  }
  return out;
}

/** Explain where a link really goes and what looks wrong with it. */
export function inspectLink(url) {
  const issues = [];
  let rest = url.replace(/^https?:\/\//i, '');
  const isHttp = /^http:\/\//i.test(url);
  const authority = rest.split(/[/?#]/)[0];
  let hostPart = authority;
  if (authority.includes('@')) {
    hostPart = authority.slice(authority.lastIndexOf('@') + 1);
  }
  const host = hostPart.replace(/:\d+$/, '').toLowerCase();
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
  const site = isIp ? host : siteOf(host);
  const tld = host.split('.').pop();

  if (authority.includes('@')) issues.push(`Everything before the “@” is ignored by your browser. The link really opens ${host}.`);
  if (isIp) issues.push('It uses a bare number address instead of a company name. Real companies don’t do this.');
  if (host.split('.').some((l) => l.startsWith('xn--'))) issues.push('It uses special characters that can imitate normal letters (a “look-alike” address).');
  if (SHORTENERS.includes(site) || SHORTENERS.includes(host)) issues.push('It is a shortened link, which hides where it really goes.');

  const known = BRANDS.find((b) => b.sites.includes(site));
  if (!known && !isIp) {
    const siteLabel = unLookalike(site.split('.')[0]);
    const lookalike = BRANDS.find((b) => siteLabel === b.token || siteLabel.replace(/-/g, '') === b.token);
    if (lookalike) {
      issues.push(`It is spelled to look like ${lookalike.name}, but ${site} is not ${lookalike.name}’s real website.`);
    } else {
      const hostNorm = unLookalike(host).replace(/-/g, '.');
      const mention = BRANDS.find((b) => hostNorm.split('.').includes(b.token) || (b.token.length >= 5 && hostNorm.includes(b.token)));
      if (mention) issues.push(`It mentions ${mention.name}, but the site you would actually visit is ${site} — not ${mention.name}.`);
      else {
        // A fake website name glued to the front, e.g. "post-office.com-help.example.top": the real site is at the end.
        const front = host.replace(/^www\./, '').match(/^([a-z0-9-]+\.(?:com|org|net|gov|co))(?=[-.])/);
        if (front && front[1] !== site) issues.push(`It starts with “${front[1]}”, but the site you would actually visit is ${site}.`);
      }
    }
  }
  if (ODD_TLDS.includes(tld) && !known) issues.push(`It ends in “.${tld}”, an ending that scam sites use far more often than real companies.`);
  if (host.split('.').length > 4 || (host.replace(/xn--/g, '').match(/-/g) || []).length >= 3) issues.push('The address is unusually long and complicated, a common trick to hide the real site.');
  if (isHttp && !issues.length) issues.push('It is not a secure (https) link.');

  return { url, host, site, issues, risky: issues.length > 0, brand: known ? known.name : null };
}

// ---------------------------------------------------------------------------
// What to do next, and a note for someone you trust.

const STEP_ORDER = ['payment', 'credentials', 'secrecy', 'link', 'impersonation', 'threat', 'urgency', 'too-good'];
const LINK_STEP = "Don't tap the link. If you're worried about an account or a delivery, open the company's official app or type its website address yourself.";

/** Turn what was found into a short, ordered action list. */
export function nextSteps(result) {
  if (result.level === 'low' && result.signCount === 0) {
    return [
      'Nothing here matches common scam tactics, but trust your instinct.',
      'If this message later asks for money, codes or personal details, check with the sender using a number or app you already have.',
    ];
  }
  const found = new Set(result.findings.map((f) => f.tactic));
  if (result.links.some((l) => l.risky)) found.add('link');
  const tacticSteps = STEP_ORDER.filter((id) => found.has(id)).map((id) => (id === 'link' ? LINK_STEP : TACTIC_BY_ID[id].step));
  return [
    "Don't reply to the message — even \"STOP\" tells the sender your number is active.",
    ...tacticSteps.slice(0, 4),
    'Already paid or shared something? Call your bank or card company now, then report it (in the US: ReportFraud.ftc.gov).',
  ];
}

/** A ready-to-paste note asking a trusted person for a second opinion. */
export function buildTrustedNote(text, result) {
  const reasons = result.findings.map((f) => f.name.toLowerCase());
  const risky = result.links.filter((l) => l.risky);
  if (risky.length) reasons.push(`a suspicious link (it really goes to ${risky.map((l) => l.site).join(', ')})`);
  const verdict = LEVEL_TEXT[result.level].label;
  const summary = reasons.length
    ? `Second Look rated it "${verdict}" and flagged: ${reasons.join('; ')}.`
    : 'Second Look did not find common warning signs, but I want to be sure.';
  return [
    "Hi, I got this message and I'm not sure about it. Could you take a look before I do anything?",
    summary,
    '',
    '--- The message ---',
    String(text).trim(),
  ].join('\n');
}
