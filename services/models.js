const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getModels(page){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT m.id as id, m.name as model, 
    y.id as yearId, y.name as yearName,
    mk.id as makeId, mk.name as makeName
    FROM models m
    join years y on m.year_id = y.id
    join makes mk on m.make_id = mk.id 
    LIMIT ${offset},${config.listPerPage}`
  );
  //console.log("CANT: ",rows.length);
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}

async function getModelsByYear(yearId){
  const result = await db.query(
    `select m.id, m.name, m.sname
    from models m
    where m.year_id = ${yearId} ORDER by m.name asc;`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}
async function createByYear(year, models){
  let result;
  let message = 'Error in creating model';
  await models.items.forEach((model) => {
    result = db.query(
      `INSERT INTO models (name, year_id) VALUES ("${model}", ${year})`
    );

    if (result.affectedRows) {
      message = 'Models created successfully';
    }
  });

  return {message};
}
async function create(model){
  const result = await db.query(
    `INSERT INTO models (name, year_id) VALUES ("${model.name}", ${model.year_id})`
  );

  let message = 'Error in creating model';

  if (result.affectedRows) {
    message = 'Model created successfully';
  }

  return {message};
}

async function getModel(id){
  const result = await db.query(
    `SELECT m.id as id, m.name as model, 
    y.id as yearId, y.name as yearName,
    mk.id as makeId, mk.name as makeName
    FROM models m
    join years y on m.year_id = y.id
    join makes mk on m.make_id = mk.id WHERE m.id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM MODELS WHERE id=${id}`
  );

  let message = 'Error in deleting model';

  if (result.affectedRows) {
    message = 'Model deleted successfully';
  }

  return {message};
}

async function update(id, model){
  const result = await db.query(
    `UPDATE MODELS 
    SET name="${model.name}", year_id=${model.year_id}, make_id=${model.year_id}  WHERE id=${id}` 
  );

  let message = 'Error in updating model';

  if (result.affectedRows) {
    message = 'Model updated successfully';
  }

  return {message};
}

module.exports = {
    getModels,
    create,
    getModel,
    remove,
    update,
    getModelsByYear,
    createByYear
}