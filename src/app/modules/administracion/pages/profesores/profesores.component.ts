import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { ProfesorModel, TeacherInsertRequest } from 'src/app/core/models/teachers';
import { ProfesoresService } from 'src/app/core/services/profesores.service';


@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule
  ],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {
  private fb = inject(FormBuilder);
  private teacherService = inject(ProfesoresService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  teachers = signal<ProfesorModel[]>([]);
  teachersList: ProfesorModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  })

  ngOnInit(): void{
    this.idUsuario = Number(localStorage.getItem('IdUsuario'))
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers.set(data.response);
      this.teachersList = data.response;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { nombre, apPaterno, apMaterno, direccion} = this.form.getRawValue();
      const request: TeacherInsertRequest = {
        Nombre: nombre,
        ApPaterno: apPaterno,
        ApMaterno: apMaterno,
        Direccion: direccion
      };
      this.teacherService.insertTeacher(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getTeachers();
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

  editTeacher(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Nombre', placeholder: 'Nombre', formControlName: 'nombre', validators: [Validators.required], type: 'input', defaultValue: data.Nombre },
      { label: 'Apellido Paterno', placeholder: 'Apellido Paterno', formControlName: 'apPaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApPaterno },
      { label: 'Apellido Materno', placeholder: 'Apellido Materno', formControlName: 'apMaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApMaterno },
      { label: 'Dirección', placeholder: 'Dirección', formControlName: 'direccion', validators: [Validators.required], type: 'input', defaultValue: data.Direccion },
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar maestro',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.teacherService.updateTeacher(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getTeachers();
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

  deleteTeacher(data:any){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `${data.Nombre} ${data.ApPaterno} ${data.ApMaterno}`, moduleName: 'Profesor'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teacherService.deleteTeacher(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getTeachers();
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
