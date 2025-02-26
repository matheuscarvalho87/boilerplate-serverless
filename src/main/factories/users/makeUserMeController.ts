import { cognitoClient } from '../../../application/clients/cognitoClient';
import { UserMeController } from '../../../application/modules/users';


export function makeUserMeController(){
  return new UserMeController(cognitoClient)
}
