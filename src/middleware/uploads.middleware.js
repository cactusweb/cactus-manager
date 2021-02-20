import expressFileUpload from 'express-fileupload'

export const fileUpload = expressFileUpload({
  createParentPath: true,
  abortOnLimit: true,
  responseOnLimit: JSON.stringify({ message: 'Размер файла слишком большой' }),
  limits: { fileSize: 10 * 1024 * 1024 }
})
