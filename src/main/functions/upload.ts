import { makeUploadController } from '../factories/upload';
import { makeHandler } from '../middy/makeHandler';

export const handler = makeHandler(makeUploadController())
