const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMakes(page){
  const rows = await db.query(
    `SELECT id, name FROM makes order by name asc`
  );
  
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(make){
  const result = await db.query(
    `INSERT INTO makes (name) VALUES ("${make.name}")`
  );

  let message = 'Error in creating make';

  if (result.affectedRows) {
    message = 'Make created successfully';
  }

  return {message};
}

async function getMake(id){
  const result = await db.query(
    `SELECT * FROM MAKES WHERE id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

function getMakeByName(name){
  const result = db.query(
    `SELECT * FROM MAKES WHERE name = "${name}"`
  );
  const data = helper.emptyOrRows(result);

  return {data};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM MAKES WHERE id=${id}`
  );

  let message = 'Error in deleting make';

  if (result.affectedRows) {
    message = 'Make deleted successfully';
  }

  return {message};
}

async function update(id, make){
  const result = await db.query(
    `UPDATE MAKES 
    SET name="${make.name}" WHERE id=${id}` 
  );

  let message = 'Error in updating make';

  if (result.affectedRows) {
    message = 'Make updated successfully';
  }

  return {message};
}

module.exports = {
  getMakes,
  create,
  getMake,
  remove,
  update,
  getMakeByName
}