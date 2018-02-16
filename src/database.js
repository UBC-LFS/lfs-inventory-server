var Client = require('mariasql');

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
  const q = `'INSERT INTO ${table} VALUES ('${profile.cwl}', '${profile.shibFirstName}', '${profile.shibLastName}', 
  '${form.id}', '${form.date}', '${form.dateModified}', '${form.user}', 
  '${form.assetName}', '${form.assetModelNumber}', '${form.assetSpecs}', '${form.assetSerialNumber}', '${form.assetTag}', '${form.assetOwner}', 
  '${form.modelYear}', '${form.speedChart}', '${form.vendor}', '${form.jvNumber}', '${form.datePurchased}', '${form.currentUser}', '${form.previousUser}', 
  '${form.assetLocation}', '${form.disposalDate}', '${form.methodOfDisposal}', '${form.userType}', '${form.unitAffiliation}', '${form.cost}');`

  var prep = c.prepare(fillForm.q)
  console.log(prep)

  // Insert
  c.query(prep, function (err, rows) { 
    if (err) throw err
    console.dir(rows)
  })
  c.end()
}
