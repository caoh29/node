const fs = require('fs');

const createTableFile = async (base, limit = 10, display) => {
  try {
    let output = '';

    for (let i = 1; i <= limit; i++) {
      if (i === limit) {
        output += `${base} x ${i} = ${base * i}`;
        break;
      }
      output += `${base} x ${i} = ${base * i}\n`;
    }

    fs.writeFileSync(`./tables/table-${base}.txt`, output);
    if (display) console.log(output);
    return `table-${base}.txt`;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createTableFile
}