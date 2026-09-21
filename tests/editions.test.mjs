import test from 'node:test';
import assert from 'node:assert/strict';
import { editions } from '../src/data/editions.ts';

test('archive has valid dates, complete stories, unique IDs and newest-first order', () => {
  const slugs = new Set(), ids = new Set();
  let previous = '9999-99-99';
  for (const edition of editions) {
    assert.match(edition.slug, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(edition.slug < previous);
    previous = edition.slug;
    assert.ok(!slugs.has(edition.slug)); slugs.add(edition.slug);
    const date = new Date(`${edition.slug}T12:00:00Z`);
    assert.equal(date.toISOString().slice(0,10), edition.slug);
    assert.equal(date.toLocaleDateString('en-US', {timeZone:'UTC',month:'long',day:'numeric',year:'numeric'}), edition.dateLabel);
    assert.equal(date.toLocaleDateString('en-US', {timeZone:'UTC',weekday:'long'}), edition.dayLabel);
    assert.ok(edition.dek && edition.readingTime && edition.stories.length);
    for (const story of edition.stories) {
      for (const field of ['id','category','source','date','readTime','title','summary','why','url']) assert.ok(typeof story[field] === 'string' && story[field].trim(), `${edition.slug}: ${field}`);
      assert.ok(!ids.has(story.id), story.id); ids.add(story.id);
      assert.equal(new URL(story.url).protocol, 'https:');
    }
  }
});
