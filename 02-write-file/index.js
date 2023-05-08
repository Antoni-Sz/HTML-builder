const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filename = 'output.txt';

if (fs.existsSync(filename)) {

  fs.appendFileSync(filename, '\n');
} else {

  fs.writeFileSync(filename, '');
}

console.log('Введите текст для записи в файл (для выхода наберите "exit"):');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Прощайте!');
    process.exit();
  } else {
    fs.appendFileSync(filename, input + '\n');
    console.log('Введите ещё текст или наберите "exit" для выхода:');
  }
});
