import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { stripTypeScriptTypes } from 'node:module';

const component = readFileSync(new URL('../src/components/EditionView.astro', import.meta.url), 'utf8');
const script = stripTypeScriptTypes(component.match(/<script>([\s\S]*?)<\/script>/)[1]);
function element(dataset = {}) {
  const classes = new Set();
  return {dataset, attributes: {}, events: {}, hidden:false,
    classList:{toggle(key, value){ const next=value ?? !classes.has(key);next?classes.add(key):classes.delete(key);return next;},remove(key){classes.delete(key);}},
    setAttribute(key,value){this.attributes[key]=value;},
    addEventListener(event,handler){this.events[event]=handler;},
    closest(){return {querySelector(){return {textContent:'Test story'};}};},
    querySelectorAll(){return [];}
  };
}
for (const mode of ['blocked', 'malformed', 'wrong shape', 'valid']) test(`controls work with ${mode} bookmark storage`, () => {
  const all=element({filter:'All'}), policy=element({filter:'Policy'});
  const stories=[element({category:'Policy'}),element({category:'Research'})];
  const save=element({save:'test'}),menu=element(),nav=element(),select=element(),count=element();
  const localStorage={getItem(){if(mode==='blocked')throw Error('disabled');return mode==='malformed'?'bad':mode==='wrong shape'?'{}':'[]';},setItem(){if(mode==='blocked')throw Error('disabled');}};
  const window={location:{href:''}};
  runInNewContext(script,{localStorage,window,document:{querySelectorAll(s){return {'[data-filter]':[all,policy],'[data-story]':stories,'[data-save]':[save]}[s];},querySelector(s){return {'.result-count':count,'.menu-button':menu,'.nav-links':nav,'#edition-select':select}[s];}}});
  policy.events.click();assert.equal(stories[1].hidden,true);assert.equal(count.textContent,'1 story');
  all.events.click();assert.equal(stories[1].hidden,false);
  save.events.click();assert.equal(save.attributes['aria-pressed'],'true');
  save.events.click();assert.equal(save.attributes['aria-pressed'],'false');
  menu.events.click();assert.equal(menu.attributes['aria-expanded'],'true');
  select.value='/ai-news-brief-astro/editions/2026-09-14/';select.events.change();assert.equal(window.location.href,select.value);
});
