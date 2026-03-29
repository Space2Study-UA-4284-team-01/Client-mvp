export const locationService = {
  getCountries: () => {
    return Promise.resolve({
      data: ['Ukraine', 'Poland', 'Germany', 'USA', 'UK']
    })
  },
  getCitiesByCountry: (country: string) => {
    const cities: Record<string, string[]> = {
      Ukraine: ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv'],
      Poland: ['Warsaw', 'Krakow', 'Gdansk'],
      Germany: ['Berlin', 'Munich', 'Hamburg'],
      USA: ['New York', 'Los Angeles', 'Chicago'],
      UK: ['London', 'Manchester', 'Birmingham']
    }
    return Promise.resolve({ data: cities[country] ?? [] })
  }
}
