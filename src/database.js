var Client = require('mariasql')
require('dotenv').config()
// table
const table = 'InventoryClient'

// configuration
var c = new Client({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  db: process.env.DB_NAME
})

const fillForm = (form, profile, callback) => {
  const sql = `INSERT INTO ${table} VALUES ('${profile.cwl}', '${profile.shibFirstName}', '${profile.shibLastName}', 
  '${form.id}', '${form.date}', '${form.dateModified}', '${form.user}', 
  '${form.assetName}', '${form.assetModelNumber}', '${form.assetSpecs}', '${form.assetSerialNumber}', '${form.assetTag}', '${form.assetOwner}', 
  '${form.modelYear}', '${form.speedChart}', '${form.vendor}', '${form.jvNumber}', '${form.datePurchased}', '${form.currentUser}', '${form.previousUser}', 
  '${form.assetLocation}', '${form.disposalDate}', '${form.methodOfDisposal}', '${form.userType}', '${form.unitAffiliation}', '${form.cost}');`
  console.log('SQL ' + sql)
  // var prep = c.prepare(q)

  // Insert
  c.query(sql, function (err, rows) {
    if (err) throw err
    if (typeof rows.affectedRows === 'undefined') {
      callback(null, {type: 'sql-error', filledForm: false})
    }
    rows.affectedRows === 1 ? callback(null, {type: 'render', filledForm: true}) : callback(null, {type: 'error', filledForm: false})
    console.log(rows)
  })
  c.end()
}

export {
  fillForm
}
