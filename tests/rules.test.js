import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyze, findPhrases, TACTICS } from '../src/rules.js';
import { SAMPLES } from '../src/samples.js';

const sample = (id) => SAMPLES.find((s) => s.id === id).text;
const tactics = (r) => r.findings.map((f) => f.tactic);

test('package delivery sample is high risk with urgency and payment', () => {
  const r = analyze(sample('package'));
  assert.equal(r.level, 'high');
  assert.ok(tactics(r).includes('urgency'));
  assert.ok(tactics(r).includes('payment'));
  assert.ok(tactics(r).includes('impersonation'));
});

test('grandchild sample is high risk with secrecy, payment and impersonation', () => {
  const r = analyze(sample('grandchild'));
  assert.equal(r.level, 'high');
  for (const t of ['secrecy', 'payment', 'impersonation', 'urgency']) assert.ok(tactics(r).includes(t), t);
});

test('normal pharmacy reminder stays low risk', () => {
  const r = analyze(sample('pharmacy'));
  assert.equal(r.level, 'low');
  assert.equal(r.signCount, 0);
});

test('everyday phrases do not trigger', () => {
  for (const text of ["I'm fine, see you at dinner!", 'Your order has shipped and will arrive Tuesday.', 'Thanks for coming to book club.']) {
    assert.equal(analyze(text).level, 'low', text);
  }
});

test('credential request + impersonation is high', () => {
  const r = analyze('PayPal security team: please verify your account and send us the 6-digit code we texted you.');
  assert.equal(r.level, 'high');
  assert.ok(tactics(r).includes('credentials'));
});

test('phrase positions match the original text and do not overlap', () => {
  const text = sample('grandchild');
  const phrases = findPhrases(text);
  let last = -1;
  for (const p of phrases) {
    assert.equal(text.slice(p.start, p.end), p.text);
    assert.ok(p.start >= last);
    last = p.end;
  }
});

test('empty input is safe', () => {
  assert.equal(analyze('').level, 'low');
  assert.equal(analyze(undefined).signCount, 0);
});

test('every tactic explains itself and has a next step', () => {
  for (const t of TACTICS) {
    assert.ok(t.why.length > 30, t.id);
    assert.ok(t.step.length > 20, t.id);
  }
});

import { inspectLink, extractLinks, siteOf } from '../src/rules.js';

test('brand placed in front of a different site is flagged with the real site', () => {
  const r = inspectLink('https://usps.com-redelivery.help-center.top/track');
  assert.equal(r.site, 'help-center.top');
  assert.ok(r.risky);
  assert.match(r.issues.join(' '), /help-center\.top/);
});

test('look-alike spelling is flagged', () => {
  assert.match(inspectLink('paypa1.com/login').issues.join(' '), /look like PayPal/);
  assert.match(inspectLink('https://arnazon.com').issues.join(' '), /look like Amazon/);
});

test('punycode, IP, shortener, @-trick and odd TLD are flagged', () => {
  assert.ok(inspectLink('https://xn--pple-43d.com').risky);
  assert.ok(inspectLink('http://192.168.4.20/bank').risky);
  assert.ok(inspectLink('bit.ly/3xYz').risky);
  assert.match(inspectLink('https://www.paypal.com@secure-login.ru/x').issues.join(' '), /secure-login\.ru/);
  assert.ok(inspectLink('free-prize.xyz').risky);
});

test('genuine company links have no issues', () => {
  for (const u of ['https://www.usps.com/track', 'https://www.amazon.co.uk/orders', 'https://accounts.google.com/', 'https://www.irs.gov/refunds']) {
    assert.deepEqual(inspectLink(u).issues, [], u);
  }
});

test('extractLinks finds bare and full links with positions and trims punctuation', () => {
  const text = 'Go to www.chase.com, or paypa1.com/login. Thanks, Mr.Smith';
  const links = extractLinks(text);
  assert.deepEqual(links.map((l) => l.url), ['www.chase.com', 'paypa1.com/login']);
  for (const l of links) assert.equal(text.slice(l.start, l.end), l.url);
});

test('siteOf handles two-part country endings', () => {
  assert.equal(siteOf('secure.login.amazon.co.uk'), 'amazon.co.uk');
  assert.equal(siteOf('a.b.example.com'), 'example.com');
});

test('a risky link raises the verdict and words inside it are not double-counted', () => {
  const r = analyze('Your refund is ready: amazon-refunds.support');
  assert.ok(r.links[0].risky);
  assert.equal(r.phrases.filter((p) => p.text.toLowerCase() === 'amazon').length, 0);
  assert.notEqual(r.level, 'low');
});
