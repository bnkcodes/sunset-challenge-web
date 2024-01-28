interface IMask  {
  unmask: (value: string) => string
  phone: (value: string) => string
}

export const masks: IMask = {
  unmask: (value: string) => {
    return value.replace(/[^a-zA-Z0-9]/g, "")
  },
  phone: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
}