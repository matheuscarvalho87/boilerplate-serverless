import { cognitoClient } from '../../../application/clients/cognitoClient';
import { ForgotPasswordController } from '../../../application/modules/auth';


export function makeForgotPasswordController(){
  return new ForgotPasswordController(cognitoClient)
}
