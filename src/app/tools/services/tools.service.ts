import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  
  copy( data: string, notifText: string = 'Copied!' ){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = data;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.generateNotification(notifText, "primary");
  }


  
  getFormData( event: Event, fileName: string, dataName: string = 'image' ): FormData | null{

    let target = (event.target || event.srcElement) as HTMLInputElement;
    let files = target.files as FileList;
    let file = files[0];

    let formData: FormData = new FormData();
    
    fileName = fileName.split(' ').join('-').toLowerCase() + '.' + file?.name.split('.')[1] || file?.name || ''

    formData.set('image', file, fileName );

    return file ? 
    formData : null;
  }


  
  generateNotification( text: string, status: 'primary' | 'success' | 'err' = 'err' ){
    let wrapper = document.createElement('div')
    wrapper.classList.add('notification');
    wrapper.classList.add(`notification--${status}`);

    let p = document.createElement('p')
    p.classList.add('notification__text')
    // this.renderer.createText()
    let spanIcon = document.createElement('span')
    spanIcon.classList.add('notification__icon')

    if ( status == 'success' )
      p.appendChild(spanIcon)
    if ( status == 'err' )
      p.appendChild(spanIcon)

    p.innerHTML += text;


    
    wrapper.appendChild(p)


    // wrapper.classList.add( isError ? 'error' : 'success' )
    // height ? wrapper.classList.add('publish-height') : {}

    let notifBlock = document.querySelector('#notifications-block')

    notifBlock?.appendChild( wrapper );
    setTimeout(() => {
      wrapper.classList.add('notification--show')
    }, 20);

    setTimeout(() => {
      wrapper.classList.remove('notification--show')
    }, 4100);

    setTimeout(() => {
      wrapper.remove();
    }, 4300);
  }

  
  private removeNotifications(){
    document.querySelectorAll('#notifications-block .notification').forEach( n => n.remove())
  }
}
