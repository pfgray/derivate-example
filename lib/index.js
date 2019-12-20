import { __deriveIO } from '@derivate/io-ts-deriver/lib/io-ts-type';
import * as t from 'io-ts';
/**
 * @implied
 */
const dateCodec = new t.Type('string', (input) => typeof input === 'string', (input, context) => {
    if (typeof input === 'string') {
        return t.success(new Date(Date.parse(input)));
    }
    else {
        return t.failure(input, context);
    }
}, d => d.toISOString());
const io = __deriveIO.t.type({ hmm: __deriveIO.t.string, num: __deriveIO.t.number, foo: __deriveIO.t.type({ timestamp: dateCodec }) });
console.log(io.decode({}));
const decoded = io.decode({ hmm: 'adf', num: 4, foo: { timestamp: "2019-12-20T14:18:43.015Z" } });
if (decoded._tag === "Right") {
    console.log('time is:', decoded.right.foo.timestamp);
}
