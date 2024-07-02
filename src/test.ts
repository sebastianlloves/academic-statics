import { CURSOS } from './constants'
import { ANIO } from './types'

const CarType = {
  Honda: 'HONDA',
  Yamaha: 'YAMAHA'
} as const

type Key = keyof(typeof CarType)

function isValidCar (brand: string) : brand is typeof CarType[Key] {
  return Object.values(CarType).includes(brand as typeof CarType[Key])
}

const brand = 'YAMAHA'

const testBrand : typeof CarType[Key] = isValidCar(brand) ? brand : 'HONDA'

console.log(testBrand)

const isValidAnio = (anioValue : number) : anioValue is ANIO => anioValue in CURSOS

const test = 5

const value : ANIO = isValidAnio(test) ? test : 1

console.log(value)
