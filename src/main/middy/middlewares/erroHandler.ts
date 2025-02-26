import { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { HttpError } from '../../../application/errors/httpError';

export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2 | APIGatewayProxyEventV2WithJWTAuthorizer>{
  return{
    onError:(request)=>{
      const {error} = request
      if(error &&( error instanceof HttpError || 'statusCode' in error)){
        request.response = {
          ...request.response,
          statusCode: error.statusCode,
          body: error.message,
          headers:{
            ...request.response?.headers,
            'Content-Type': 'application/json'
          }
        }
      } else{
        console.log(error)
        request.response = {
          ...request.response,
          statusCode: 500,
          body: JSON.stringify({error: 'Deu ruim no servidor!'}),
          headers:{
            ...request.response?.headers,
            'Content-Type': 'application/json'
          }
        }
      }
    }
  }
}

