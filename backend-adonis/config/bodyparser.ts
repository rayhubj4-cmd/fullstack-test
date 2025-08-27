// config/bodyparser.ts
import { BodyParserConfig } from '@ioc:Adonis/Core/BodyParser'

const bodyParserConfig: BodyParserConfig = {
  whitelistedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  json: {
    encoding: 'utf-8',
    limit: '1mb',
    strict: true,
    types: [
      'application/json',
      'application/json-patch+json',
      'application/vnd.api+json',
    ],
  },
  form: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {}, // 必須給一個空物件
    types: ['application/x-www-form-urlencoded'],
  },
  raw: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: ['text/*'],
  },
  multipart: {
    autoProcess: true,
    processManually: [],
    types: ['multipart/form-data'],
  },
}

export default bodyParserConfig
