const connection = require('../configs/db')
const transaction = {
  // Menampilkan semua data transaksi
  getDataTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT t.id, t.senderName, t.senderPhone, t.amount, t.dateTime, t.notes, s.status, t.receiverId, u.name, u.phoneNumber, u.balance AS 
            startBalance, IF (s.id <= 1, u.balance + t.amount, u.balance) AS endBalance
            FROM transaction AS t
            INNER JOIN users AS u ON u.id = t.receiverId
            INNER JOIN status AS s ON s.id = t.statusId
            ORDER BY dateTime DESC`, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menampilkan data transaksi berdasarkan id
  getDataTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT t.id, t.senderName, t.senderPhone, t.amount, t.dateTime, t.notes, s.status, t.receiverId, u.name, u.phoneNumber, u.balance AS 
            startBalance, IF (s.id <= 1, u.balance + t.amount, u.balance) AS endBalance
            FROM transaction AS t
            INNER JOIN users AS u ON u.id = t.receiverId
            INNER JOIN status AS s ON s.id = t.statusId
            WHERE t.id = ?`, id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menambahkan data transaksi
  insertDataTransaction: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Mengubah data transaksi berdasarkan id
  updateDataTransactionById: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE transaction SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menghapus data user berdasarkan id
  deleteDataTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transaction WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = transaction