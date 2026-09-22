
export function excelRead(filepath)
{

const XLSX= require ('xlsx')
const workbook= XLSX.readFile(filepath)
const worksheet=workbook.Sheets[workbook.SheetNames[0]]
const logindata=XLSX.utils.sheet_to_json(worksheet)

return logindata

}

export function csvRead(filepath)
{
    const fs=require('fs')
    const csvdata=fs.readFileSync(filepath, 'utf-8')
    const {parse} = require ('csv-parse/sync')
    const logindata= parse(csvdata, {delimiter: ",", columns: true, skip_empty_lines:true })
    return logindata

}
