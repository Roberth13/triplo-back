const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getYears(page){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM years LIMIT ${offset},${config.listPerPage}`
  );
  //console.log("CANT: ",rows.length);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getYearsByMake(makeId){
  const result = await db.query(
    `select y.id, y.name from years y
    where y.make_id = ${makeId}
    order by y.name asc`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function create(year){
  const result = await db.query(
    `INSERT INTO years (name) VALUES ("${year.name}")`
  );

  let message = 'Error in creating year';

  if (result.affectedRows) {
    message = 'Year created successfully';
  }

  return {message};
}

async function getYear(id){
  const result = await db.query(
    `SELECT * FROM YEARS WHERE id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM YEARS WHERE id=${id}`
  );

  let message = 'Error in deleting year';

  if (result.affectedRows) {
    message = 'Year deleted successfully';
  }

  return {message};
}

async function update(id, year){
  const result = await db.query(
    `UPDATE YEARS 
    SET name="${year.name}"  WHERE id=${id}` 
  );

  let message = 'Error in updating year';

  if (result.affectedRows) {
    message = 'Year updated successfully';
  }

  return {message};
}

module.exports = {
    getYears,
    create,
    getYear,
    remove,
    update,
    getYearsByMake
}