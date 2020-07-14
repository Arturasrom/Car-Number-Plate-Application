import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})

export class EditOwnerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetOwnerForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  OwnerForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = [];

  //Regex pattern validation for license plate validation - Upercase A to Z any 3 letters and 0 to 9 any 3 numbers.
  LicensePlatePatten = "^[A-Z]{3}[0-9]{3}$";

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private ownerApi: ApiService,
    private _snackBar: MatSnackBar

  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.ownerApi.GetOwner(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.OwnerForm = this.fb.group({
        owner_name: [data.owner_name, [Validators.required]],
        license_plate: [data.license_plate, [Validators.required, Validators.pattern(this.LicensePlatePatten)]],
      })
    })
  }

  /* Reactive book form */
  updateBookForm() {
    this.OwnerForm = this.fb.group({
      owner_name: ['', [Validators.required]],
      license_plate: ['', [Validators.required, Validators.pattern(this.LicensePlatePatten)]] //Add regex to to reactive form
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add language.
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }

    // Reset the input value.
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.OwnerForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.OwnerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateOwnerForm() {
    console.log(this.OwnerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to UPDATE?')) {
      this.ownerApi.UpdateOwner(id, this.OwnerForm.value).subscribe(res => {

        if (res.respondId === 1) {   //Check with API respond and display error message.
          this._snackBar.open(res.messageDescription, "ok", {
            duration: 3000,
          });
        }
        else {
          this.ngZone.run(() => this.router.navigateByUrl('/owners-list'))
        }

      });
    }
  }
}
