
import { makeListUsersController, makeUserMeController, makeUpdateUserController } from '../factories/users';
import { makeHandler } from '../middy/makeHandler';
import { makeRoutesHandler } from '../middy/makeRoutesHandler';


export const handler = makeRoutesHandler([
  {
    path: '/users',
    method: 'GET',
    handler: makeHandler(makeListUsersController())
  },
  {
    path: '/users/me',
    method: 'GET',
    handler: makeHandler(makeUserMeController())
  },
  {
    path: '/users/{userId}',
    method: 'PUT',
    handler: makeHandler(makeUpdateUserController())
  }
])
