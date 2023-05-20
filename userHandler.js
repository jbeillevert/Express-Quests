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


module.exports = {
    getUsers,
    getUserById
}

    