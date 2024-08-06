import { Component, Inject, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaModel } from '@Models/Person';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

export interface ActualizarDialogData{
  title: string;
  fields: ConfigCampos[];
  data: any;
}


@Component({
  selector: 'app-actualizar-popup',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './actualizar-popup.component.html',
  styleUrl: './actualizar-popup.component.css'
})
export class ActualizarPopupComponent implements OnInit {

  idUsuario:number = 0;
  private fb = inject(FormBuilder)
  form: FormGroup = this.fb.group({});

  constructor(

    public dialogRef: MatDialogRef<ActualizarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActualizarDialogData
  ) {}

  ngOnInit(): void{
    this.form = this.fb.group({});
    this.data.fields.forEach(field => {
      const defaultValue = field.defaultValue !== undefined ? field.defaultValue : this.data.data[field.formControlName];
      this.form.addControl(field.formControlName, this.fb.control(defaultValue, field.validators));
    })
  }
  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
