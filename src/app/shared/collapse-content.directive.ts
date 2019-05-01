import {Directive, HostListener, HostBinding, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appCollapseContent]'
})
export class CollapseContentDirective implements OnInit {
  @HostBinding('class.show') isOpen = false;
  private collapseRef;
  private caretRef;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.collapseRef = this.elRef.nativeElement.querySelector('.collapse');
    this.caretRef = this.elRef.nativeElement.querySelector('.caret');
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.collapseRef.classList.add('show');
      if (this.caretRef != null) {
        this.caretRef.classList.remove('down');
        this.caretRef.classList.add('up');
      }
    } else {
      this.collapseRef.classList.remove('show');
      if (this.caretRef != null) {
        this.caretRef.classList.remove('up');
        this.caretRef.classList.add('down');
      }
    }
  }
}
