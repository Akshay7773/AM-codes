import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit, OnDestroy {
  constructor(private eService: EnrollmentService) {}

  // for custom observable and observer
  customSubscription!: Subscription;

  userdata = {
    name: '',
    email: '',
    contact: '',
    language: '',
    gender: '',
  };
  ngOnInit(): void {
    // custom observable
    let customObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });
    this.customSubscription = customObservable.subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.customSubscription.unsubscribe();
  }
  onSubmit() {
    this.eService.enroll(this.userdata).subscribe(
      (data) => console.log('success!!', data),
      (error) => console.log('error', error)
    );
    // console.log(this.userdata);
  }

  // Observable practice
}
