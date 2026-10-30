import { test } from "node:test";
import assert from "node:assert/strict";
import { hasSections, matchLocale, sectionHref, variantPrefix } from "./i18n.ts";

test("matchLocale follows the visitor's ranking", () => {
  assert.equal(matchLocale("th;q=0.9, en;q=0.8"), "th");
  assert.equal(matchLocale("en-GB,en;q=0.9,th;q=0.8"), "en");
  assert.equal(matchLocale("de, th-TH;q=0.5"), "th");
  // A malformed q= must not outrank a well-formed one.
  assert.equal(matchLocale("th;q=abc, en;q=0.1"), "en");
  assert.equal(matchLocale("de, fr"), null);
  assert.equal(matchLocale(null), null);
});

test("only a real variant counts as one", () => {
  assert.equal(variantPrefix("/en/for/dba"), "/for/dba");
  assert.equal(variantPrefix("/en/for/dba/missing"), "/for/dba");
  assert.equal(variantPrefix("/en/for/DBA"), "");
  assert.equal(variantPrefix("/en"), "");
});

test("section links point home from a page without the sections", () => {
  assert.equal(hasSections("/th"), true);
  assert.equal(hasSections("/th/for/dba"), true);
  assert.equal(hasSections("/th/for/nope"), false);
  assert.equal(sectionHref("/th", "th", "#projects"), "#projects");
  assert.equal(sectionHref("/th/nope", "th", "#projects"), "/th#projects");
  assert.equal(sectionHref("/en/for/dba/nope", "en", "#about"), "/en/for/dba#about");
  assert.equal(sectionHref("/en/for/nope", "en", "#about"), "/en#about");
});
