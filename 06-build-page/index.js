const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = './components';
const STYLES_DIR = './styles';
const ASSETS_DIR = './assets';
const DIST_DIR = './project-dist';


function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}


function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}


function buildStyle() {
  const stylesPath = path.join(__dirname, STYLES_DIR);
  const cssFiles = fs.readdirSync(stylesPath).filter((fileName) => {
    return path.extname(fileName) === '.css';
  });

  let cssContent = '';
  cssFiles.forEach((fileName) => {
    const filePath = path.join(stylesPath, fileName);
    cssContent += readFile(filePath) + '\n';
  });

  return cssContent;
}


function buildHtml(templatePath) {
  let htmlContent = readFile(templatePath);

  const componentsPath = path.join(__dirname, COMPONENTS_DIR);
  const componentFiles = fs.readdirSync(componentsPath).filter((fileName) => {
    return path.extname(fileName) === '.html';
  });

  componentFiles.forEach((fileName) => {
    const componentName = path.basename(fileName, '.html');
    const componentPath = path.join(componentsPath, fileName);
    const componentContent = readFile(componentPath);

    const pattern = new RegExp(`{{${componentName}}}`, 'g');
    htmlContent = htmlContent.replace(pattern, componentContent);
  });

  return htmlContent;
}


if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}


const cssContent = buildStyle();
writeFile(path.join(DIST_DIR, 'style.css'), cssContent);


const htmlContent = buildHtml(path.join(__dirname, 'template.html'));
writeFile(path.join(DIST_DIR, 'index.html'), htmlContent);


const assetsSrcPath = path.join(__dirname, ASSETS_DIR);
const assetsDistPath = path.join(DIST_DIR, 'assets');
if (!fs.existsSync(assetsDistPath)) {
  fs.mkdirSync(assetsDistPath);
}

const assetsFiles = fs.readdirSync(assetsSrcPath);
assetsFiles.forEach((fileName) => {
  const filePath = path.join(assetsSrcPath, fileName);
  if (fs.lstatSync(filePath).isFile()) {
    fs.copyFileSync(filePath, path.join(assetsDistPath, fileName));
  }
});