import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { PersonaModel, PersonInsertRequest } from '@Models/Person';
import { PersonasService } from '@Services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';


@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CustomTableComponent, MatDialogModule],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  private fb = inject(FormBuilder);
  private personService = inject(PersonasService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  persons = signal<PersonaModel[]>([]);
  personsList: PersonaModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe((data) => {
      this.persons.set(data.response);
      this.personsList = data.response;
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, apPaterno, apMaterno, direccion} = this.form.getRawValue();
      const request: PersonInsertRequest = {
        Nombre: nombre,
        ApPaterno: apPaterno,
        ApMaterno: apMaterno,
        Direccion: direccion
      };
      this.personService.insertPersons(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getPersons();
          },
          error: (err) => {
            console.log(err)
            // this.toastr.error('Ha Ocurrido un Error', err);
          }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  editPerson(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Nombre', placeholder: 'Nombre', formControlName: 'nombre', validators: [Validators.required], type: 'input', defaultValue: data.Nombre },
      { label: 'Apellido Paterno', placeholder: 'Apellido Paterno', formControlName: 'apPaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApPaterno },
      { label: 'Apellido Materno', placeholder: 'Apellido Materno', formControlName: 'apMaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApMaterno },
      { label: 'Dirección', placeholder: 'Dirección', formControlName: 'direccion', validators: [Validators.required], type: 'input', defaultValue: data.Direccion },
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar persona',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.personService.updatePersons(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getPersons();
          },
          error: (err) => {
            console.log(err)
            // this.toastr.error('Ha Ocurrido un Error', err);
          }
      });
        console.log('Editado:', result);
      }
    });
  }

  deletePerson(data: PersonaModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `${data.Nombre} ${data.ApPaterno} ${data.ApMaterno}`, moduleName: 'Persona'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.personService.deletePersons(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getPersons();
        },
        error: (err) => {
          console.log(err)
          // this.toastr.error('Ha Ocurrido un Error', err);
        }
      });
        console.log('Eliminado:', data.Id);
      }
    });
  }
}
