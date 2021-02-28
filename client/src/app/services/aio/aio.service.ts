import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AioService {

  constructor() { }

  
  getFormData(event){
    let confirm = document.getElementById(`file-upload`);
    let target = event.target || event.srcElement;
    let file = target.files[0];
    let formData: FormData = new FormData();
    formData.set('image', file, file?.name || '')

    return file ? 
    formData : null;
  }
}
