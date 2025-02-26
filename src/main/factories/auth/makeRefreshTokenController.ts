import { cognitoClient } from '../../../application/clients/cognitoClient';
import { RefreshTokenController } from '../../../application/modules/auth';

export function makeRefreshTokenController(){
  return new RefreshTokenController(cognitoClient)
}
