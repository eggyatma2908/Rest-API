const { actionQuery } = require('../helpers/helpers')

const users = {
  // Cek user berdasarkan email
  checkUser: (email) => {
    return actionQuery('SELECT * FROM users WHERE email = ?', email)
  },
  // Menampilkan semua data user
  getDataUsers: (username, email) => {
    if (username) {
      return actionQuery('SELECT * FROM users WHERE username LIKE ?', `%${username}%`)
    } else if (email) {
      return actionQuery('SELECT * FROM users WHERE email LIKE ?', `%${email}%`)
    } else {
      return actionQuery('SELECT * FROM users')
    }
  },
  // Menampilkan data user berdasarkan id
  getDataUserById: (id) => {
    return actionQuery('SELECT * FROM users WHERE id = ?', id)
  },
  // Menambahkan data user
  insertDataUser: (data) => {
    return actionQuery('INSERT INTO users SET ?', data)
  },
  // Mengubah data user berdasarkan id
  updateDataUser: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  // Menghapus data user berdasarkan id
  deleteDataUserById: (id) => {
    return actionQuery('DELETE FROM users WHERE id = ?', id)
  }
}

module.exports = users
