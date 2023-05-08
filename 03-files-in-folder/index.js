const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileName = path.parse(filePath).name;
        const fileExt = path.parse(filePath).ext.slice(1);
        const fileSize = stats.size / 1000;

        console.log(`${fileName} - ${fileExt} - ${fileSize.toFixed(3)}kb`);
      }
    });
  });
});