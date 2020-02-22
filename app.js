const fs = require('fs');
const path = require('path');

const config = require('./config');
const TEMP_FILE = `${config.PATH_TO_TEMP_DIR}${path.sep}${config.TEMP_FILE_NAME}`;

console.log('Start copying of expense file');
fs.copyFileSync(config.PATH_TO_SOURCE_FILE, TEMP_FILE);
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
        category: e['категория'],
        comment: e['комментарий']
    };
    outExpense.push(outE);
});

const outIncome = [];

const incomeWorksheet = workbook.Sheets['Доходы'];
const incomeList = XLSX.utils.sheet_to_json(incomeWorksheet);

incomeList.forEach(e => {
    const outI = {
        date: getFormattedDate(e),
        sum: e['сумма'],
        category: e['категория'],
        comment: e['комментарий']
    };
    outIncome.push(outI);
});

const data = `\nlet expenses = ${JSON.stringify(outExpense)};\n
let income = ${JSON.stringify(outIncome)};`;

fs.writeFileSync(config.PATH_TO_DATA_FILE, data);

fs.unlinkSync(TEMP_FILE);
