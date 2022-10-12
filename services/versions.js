const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getVersions(page){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT v.id as id, v.name as version, y.id as yearId, y.name as yearName FROM versions v
    join years y on v.year_id = y.id LIMIT ${offset},${config.listPerPage}`
  );
  //console.log("CANT: ",rows.length);
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}

async function getVersionByModel(modelId){
  const result = await db.query(
    `select v.id, v.name, v.calculate_price
    from versions v
    where v.model_id = ${modelId} ORDER by v.name asc;`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function create(version){
  const result = await db.query(
    `INSERT INTO versions (name, year_id) VALUES ("${version.name}", ${version.year_id})`
  );

  let message = 'Error in creating version';

  if (result.affectedRows) {
    message = 'Version created successfully';
  }

  return {message};
}

async function getVersion(id){
  const result = await db.query(
    `SELECT v.id as id, v.name as version, y.id as yearId, y.name as yearName, v.created_at, v.updated_at FROM versions v
    join years y on v.year_id = y.id WHERE v.id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM VERSIONS WHERE id=${id}`
  );

  let message = 'Error in deleting version';

  if (result.affectedRows) {
    message = 'Version deleted successfully';
  }

  return {message};
}

async function update(id, version){
  const result = await db.query(
    `UPDATE VERSIONS 
    SET name="${version.name}", year_id=${version.year_id}  WHERE id=${id}` 
  );

  let message = 'Error in updating version';

  if (result.affectedRows) {
    message = 'Version updated successfully';
  }

  return {message};
}

async function createByModel(model, versions){
  let result;
  let message = 'Error in creating model';
  await versions.items.forEach((version) => {
    result = db.query(
      `INSERT INTO versions (name, model_id) VALUES ("${version}", ${model})`
    );

    if (result.affectedRows) {
      message = 'Versions created successfully';
    }
  });

  return {message};
}
module.exports = {
    getVersions,
    create,
    getVersion,
    remove,
    update,
    getVersionByModel,
    createByModel
}