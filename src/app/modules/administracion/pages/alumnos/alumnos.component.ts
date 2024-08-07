import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { StudentModel, StudentInsertRequest } from 'src/app/core/models/students';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule
  ],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit{
  private fb = inject(FormBuilder);
  private alumnosService = inject(AlumnosService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  students = signal<StudentModel[]>([]);
  studentsList: StudentModel[] = [];

  form = this.fb.nonNullable.group({
    matricula: ['', Validators.required],
    nombre: ['', Validators.required],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getStudents();
  }

  getStudents() {
    this.alumnosService.getStudents().subscribe((data) => {
      this.students.set(data.response);
      this.studentsList = data.response;
    });
  }

  onSubmit(): void {
    if (this.form.valid){
      const { matricula, nombre, apPaterno, apMaterno, direccion } = this.form.getRawValue();
      const request: StudentInsertRequest = {
        Matricula: matricula,
        Nombre: nombre,
        ApPaterno: apPaterno,
        ApMaterno: apMaterno,
        Direccion: direccion
      };
      this.alumnosService.insertStudents(request)
      .subscribe({
        next: (res) => {
          const data = res;
          this.getStudents();
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
  editStudent(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Matrícula', placeholder: 'Matrícula', formControlName: 'matricula', validators:[Validators.required], type: 'input', defaultValue: data.Matricula},
      { label: 'Nombre', placeholder: 'Nombre', formControlName: 'nombre', validators: [Validators.required], type: 'input', defaultValue: data.Nombre },
      { label: 'Apellido Paterno', placeholder: 'Apellido Paterno', formControlName: 'apPaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApPaterno },
      { label: 'Apellido Materno', placeholder: 'Apellido Materno', formControlName: 'apMaterno', validators: [Validators.required], type: 'input', defaultValue: data.ApMaterno },
      { label: 'Dirección', placeholder: 'Dirección', formControlName: 'direccion', validators: [Validators.required], type: 'input', defaultValue: data.Direccion },
    ]
    const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar alumno',
        fields: fields,
        data: data,
        id: data.Id
      } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alumnosService.updateStudents(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getStudents();
          },
          error: (err) => {
            console.log(err)
            // this.toastr.error('Ha Ocurrido un Error', err);
          }
        });
      }console.log('Editado:', result);
    });
  }

  deleteStudent(data: StudentModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `${data.Matricula} ${data.Nombre} ${data.ApPaterno} ${data.ApMaterno}`, moduleName: 'Alumnos'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alumnosService.deleteStudents(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getStudents();
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
