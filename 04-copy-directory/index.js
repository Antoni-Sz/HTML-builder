
const fs = require('fs');
const path = require('path');

function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  if (fs.existsSync(destDir)) {
    const files = fs.readdirSync(destDir);
    files.forEach((file) => {
      const filePath = path.join(destDir, file);
      fs.unlinkSync(filePath);
    });
    fs.rmdirSync(destDir);
  }


  fs.mkdirSync(destDir);


  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(sourceFile, destFile);
  });
}

copyDir();