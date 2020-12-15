import _ from 'lodash'

const calculatePageNumbers = (total_records_count: number, current_page: number,
  COUNT_RECORDS_ON_PAGE: number, MAX_PAGES_LIST = 7): (number | null | boolean)[][] => {
  if (total_records_count <= COUNT_RECORDS_ON_PAGE) {
    return [[], []]
  }

  const COUNT_PAGES = Math.ceil(total_records_count / COUNT_RECORDS_ON_PAGE)
  const offset = Math.max(0, current_page - 1 - Math.floor(MAX_PAGES_LIST / 2))

  const end_number = Math.min(COUNT_PAGES, MAX_PAGES_LIST + offset)
  const start_number = Math.max(1, end_number - MAX_PAGES_LIST + 1)

  const paginationNumbers = _.range(start_number, end_number + 1)

  const firstNumber = start_number > 1 ? 1 : false
  const lastNumber = end_number < COUNT_PAGES ? COUNT_PAGES : false

  return [paginationNumbers, [firstNumber, lastNumber]]
}

export default calculatePageNumbers
