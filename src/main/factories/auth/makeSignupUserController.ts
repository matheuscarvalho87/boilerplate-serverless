import { cognitoClient } from '../../../application/clients/cognitoClient';
import { SignUpUserController } from '../../../application/modules/auth';

export function makeSignUpUserController(){
  return new SignUpUserController(cognitoClient)
}
