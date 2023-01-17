import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { passwordValidator } from '../shared/password.validator';
import { forbiddenNameValidator } from '../shared/user-name.validator';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        userName: [
          'Akshay',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator,
          ],
        ],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          pincode: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: passwordValidator }
    );
    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }

  // using FormGroup
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Akshay'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     pincode: new FormControl(''),
  //   }),
  // });

  // using FormBuilder

  // registrationForm = this.fb.group(
  //   {
  //     userName: [
  //       'Akshay',
  //       [Validators.required, Validators.minLength(3), forbiddenNameValidator],
  //     ],
  //     email: [''],
  //     subscribe: [false],
  //     password: [''],
  //     confirmPassword: [''],
  //     address: this.fb.group({
  //       city: [''],
  //       state: [''],
  //       pincode: [''],
  //     }),
  //   },
  //   { validator: passwordValidator }
  // );
  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addalternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  changeData() {
    // for changing all the data

    //   this.registrationForm.setValue({
    //     userName: 'Nikhil',
    //     password: 'Niks',
    //     confirmPassword: 'Niks',
    //     address: {
    //       city: 'Pune',
    //       state: 'Nu',
    //       pincode: '40465',
    //     },
    //   });

    // for changing some data
    this.registrationForm.patchValue({
      userName: 'Saurabh',
      password: 'Akshay',
      confirmPassword: 'Akshay',
    });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
