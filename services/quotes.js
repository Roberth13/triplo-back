const db = require('./db');
const helper = require('../helper');
const createBrowserless = require('browserless')
const getHTML = require('html-get')
const browserlessFactory = createBrowserless()
var HTMLParser = require('node-html-parser');

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
    `select * 
    from quotes q 
    join users u on q.user_id = u.id 
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
  await getContent(data.url)
  .then(content => {    
    let datas = content.html;
    const root = HTMLParser.parse(datas);
    datas = root.querySelector(".ui-search-results");
    
    if(datas != null){      
      let _items = datas.querySelectorAll(".ui-search-result__content-wrapper");
      _items.forEach(element => {
        let _precio = element.querySelector(".ui-search-price__second-line .price-tag-fraction").textContent;
        let _att = element.querySelectorAll(".ui-search-item__group--attributes .shops-custom-secondary-font .ui-search-card-attributes__attribute");
        let _title = element.querySelector(".ui-search-item__title").textContent;
        let _km_year = [];
        _att.forEach(ele =>{
          _km_year.push(ele.textContent);
        })
        let _pp = parseInt(_precio.replace(/\./g, ''));
        _prom += _pp;
        resp.push({
          "title": _title.toString(),
          "price": _pp,
          "year": parseInt(_km_year[0]),
          "km": _km_year[1]
        })
      });
    }
    
    
    //process.exit()
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
  if(resp.length > 0){
    _prom = _prom / (resp.length);
  }
  return { data: resp, count: resp.length, prom: _prom }
}

module.exports = {
    getQuote,
    getTest
}