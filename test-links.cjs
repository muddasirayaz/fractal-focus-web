const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
test('App Store call to action is a navigable anchor',()=>{
 assert.match(html,/<a href="https:\/\/apps.apple.com\/us\/app\/fractal-focus\/id6761763487"[^>]*>\s*View Fractal Focus on the App Store\s*<\/a>/);
 assert.ok(!html.includes('Coming Soon to the App Store'));
});
test('every screenshot reference names a committed file with its exact case',()=>{
 // GitHub Pages is case-sensitive: "screenshot-detail.png" 404s when the file is "screenshot-detail.PNG".
 const files=new Set(fs.readdirSync(__dirname));
 const images=[...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(images.length,2);
 for(const src of images) assert.ok(files.has(src),`${src} is not a file in the site root`);
});
test('the hero and detail sections show two different screenshots',()=>{
 const images=[...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(images,['screenshot-main.png','screenshot-detail.PNG']);
});
