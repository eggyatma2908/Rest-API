const connection = require('../configs/db')
const status = {
  // Menampilkan semua data status
  getDataStatus: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM status', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menampilkan data status berdasarkan id
  getDataStatusById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM status WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menambahkan data status
  insertDataStatus: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO status SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Mengubah data status berdasarkan id
  updateDataStatusById: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE status SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  // Menghapus data status berdasarkan id
  deleteDataStatusById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM status WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = status