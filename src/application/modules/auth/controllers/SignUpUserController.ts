
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { handleSignupCognitoError } from '../../../errors/signupCognitoError';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';


interface ISignUpUserRequestBody{
  firstName: string
  lastName:string
  email: string
  password: string
}

export class SignUpUserController implements IController<ISignUpUserRequestBody>{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request: IHttpRequest<ISignUpUserRequestBody>): Promise<IHttpResponse>{
    try{
      const {email,lastName,firstName,password } = request.body
      const command =  new SignUpCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes:[
          {Name: 'given_name', Value: firstName},
          {Name: 'family_name', Value: lastName}
        ]
      })

      const { UserSub } = await this.cognitoClient.send(command)
      return{
        statusCode: 201,
        body: {
          id: UserSub
        }
      }
    }catch(error){
       handleSignupCognitoError(error)
    }
  }
}
