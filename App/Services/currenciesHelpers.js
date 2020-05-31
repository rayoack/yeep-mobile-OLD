import currencies from './currencies.json'

export const getCurrencySymbol = (actualCurrency) => {
  const symbol = currencies.filter(currency => {
    if(currency.value == actualCurrency) {
      return currency
    }
  })
  
  return symbol[0].symbol
}
