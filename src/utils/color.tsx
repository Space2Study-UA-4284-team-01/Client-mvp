export const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '')

  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const isHex = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color)
