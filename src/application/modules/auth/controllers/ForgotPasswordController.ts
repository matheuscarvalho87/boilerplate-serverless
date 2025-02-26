
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';
import { handleConfirmSignupError } from '../../../errors/signupCognitoError';

interface IForgotPasswordRequestBody{
  email: string
}

export class ForgotPasswordController implements IController<IForgotPasswordRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<IForgotPasswordRequestBody>): Promise<IHttpResponse>{
    try{
      const { email } = request.body
      const command =  new ForgotPasswordCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
      })

      await this.cognitoClient.send(command)
      return{
        statusCode: 204,
      }
    }catch(error){
      handleConfirmSignupError(error)
    }
  }
}
