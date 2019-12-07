const fs = require('fs');


const PATH_TO_FILE = "E:\\YandexDisk\\расходы.xlsx";

const PATH_TO_TEMP = "E:\\projects\\budget-node\\temp";
const TEMP_FILE_NAME = "temp.xlsx";
const TEMP_FILE = `${PATH_TO_TEMP}\\${TEMP_FILE_NAME}`;

console.log('Start copying of expense file');
fs.copyFileSync(PATH_TO_FILE, TEMP_FILE);
console.log('End copying of expense file');

const XLSX = require('xlsx');
const workbook = XLSX.readFile(TEMP_FILE);
console.log('Temp file was read');

const worksheet = workbook.Sheets['Расходы'];
const expenses = XLSX.utils.sheet_to_json(worksheet);

function getFormattedDate(expense) {
    const date = XLSX.SSF.parse_date_code(expense['дата']);
    const day = ("0" + date.d).slice(-2);
    const month = ("0" + date.m).slice(-2);
    const year = date.y;
    return `${day}.${month}.${year}`;
}

const outExpense = [];


expenses.forEach(e => {
    const outE = {
        date: getFormattedDate(e),
        sum: e['сумма'],
        category: e['категория']
    };
    outExpense.push(outE);
});

const data = `\nlet expenses = ${JSON.stringify(outExpense)};`;

fs.writeFileSync('E:\\projects\\budget\\src\\main\\resources\\data.js', data);

fs.unlinkSync(TEMP_FILE);