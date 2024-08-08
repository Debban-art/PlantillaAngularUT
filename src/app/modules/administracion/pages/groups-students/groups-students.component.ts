import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { GruposAlumnosModel, GroupsStudentsInsertRequest } from 'src/app/core/models/groupsStudents';
import { GruposAlumnosService } from 'src/app/core/services/grupos-alumnos.service';
import { GrupoModel } from 'src/app/core/models/groups';
import { GruposService } from 'src/app/core/services/grupos.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-groups-students',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './groups-students.component.html',
  styleUrl: './groups-students.component.css'
})
export class GroupsStudentsComponent {
  private fb = inject(FormBuilder);
  private groupStudentService = inject(GruposAlumnosService);
  private groupService = inject(GruposService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  groupStudents = signal<GruposAlumnosModel[]>([]);
  groupStudentsList: GruposAlumnosModel[] = [];
  groups = signal<GrupoModel[]>([]);
  groupsList: GrupoModel[] = [];

  form = this.fb.nonNullable.group({
    matricula: ['', Validators.required],
    idGrupo: [0, Validators.required]
  })

  ngOnInit(): void{
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getGroupStudents();
    this.getGroups();
  }

  getGroupStudents() {
    this.groupStudentService.getGroupsStudents().subscribe((data) => {
      this.groupStudents.set(data.response);
      this.groupStudentsList = data.response;
    });
  }

  getGroups(){
    this.groupService.getGroups().subscribe((data) => {
      this.groups.set(data.response);
      this.groupsList = data.response;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { matricula, idGrupo} = this.form.getRawValue();
      const request: GroupsStudentsInsertRequest = {
        Matricula: matricula,
        IdGrupo: Number(idGrupo)
      };
      console.log(request);
      this.groupStudentService.insertGroupStudent(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGroupStudents();
            this.getGroups();
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

  editGroupStudent(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Matricula', placeholder: 'Matricula', formControlName: 'matricula', validators: [Validators.required], type: 'input', defaultValue: data.Matricula },
      { label: 'Grupo', placeholder: 'Grupo', formControlName: 'idGrupo', validators: [Validators.required], type: 'select', options: this.groupsList.map(major => ({ value: major.Id, viewValue: major.Clave })), defaultValue: data.Id},
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar Grupo-Alumno',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.groupStudentService.updateGroupStudent(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGroupStudents();
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

  deleteGroupStudent(data: GruposAlumnosModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `${data.Alumno} de ${data.Grupo}`, moduleName: 'Grupo-Alumno'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupStudentService.deleteGroupStudent(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getGroupStudents();
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
