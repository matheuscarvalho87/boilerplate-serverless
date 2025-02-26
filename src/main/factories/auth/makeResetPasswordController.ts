import { cognitoClient } from '../../../application/clients/cognitoClient';
import { ResetPasswordController } from '../../../application/modules/auth';


export function makeResetPasswordController(){
  return new ResetPasswordController(cognitoClient)
}
