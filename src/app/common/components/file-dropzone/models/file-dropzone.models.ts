export enum FileDropzoneAcceptedTypes {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
}

export const FileDropzoneAcceptedTypesNamesMap = new Map<
  FileDropzoneAcceptedTypes,
  string
>()
  .set(FileDropzoneAcceptedTypes.PNG, 'PNG')
  .set(FileDropzoneAcceptedTypes.JPEG, 'JPEG')
  .set(FileDropzoneAcceptedTypes.JPG, 'JPG');
