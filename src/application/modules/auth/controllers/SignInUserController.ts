
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { HttpError } from '../../../errors/httpError';
import { handleSigninError } from '../../../errors/signinCognitoErrors';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';


interface ISignInUserRequestBody{
  email: string
  password: string
}

export class SignInUserController implements IController<ISignInUserRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<ISignInUserRequestBody>): Promise<IHttpResponse>{
    try{
      const {email,password } = request.body
      const command = new InitiateAuthCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters:{
          USERNAME: email,
          PASSWORD: password
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
        refreshToken: AuthenticationResult.RefreshToken
      }
    }
    }catch(error){
       handleSigninError(error)
    }
  }
}
