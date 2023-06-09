import 'zone.js/dist/zone';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { of, from, Observable, Subscription, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <p #para>this is a paragraph</p>
  `,
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('para') par: ElementRef | undefined;
  name = 'Angular';

  ngOnInit() {
    const spiceGirls = ['Posh', 'Ginger', 'Sporty', 'Scary', 'Baby'];
    from(spiceGirls).subscribe((x) => console.log(x));

    of(...spiceGirls).subscribe((x) => console.log(x));

    const observer = {
      next: (item: any) => console.log(`resulting item ${item}`),
      error: (err: any) => console.error(`error occurred ${err}`),
      complete: () => console.log(`complete`),
    };

    const observables$ = new Observable((subscription) => {
      subscription.next('posh spice');
      subscription.next('scary spice');
      subscription.complete();
    });

    observables$.subscribe((x) => console.log(x));

    //interval(1000).subscribe(console.log);
  }

  ngAfterViewInit() {
    const parStream = fromEvent(this.par?.nativeElement, 'click').subscribe(
      (x) => console.log(x)
    );
  }
}

bootstrapApplication(App);
