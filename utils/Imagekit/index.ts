import ImageKit from 'imagekit';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';
import { FileI } from '../../pages/api/record';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const UploadImage = (file: FileI, folder: string) =>
  new Promise<UploadResponse>((resolve, reject) => {
    const params = {
      file: file.buffer,
      fileName: file.originalname,
      resourceType: 'image',
      folder: `health_cloud/${folder}`,
    };

    imagekit
      .upload(params)
      .then(response => {
        // console.log(response);
        resolve(response);
      })
      .catch(error => {
        // console.log(error);
        reject(error);
      });
  });

export default UploadImage;
