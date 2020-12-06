const { countTransaction } = require('../models/transaction')

exports.pagination = async (limit, page) => {
  const transaction = await countTransaction()
  const totalData = transaction[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData: totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/transaction?page=${page - 1}&limit=${limit}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/transaction?page=${page + 1}&limit=${limit}` : null
  }
  return setPagination
}
