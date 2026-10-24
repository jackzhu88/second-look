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
  const phrases = findPhrases(input);
  const tacticIds = TACTICS.map((t) => t.id).filter((id) => phrases.some((p) => p.tactic === id));
  let score = tacticIds.reduce((sum, id) => sum + TACTIC_BY_ID[id].weight, 0);
  const level = levelFor(score, tacticIds);
  const findings = tacticIds.map((id) => ({
    tactic: id,
    name: TACTIC_BY_ID[id].name,
    why: TACTIC_BY_ID[id].why,
    color: TACTIC_BY_ID[id].color,
    words: [...new Set(phrases.filter((p) => p.tactic === id).map((p) => p.text))],
  }));
  return { level, score, phrases, findings, signCount: findings.length };
}
