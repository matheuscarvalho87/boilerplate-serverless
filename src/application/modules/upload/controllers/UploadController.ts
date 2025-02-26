import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { HttpError } from '../../../errors/httpError';
import { IController } from '../../../types/IController';
import { IFile } from '../../../types/IFile';
import { IHttpRequest, IHttpResponse } from '../../../types/IHttp';


interface IUploadRequestBody{
  file: IFile
}

export class UploadController implements IController<IUploadRequestBody>{

  constructor(private readonly s3Client: S3Client){}
  async handler(request: IHttpRequest<IUploadRequestBody>): Promise<IHttpResponse>{
    console.log('##HANDLER START')
    const {file} = request.body

    if(!file) {
      throw new HttpError(400,{ error: 'file required'})
    }

    const newFileName = `${randomUUID()}-${file.fileName}`

    const putObjectCommand = new PutObjectCommand({
      Bucket: 'matheus-0712-storage',
      Key: newFileName,
      Body: file.content
    })

    await this.s3Client.send(putObjectCommand)
    console.log('##HANDLER END')
    return{
      statusCode: 200,
      body: {
        filename: newFileName
      }
    }
  }
}
