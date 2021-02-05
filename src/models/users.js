const { actionQuery } = require('../helpers/helpers')

const users = {
  // Cek user berdasarkan email
  checkUser: (email) => {
    return actionQuery('SELECT * FROM users WHERE email = ?', email)
  },
  // Pagination
  countUsers: () => {
    return actionQuery('SELECT COUNT(*) AS totalData FROM users')
  },
  // Menampilkan semua data user
  getDataUsers: (username, phoneNumber) => {
    if (username) {
      return actionQuery('SELECT * FROM users WHERE username LIKE ?', `%${username}%`)
    } else if (phoneNumber) {
      return actionQuery('SELECT * FROM users WHERE phoneNumber LIKE ?', `%${phoneNumber}%`)
    } else {
      return actionQuery(`SELECT * FROM users`)
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
  // Menambahkan, mengubah dan menghapus nomor telepon berdasarkan id
  editPhone: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  // Mengubah saldo pengirim berdasarkan id
  updateBalanceSender: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  // Mengubah saldo penerima berdasarkan id
  updateBalanceReceiver: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  // Mengubah gambar berdasarkan id
  updateImage: (id, data) => {
    return actionQuery('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  // Menghapus data user berdasarkan id (unused)
  deleteDataUserById: (id) => {
    return actionQuery('DELETE FROM users WHERE id = ?', id)
  }
}

module.exports = users
