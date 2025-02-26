import { APIGatewayEventRequestContextJWTAuthorizer } from 'aws-lambda';

export interface IHttpRequest<TBody extends Record<string,any> | undefined >{
  body: TBody
  headers?: Record<string,string >
  params?: Record<string,string>
  context?: APIGatewayEventRequestContextJWTAuthorizer["jwt"]
}
export interface IHttpResponse{
  statusCode: number;
  body?: Record<string, any>
  headers?: Record<string,string>
}
