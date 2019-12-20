import { __deriveIO } from '@derivate/io-ts-deriver/lib/io-ts-type'
import * as t from 'io-ts'

/**
 * @implied
 */
const dateCodec: t.Type<Date, string, unknown> = new t.Type(
  'string',
  (input: unknown): input is Date => typeof input === 'string',
  (input, context) => {
    if(typeof input === 'string') {
      return t.success(new Date(Date.parse(input)))
    } else {
      return t.failure(input, context)
    }
  },
  d => d.toISOString()
)

const io = __deriveIO.derive<{hmm: string, num: number, foo: {timestamp: Date }}>()

console.log(io.decode({}))

const decoded = io.decode({hmm: 'adf', num: 4, foo: {timestamp: "2019-12-20T14:18:43.015Z"}})

if(decoded._tag === "Right") {
  console.log('time is:', decoded.right.foo.timestamp)
}



