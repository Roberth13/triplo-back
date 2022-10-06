const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const reader = require('xlsx');
const file = reader.readFile('./data.xlsx');
//console.log(db);
async function saveVersion(item, make_id){
    console.log(make_id, item.year)
    const result = await db.query(
        `SELECT * FROM YEARS WHERE name = ${item.year} and make_id = ${make_id}`
    );
    const data = helper.emptyOrRows(result);
    console.log(data);
    // return {data};
}

async function create(_file, make_id){
    let message = 'Error in creating version';
    let data = [];
    const sheets = file.SheetNames;

    //Verificar si existen las marcas
    for(let i = 0; i < sheets.length; i++)
    {
        //Revisar los años
        const _data = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        await _data.forEach((_fila) => {
            //console.log(_fila);
            //let _item = saveVersion(_fila, make_id);
            let result = db.query(
                `SELECT * FROM YEARS WHERE name = ${_fila.year} and make_id = ${make_id}`
            );
            let _data = helper.emptyOrRows(result);
            _data.then(_year =>{
                if(_year.length > 0){
                    result = db.query(
                        `SELECT * FROM MODELS WHERE name = "${_fila.model}" and year_id = ${_year[0].id}`
                    );
                    _data = helper.emptyOrRows(result);
                    _data.then(_model =>{
                        if(_model.length > 0){
                            result = db.query(
                                `SELECT * FROM VERSIONS WHERE name = "${_fila.version}" and model_id = ${_model[0].id}`
                            );
                            _data = helper.emptyOrRows(result);
                            _data.then(_version =>{
                                if(_version.length == 0){
                                    console.log("Version "+_fila.version+" creada...")
                                    //result = db.query(`INSERT INTO versions (name, model_id) VALUES ("${_fila.version}", ${_model[0].id})`);
                                }
                            });
                        }
                        else{
                            //let result1 = db.query(`INSERT INTO models (name, year_id) VALUES ("${_fila.model}", ${_year[0].id})`);
                            console.log("Modelo "+_fila.model+" No existe...")
                            //result = db.query(`INSERT INTO versions (name, model_id) VALUES ("${_fila.version}", ${result1.insertId})`);
                            //console.log("Version "+_fila.version+" creada...")
                        }
                    })
                }else{
                    console.log("Año: "+_fila.year+" No existe")
                }
            })
        });
    }
    
    // Printing data
    //console.log(data)

  
    return {data};
}

module.exports = {
    create
}