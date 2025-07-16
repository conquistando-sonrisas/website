

/**
 * se toma 2.89% de tarifas con base en documentacion de Mercado Libre Solidario https://www.mercadolibre.com.mx/ayuda/4942
 */
export const calculateFees = (amount: number) => {
  return (amount / 0.966476) - amount;
}

export const roundToTwo = (amount: number) => Math.round((amount + Number.EPSILON) * 100) / 100;