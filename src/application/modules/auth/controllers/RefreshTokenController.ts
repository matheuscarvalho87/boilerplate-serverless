
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { HttpError } from '../../../errors/httpError';
import { handleSigninError } from '../../../errors/signinCognitoErrors';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';


interface IRefreshTokenRequestBody{
  refreshToken: string
}

export class RefreshTokenController implements IController<IRefreshTokenRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<IRefreshTokenRequestBody>): Promise<IHttpResponse>{
    try{
      const {refreshToken} = request.body
      const command = new InitiateAuthCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters:{
          REFRESH_TOKEN: refreshToken
        }
      })

     const {AuthenticationResult} =  await this.cognitoClient.send(command)

     if(!AuthenticationResult){
      throw new HttpError(401,{ error: 'Invalid Credentials'})
     }

     return{
      statusCode: 200,
      body: {
        accessToken: AuthenticationResult.AccessToken,
      }
    }
    }catch(error){
       handleSigninError(error)
    }
  }
}
