const connection = require('../configs/db')
const users = {
  // Menampilkan semua data user
  getDataUsers: (name, phoneNumber, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (name) {
        connection.query('SELECT * FROM users WHERE name LIKE ?', `%${name}%`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else if (phoneNumber) {
        connection.query('SELECT * FROM users WHERE phoneNumber LIKE ?', `%${phoneNumber}%`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  // Menampilkan data user berdasarkan id
  getDataUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menambahkan data user
  insertDataUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Mengubah data user berdasarkan id
  updateDataUserById: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menghapus data user berdasarkan id
  deleteDataUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = users