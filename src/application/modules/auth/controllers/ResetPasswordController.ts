
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';
import { handleConfirmSignupError } from '../../../errors/signupCognitoError';

interface IResetPasswordRequestBody{
  email: string
  code:string
  newPassword: string
}

export class ResetPasswordController implements IController<IResetPasswordRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<IResetPasswordRequestBody>): Promise<IHttpResponse>{
    try{
      const {email,code, newPassword } = request.body
      const command =  new ConfirmForgotPasswordCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword
      })

      await this.cognitoClient.send(command)
      return{
        statusCode: 204
      }
    }catch(error){
      handleConfirmSignupError(error)
    }
  }
}
