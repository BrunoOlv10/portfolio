import {trigger, style, animate, transition, state} from '@angular/animations';

export const fadeSlideUp = trigger('fadeSlideUp', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateY(250px)',
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateY(0)',
  })),
  transition('hidden => visible', animate('1000ms ease-out')),
  transition('visible => hidden', animate('1000ms ease-in'))
]);

export const fadeInZoomUp = trigger('fadeInZoomUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }))
  ])
]);

export const expandCollapse = trigger('expandCollapse', [
  transition(':enter', [
    style({ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }),
    animate('300ms ease', style({ height: '*', opacity: 1, paddingTop: '*', paddingBottom: '*' }))
  ]),
  transition(':leave', [
    animate('300ms ease', style({ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }))
  ])
]);