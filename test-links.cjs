const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
test('App Store call to action is a navigable anchor',()=>{
 assert.match(html,/<a href="https:\/\/apps.apple.com\/us\/app\/fractal-focus\/id6761763487"[^>]*>\s*View Fractal Focus on the App Store\s*<\/a>/);
 assert.ok(!html.includes('Coming Soon to the App Store'));
});
test('all screenshot references match the versioned asset name',()=>{
 const images=[...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(images.length,2);
 assert.ok(images.every(x=>x==='screenshot-detail.PNG'));
});
