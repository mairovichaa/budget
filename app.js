const fs = require('fs');


const PATH_TO_FILE = "E:\\YandexDisk\\расходы.xlsx";

const PATH_TO_TEMP = "E:\\projects\\budget-node\\temp";
const TEMP_FILE_NAME = "temp.xlsx";


fs.copyFileSync(PATH_TO_FILE, `${PATH_TO_TEMP}\\${TEMP_FILE_NAME}`);