
import {
   makeSignUpUserController,
   makeSignInUserController,
   makeConfirmAccountController,
   makeRefreshTokenController,
   makeForgotPasswordController,
   makeResetPasswordController
  } from '../factories/auth';
import { makeHandler } from '../middy/makeHandler';
import { makeRoutesHandler } from '../middy/makeRoutesHandler';


export const handler = makeRoutesHandler([
  {
    path: '/auth/sign-up',
    method: 'POST',
    handler: makeHandler(makeSignUpUserController())
  },
  {
    path: '/auth/sign-in',
    method: 'POST',
    handler: makeHandler(makeSignInUserController())
  },
  {
    path: '/auth/confirm-account',
    method: 'POST',
    handler: makeHandler(makeConfirmAccountController())
  },
  {
    path: '/auth/refresh-token',
    method: 'POST',
    handler: makeHandler(makeRefreshTokenController())
  },
  {
    path: '/auth/forgot-password',
    method: 'POST',
    handler: makeHandler(makeForgotPasswordController())
  },
  {
    path: '/auth/reset-password',
    method: 'POST',
    handler: makeHandler(makeResetPasswordController())
  }
])
