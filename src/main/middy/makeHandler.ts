import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpResponseSerializer from '@middy/http-response-serializer'
import httpMultipartFormData from '@middy/http-multipart-body-parser'
import { errorHandler } from './middlewares/erroHandler';
import { IController } from '../../application/types/IController';
import { sanitizeObject } from '../utils/sanitizeObject';


export function makeHandler(controller: IController<any>){
  return middy()
  .use(httpJsonBodyParser({ disableContentTypeError: true}))
  .use(httpMultipartFormData({ disableContentTypeError: true }))
  .use(httpResponseSerializer({
    defaultContentType:'application/json',
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body)
      }
    ]
  }))
  .use(errorHandler())
  .handler(async (event)=>{
    return controller.handler({
      body:event.body,
      headers:sanitizeObject(event.headers),
      params: sanitizeObject(event.pathParameters),
      context: event.requestContext?.authorizer?.jwt
    })
  })
}
