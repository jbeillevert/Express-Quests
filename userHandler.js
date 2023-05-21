const database = require('./database')


const getUsers = (req, res) => {
    database
        .query("SELECT * FROM users")
        .then(([users]) => res.json([users]))
        .catch((err) => console.error(err))
}

const getUserById = (req, res) => {
    const checkIdUser = parseInt(req.params.id)

    database
    .query(`SELECT * FROM users WHERE id = ${checkIdUser}`)
    .then(([user]) => {
        if (user[0]) {
            res.json(user[0])
        } else {
            res.send("Not found")
        }
    })
    .catch((err) => console.error(err))
}

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
}


module.exports = {
    getUsers,
    getUserById,
    postUser
}

    