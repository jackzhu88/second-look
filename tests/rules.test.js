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
