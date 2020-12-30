const elastic = require("../elastic");
const recipes  = require(`./recipes.json`);

/* *
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Returns an ElasticSearch Action in order to
 *              correctly index documents.
 */

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  }
};

/* *
 * @function pupulateDatabase
 * @returns {void}
 */

async function populateDatabase() {

  const docs = [];

  for (const recipe of recipes) {
    docs.push(esAction);
    docs.push(recipe);
  }

  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase
};