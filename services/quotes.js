const db = require('./db');
const helper = require('../helper');
const createBrowserless = require('browserless')
const getHTML = require('html-get')
const browserlessFactory = createBrowserless()
var HTMLParser = require('node-html-parser');
const server = require('./server');

process.on('exit', () => {
  console.log('closing resources!')
  browserlessFactory.close()
})

const getContent = async url => {
  // create a browser context inside Chromium process
  const browserContext = browserlessFactory.createContext()
  const getBrowserless = () => browserContext
  const result = await getHTML(url, { getBrowserless })
  // close the browser context after it's used
  await getBrowserless((browser) => browser.destroyContext())
  
  return result
}

async function getQuote(id){
  const result = await db.query(
    `select q.*, u.*, m.sname 
    from quotes q 
    join users u on q.user_id = u.id 
    join versions v on v.id = q.version_id
    join models m on m.id = v.model_id
    where q.id = ${id}`
  );

  const data = helper.emptyOrRows(result);

  return {
    data
  }
}

async function getTest(data){
  let resp = [];
  let _prom = 0;
  let _version = data.version;
  let _model = data.model;

  await getContent(data.url)
  .then(content => {    
    let datas = content.html;
    const root = HTMLParser.parse(datas);
    datas = root.querySelector(".ui-search-results");
    
    if(datas != null){      
      let _items = datas.querySelectorAll(".ui-search-result__content-wrapper");
      _items.forEach(element => {
        let _precio = element.querySelector(".ui-search-price__second-line .price-tag-fraction").textContent;
        let title = element.querySelector(".shops__item-title").textContent;
        let arrayTitle = title.split(" ");
        let _pp = parseInt(_precio.replace(/\./g, ''));

        if(arrayTitle.includes(_model)){
          _prom += _pp;
          resp.push({
            title: title,
            precop: _precio
          });
        }
        
      });
    }
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  });

  if(resp.length > 0)
    _prom = _prom / resp.length;
  
  
  return { data: resp, count: resp.length, prom: Math.round(_prom) }
}

module.exports = {
    getQuote,
    getTest
}