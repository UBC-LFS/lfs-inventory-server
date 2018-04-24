var Client = require('mariasql')
require('dotenv').config()
// table
const table = 'InventoryClient'
const versionEditsTable = 'InvetoryClientEdits'

// configuration
/*

host: '127.0.0.1',
port: 3000,
user: 'root',
passwd: 'XXXXXXXXX',
db: 'mysql'
*/
var c = new Client({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  db: process.env.DB_NAME
})


// Query the database for search. The first search will be completed on the InventoryClient
// table for the specific search. 
const queryForm = (profile, callback) => {
  const sql = `SELECT * FROM ${table} WHERE ('${form.searchField}' = '${form.searchTerm}');`
  console.log('QUERY FORM SQL : ' + sql)
}

// Query the database for search. The second search will be completed on the InvetoryClientEdits
// table for all the versions corresponding to the item. 
const queryVersions = () => {
  const sql = `SELECT * FROM ${table} WHERE (id = '${form.entryid}');`
  console.log('QUERY FORM SQL : ' + sql)
}

// Edit database entry. Edited logs are entered into the versionEditsTable, 
// with the original entry's correspnding ID. The version logs 
// also need to have timestamps and editedBy fields. 
// const editVersions = () => {

// }

// New item entry is created into the InventoryClient table.
// TODO: add unique entry ID 
const fillForm = (form, profile, callback) => {
  const sql = `INSERT INTO ${table} VALUES ('${profile.cwl}', '${profile.timeStamp}', '${profile.shibFirstName}', '${profile.shibLastName}', 
  '${form.id}', '${form.date}', '${form.dateModified}', '${form.user}', 
  '${form.assetName}', '${form.assetModelNumber}', '${form.assetSpecs}', '${form.assetSerialNumber}', '${form.assetTag}', '${form.assetOwner}', 
  '${form.modelYear}', '${form.speedChart}', '${form.vendor}', '${form.jvNumber}', '${form.datePurchased}', '${form.currentUser}', '${form.previousUser}', 
  '${form.assetLocation}', '${form.disposalDate}', '${form.methodOfDisposal}', '${form.userType}', '${form.unitAffiliation}', '${form.cost}');`
  console.log('FILL FORM SQL : ' + sql)
  // var prep = c.prepare(q)

  // Insert
  c.query(sql, function (err, rows) {
    if (err) throw err
    console.log('SQL err' + err)
    if (typeof rows.affectedRows === 'undefined') {
      callback(null, {type: 'sql-error', filledForm: false})
    }
    rows.affectedRows === 1 ? callback(null, {type: 'render', filledForm: true}) : callback(null, {type: 'error', filledForm: false})
    console.log(rows)
  })
  c.end()
}

export {
  fillForm,
  queryForm,
  queryVersions,
  //editVersions
}
