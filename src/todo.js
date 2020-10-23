const { client } = require('./db');

exports.createTODO = async function (title, content) {
  const queryText = 'INSERT INTO todos(Title, Content) VALUES($1, $2) RETURNING ID'
  const queryValues = [title, content];
  try {
    const res = await client.query(queryText, queryValues);
    return res.rows[0];
  } catch (err) {
    console.error(err);
  }
}

exports.getTODOs = async function () {
  const queryText = 'SELECT * FROM todos';
  try {
    const res = await client.query(queryText);
    return res.rows;
  } catch(err) {
    console.error(err);
  }
}

exports.deleteTODO = async function (id) {
  const queryText = 'DELETE FROM todos WHERE ID = $1';
  try {
    const res = await client.query(queryText, [id]);
    return res;
  } catch(err) {
    console.error(err);
  }
}
