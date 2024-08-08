import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { GruposMateriasModel, GroupsSubjectsInsertRequest } from 'src/app/core/models/groups-subjects';
import { GruposMateriasService } from 'src/app/core/services/grupos-materias.service';
import { GrupoModel } from 'src/app/core/models/groups';
import { GruposService } from 'src/app/core/services/grupos.service';
import { MateriaModel } from 'src/app/core/models/subjects';
import { MateriasService } from 'src/app/core/services/materias.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-grupos-materias',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './grupos-materias.component.html',
  styleUrl: './grupos-materias.component.css'
})
export class GruposMateriasComponent {
  private fb = inject(FormBuilder);
  private groupSubjectService = inject(GruposMateriasService);
  private subjectService = inject(MateriasService);
  private groupService = inject(GruposService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  groupSubjects = signal<GruposMateriasModel[]>([]);
  groupSubjectsList: GruposMateriasModel[] = [];
  groups = signal<GrupoModel[]>([]);
  groupsList: GrupoModel[] = [];
  subjects = signal<MateriaModel  []>([]);
  subjectsList: MateriaModel[] = [];

  form = this.fb.nonNullable.group({
    idMateria: [0, Validators.required],
    idGrupo: [0, Validators.required]
  })

  ngOnInit(): void{
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getGroupSubjects();
    this.getGroups();
    this.getSubjects();
  }

  getGroupSubjects() {
    this.groupSubjectService.getGroupsSubjects().subscribe((data) => {
      this.groupSubjects.set(data.response);
      this.groupSubjectsList = data.response;
    });
  }

  getGroups(){
    this.groupService.getGroups().subscribe((data) => {
      this.groups.set(data.response);
      this.groupsList = data.response;
    });
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects.set(data.response);
      this.subjectsList = data.response;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { idMateria, idGrupo} = this.form.getRawValue();
      const request: GroupsSubjectsInsertRequest = {
        IdMateria: Number(idMateria),
        IdGrupo: Number(idGrupo)
      };
      console.log(request);
      this.groupSubjectService.insertGroupSubject(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGroupSubjects();
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

  editGroupSubject(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Materia', placeholder: 'Materia', formControlName: 'idmateria', validators: [Validators.required], type: 'select', options: this.subjectsList.map(subject => ({ value: subject.Id, viewValue: subject.ClaveMateria })),defaultValue: data.IdMateria },
      { label: 'Grupo', placeholder: 'Grupo', formControlName: 'idGrupo', validators: [Validators.required], type: 'select', options: this.groupsList.map(group => ({ value: group.Id, viewValue: group.Clave })), defaultValue: data.IdGrupo},
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar Grupo-Materia',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.groupSubjectService.updateGroupSubject(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGroupSubjects();
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

  deleteGroupSubject(data: GruposMateriasModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `${data.Materia} de ${data.Grupo}`, moduleName: 'Grupo-Materia'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupSubjectService.deleteGroupSubject(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getGroupSubjects();
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
