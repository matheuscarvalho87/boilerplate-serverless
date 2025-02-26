
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';
import { handleConfirmSignupError } from '../../../errors/signupCognitoError';

interface IConfirmAccountRequestBody{
  email: string
  code:string
}

export class ConfirmAccountController implements IController<IConfirmAccountRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<IConfirmAccountRequestBody>): Promise<IHttpResponse>{
    try{
      const {email,code } = request.body
      const command =  new ConfirmSignUpCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code
      })

      const { Session } = await this.cognitoClient.send(command)
      return{
        statusCode: 204,
        body: {
          session: Session
        }
      }
    }catch(error){
      handleConfirmSignupError(error)
    }
  }
}
