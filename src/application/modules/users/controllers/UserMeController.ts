import { AdminGetUserCommand, CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { IController } from '../../../types/IController';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';
import { HttpError } from '../../../errors/httpError';

interface IProfileBasicInfo{
    email: string
		emailVerified:  string
		firstName: string
		lastName: string
		sub:  string
}

export class UserMeController implements IController{
  constructor(private readonly cognitoClient: CognitoIdentityProviderClient){}
  async handler(request:IHttpRequest<any>): Promise<IHttpResponse> {
    const userId = request.context?.claims.sub as string

    if(!userId){
      throw new HttpError(403, {message:'Error on get user data'})
    }

    const command = new AdminGetUserCommand({
      Username: userId,
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID
    })

    const { UserAttributes } = await this.cognitoClient.send(command)

    const profile = UserAttributes?.reduce((profileObj, {Name, Value}) => {
      const keyMap = {
        given_name: 'firstName',
        family_name: 'lastName',
        sub: 'id',
        email_verified: 'emailVerified',
        email: 'email'
      }
      return {
        ...profileObj,
        [keyMap[Name as keyof typeof keyMap ?? Name]]: Value
      }
    },{} as IProfileBasicInfo)
    return{
        statusCode: 200,
        body: {
          profile
      }
    }
  }

}
