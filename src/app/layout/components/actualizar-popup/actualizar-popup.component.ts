//Este es un componente reutilizable dinámico que podrá ser usado para cualquier módulo.
//Permie actualizar los valores de un determinado registro

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';

//Esta interface contiene todo lo que el component del módulo tiene que pasar
export interface ActualizarDialogData{
  title: string; // El título del módulo (Personas, carreras, clases, etc.)
  fields: ConfigCampos[]; //Los campos que apareceran en el form (nombre, dirección, apellidos, etc.) Es del tipo ConfigCampos que contiene elementos como el label y el formname
  data: any; // Los datos de ese registro
  id: number; // El id del registro que se desea actualizar
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
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './actualizar-popup.component.html',
  styleUrl: './actualizar-popup.component.css'
})
export class ActualizarPopupComponent implements OnInit {

  // idUsuario:number = 0;
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ActualizarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActualizarDialogData
  ) {
    
  }

  ngOnInit(): void{

    // Por cada campo en los datos pasados se agregara un control al form de manera dinámica con un valor default y los validators específicados.
    this.data.fields.forEach(field => {
      this.form.addControl(
        field.formControlName,
        this.fb.control(field.defaultValue, field.validators)
      )
    })

    // Se añade otro control para guardar el id para que se pueda realizar el update. Este no podrá ser cambiado por el usuario
    this.form.addControl('id', this.fb.control(this.data.id))
    
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
