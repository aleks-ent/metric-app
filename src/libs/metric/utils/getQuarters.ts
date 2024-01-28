import { differenceInDays, isBefore, subDays, subYears } from 'date-fns'

const getStartCountDate = (createdAt: Date) => {
  const oneYearBeforeNow = subYears(new Date(), 1)
  const olderThanOneYear = isBefore(createdAt, oneYearBeforeNow)

  return olderThanOneYear ? oneYearBeforeNow : createdAt
}

const getQuarters = (createdAt: Date) => {
  const startCountDate = getStartCountDate(createdAt)
  const currentDate = new Date()
  const calculatedDifferenceInDays = differenceInDays(
    currentDate,
    startCountDate,
  )

  const startQuarter = {
    start: subDays(currentDate, calculatedDifferenceInDays),
    end: subDays(currentDate, (calculatedDifferenceInDays / 4) * 3),
  }

  const endQuarter = {
    start: subDays(currentDate, calculatedDifferenceInDays / 4),
    end: currentDate,
  }

  return { startQuarter, endQuarter }
}

export default getQuarters
