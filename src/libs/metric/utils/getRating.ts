const getRating = (start: number, end: number) => {
  const ratio = end / start

  if (ratio < 0.4) {
    return 1
  }
  if (ratio < 0.8) {
    return 2
  }
  if (ratio < 1.2) {
    return 3
  }
  if (ratio < 1.6) {
    return 4
  }
  return 5
}

export default getRating
