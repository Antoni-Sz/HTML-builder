const fs = require('fs');
const path = require('path');

function mergeStyles() {
  const sourceDir = path.join(__dirname, 'styles');
  const destDir = path.join(__dirname, 'project-dist');


  if (fs.existsSync(destDir)) {
    const files = fs.readdirSync(destDir);
    files.forEach((file) => {
      const filePath = path.join(destDir, file);
      fs.unlinkSync(filePath);
    });
    fs.rmdirSync(destDir);
  }


  fs.mkdirSync(destDir);

  let styles = '';
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.css') {
      const filePath = path.join(sourceDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      styles += fileContent;
    }
  });


  const destFile = path.join(destDir, 'bundle.css');
  fs.writeFileSync(destFile, styles);
}

mergeStyles();