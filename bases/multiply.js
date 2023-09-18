const fs = require('fs');

const base = 3;
const max = 10;
let output = '';

for (let i = 1; i <= max; i++) {
  if (i === max) {
    output += `${base} x ${i} = ${base * i}`;
    break;
  }
  output += `${base} x ${i} = ${base * i}\n`;
}

fs.writeFileSync(`table-${base}.txt`, output);