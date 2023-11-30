export function stringToNumber(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback
  return Number.parseInt(value)
}

export function formatStarsNumber(stars: number) {
  if (stars < 1000)
    return stars.toString()

  stars /= 1000
  return `${stars.toFixed(1)}k`
}

export function dateOrString(input: Date | string) {
  if (typeof input === "string") return new Date(input)
  return input
}
