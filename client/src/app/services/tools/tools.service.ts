import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  outputDate(date: Date){
    return date.getFullYear() ? ((date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) + '.' + (date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth() + 1) + '.' + date.getFullYear()) : '';
  }

  validDate(date: Date){
    return date ? date.getFullYear() + '-' + (date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()) : '';
  }

  copy(id){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.getElementById(id).innerHTML;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  
  generateKey() {
    let library = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789"
    let newPassword = "";
    for (var i = 0; i < 16; i++) {
      if (i == 4 || i == 8 || i == 12){
        newPassword += '-';
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
      else{
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
    }
    return newPassword;
  }
}
