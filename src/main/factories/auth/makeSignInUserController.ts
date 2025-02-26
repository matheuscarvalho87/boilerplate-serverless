import { cognitoClient } from '../../../application/clients/cognitoClient';
import { SignInUserController } from '../../../application/modules/auth/controllers/SignInUserController';

export function makeSignInUserController(){
  return new SignInUserController(cognitoClient)
}
