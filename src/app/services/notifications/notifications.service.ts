import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  generateNotification( errCode: number, message: string ){

    let notification = document.createElement( 'div' );
    notification.classList.add('notification');

    let statusCode = document.createElement( 'span' );
    statusCode.classList.add('code');
    statusCode.innerHTML = `Error #${errCode}`;

    let messageBlock = document.createElement( 'p' );
    messageBlock.classList.add( 'message' );
    messageBlock.innerHTML =  message;

    notification.appendChild( statusCode )
    notification.appendChild( messageBlock )

    let notifBlock = document.querySelector( '#notifications-block' );
    notifBlock.appendChild( notification );

    setTimeout(() => {
      notification.classList.add( 'show' )
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show')
    }, 5500);

    setTimeout(() => {
      notification.remove();
    }, 6000);

  }
}
