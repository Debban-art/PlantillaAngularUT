import { Component, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaModel } from '@Models/Person';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';

export interface ActualizarDialogData{
  title: string;
  fields: ConfigCampos[];
  data: any;
}


@Component({
  selector: 'app-actualizar-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,],
  templateUrl: './actualizar-popup.component.html',
  styleUrl: './actualizar-popup.component.css'
})
export class ActualizarPopupComponent {

  idUsuario:number = 0;
  form: FormGroup;
  private fb = inject(FormBuilder)
  constructor(
    
    public dialogRef: MatDialogRef<ActualizarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonaModel
  ) {
    this.form = this.fb.nonNullable.group({
      id: [data.Id, [Validators.required]],
      nombre: [data.Nombre, [Validators.required]],
      apPaterno: [data.ApPaterno, [Validators.required]],
      apMaterno: [data.ApMaterno, [Validators.required]],
      direccion: [data.Direccion, [Validators.required]]
    });
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
