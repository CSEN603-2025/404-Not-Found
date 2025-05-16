const fs = require('fs');
const path = require('path');

function renameFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      const newFile = path.join(dir, file.replace(/\.tsx$/, '.jsx'));
      fs.renameSync(fullPath, newFile);
      console.log(`Renamed: ${fullPath} → ${newFile}`);
    } else if (file.endsWith('.ts')) {
      const newFile = path.join(dir, file.replace(/\.ts$/, '.js'));
      fs.renameSync(fullPath, newFile);
      console.log(`Renamed: ${fullPath} → ${newFile}`);
    }
  });
}

renameFiles(process.cwd());
