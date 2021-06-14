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
    let fileName = localStorage.getItem('name').split(' ').join('-').toLowerCase() + '.' + file?.name.split('.')[1] || file?.name || ''
    console.log( fileName )
    formData.set('image', file, fileName );

    return file ? 
    formData : null;
  }
}
