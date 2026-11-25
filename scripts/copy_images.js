const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('c:/Users/gunde/OneDrive/Desktop/Ishuu nails Web');
const prodDir = path.resolve('c:/Users/gunde/OneDrive/Desktop/Ishuu nails Web/sleek-polish/public/images/products');
const portDir = path.resolve('c:/Users/gunde/OneDrive/Desktop/Ishuu nails Web/sleek-polish/public/images/portfolio');

if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });
if (!fs.existsSync(portDir)) fs.mkdirSync(portDir, { recursive: true });

// Copy all nails*.jpg directly
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('nails') && f.endsWith('.jpg'));
console.log('Found nail files in root:', files);

files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(prodDir, f));
  fs.copyFileSync(path.join(srcDir, f), path.join(portDir, f));
});

// Map to descriptive names as well
const mappings = {
  'nails1.1.jpg': 'peacock-silver-1.jpg',
  'nails1.2.jpg': 'peacock-silver-2.jpg',
  'nails2.1.jpg': 'leopard-rose-gold-1.jpg',
  'nails2.2.jpg': 'leopard-rose-gold-2.jpg',
  'nails3.1.jpg': 'cat-eye-flower-1.jpg',
  'nails4.1.jpg': 'pink-glazed-swirl-1.jpg',
  'nails5.1.jpg': 'magenta-flame-flower-1.jpg',
  'nails6.2.jpg': 'polka-dot-french-1.jpg',
  'nails7.1.jpg': 'pool-trio-lifestyle.jpg',
  'nails8.1.jpg': 'liquid-gold-mirror-1.jpg',
  'nails9.1.jpg': 'lemon-star-flower-1.jpg',
  'nails9.2.jpg': 'lemon-star-flower-2.jpg',
  'nails10.1.jpg': 'espresso-cream-cuff-1.jpg',
  'nails11.1.jpg': 'rose-glitter-chunky-cuff-1.jpg',
  'nails11.2.jpg': 'rose-glitter-chunky-cuff-2.jpg',
};

for (const [srcName, destName] of Object.entries(mappings)) {
  const fullSrc = path.join(srcDir, srcName);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, path.join(prodDir, destName));
    fs.copyFileSync(fullSrc, path.join(portDir, destName));
    console.log(`Copied ${srcName} -> ${destName}`);
  } else {
    console.warn(`Source not found: ${srcName}`);
  }
}

console.log('Final public/images/products contents:');
console.log(fs.readdirSync(prodDir));
