import { cognitoClient } from '../../../application/clients/cognitoClient';
import { ConfirmAccountController } from '../../../application/modules/auth';

export function makeConfirmAccountController(){
  return new ConfirmAccountController(cognitoClient)
}
