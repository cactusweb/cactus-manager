import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ell-title]',
  host: {
    "mousemove": "onMouseMove($event)",
    "mouseleave": "onMouseLeave()"
  }
})
export class EllTitleDirective implements OnInit, OnDestroy {

  titleDiv: HTMLElement;

  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2
  ) { 
  }

  ngOnInit(){
    this.generateTitleDiv();
  }

  ngOnDestroy(){
    this.titleDiv.remove();
  }

  generateTitleDiv(){
    this.titleDiv = this.renderer.createElement('div');
    this.titleDiv.id = 'ell-title';
    
  }


  onMouseMove( e: MouseEvent ){
    console.log(e)
    this.renderer.setStyle(this.titleDiv, 'top', e.clientY )
    this.renderer.setStyle(this.titleDiv, 'left', e.clientX )


    if ( !document.querySelector('#ell-title') ){
      document.body.appendChild(this.titleDiv)
      this.titleDiv.innerText = this.eRef.nativeElement.innerText;
    }
  }

  onMouseLeave(){
    this.titleDiv.remove();
  }

}
