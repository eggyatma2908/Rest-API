const { actionQuery } = require('../helpers/helpers')

const transaction = {
  // Menampilkan semua data transaksi
  getDataTransaction: () => {
    return actionQuery (`SELECT t.id, u.username AS senderName, t.amount, us.username AS receiverName, u.photoProfile ,us.balance AS beginBalance, IF (u.balance > t.amount, us.balance + t.amount, u.balance) AS balance, t.dateTime, t.notes
    FROM transaction AS t
    INNER JOIN users AS u ON u.id = t.senderId
    INNER JOIN users AS us ON us.id = t.receiverId
    ORDER BY dateTime DESC`)
  },
  // Menampilkan data transaksi berdasarkan id
  getDataTransactionById: (id) => {
    return actionQuery (`SELECT t.id, u.username AS senderName, t.amount, us.username AS receiverName, us.balance AS beginBalance, IF (u.balance > t.amount, us.balance + t.amount, u.balance) AS balance, t.dateTime, t.notes
    FROM transaction AS t
    INNER JOIN users AS u ON u.id = t.senderId
    INNER JOIN users AS us ON us.id = t.receiverId
    WHERE t.id = ?`, id)
  },
  // Menambahkan data transaksi
  insertDataTransaction: (data) => {
    return actionQuery ('INSERT INTO transaction SET ?', data)
  },
  // Mengubah data transaksi berdasarkan id (unused)
  updateDataTransactionById: (id, data) => {
    return actionQuery ('UPDATE transaction SET ? WHERE id = ?', [data, id])
  },
  // Menghapus data user berdasarkan id (unused)
  deleteDataTransactionById: (id) => {
    return actionQuery ('DELETE FROM transaction WHERE id = ?', id)
  }
}

module.exports = transaction
