import { Request } from 'express';

export default interface DecodedRequest extends Request{
    decoded: string | object;
}