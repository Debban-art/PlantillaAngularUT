import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { CalificacionModel, GradeInsertRequest } from 'src/app/core/models/grades';
import { CalificacionesService } from 'src/app/core/services/calificaciones.service';
import { MateriasService } from 'src/app/core/services/materias.service';
import { MateriaModel } from 'src/app/core/models/subjects';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.css'
})
export class CalificacionesComponent {
  private fb = inject(FormBuilder);
  private gradeService = inject(CalificacionesService);
  private subjectService = inject(MateriasService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  grades = signal<CalificacionModel[]>([]);
  gradesList: CalificacionModel[] = [];
  subjects = signal<MateriaModel[]>([]);
  subjectsList: MateriaModel[] = [];

  form = this.fb.nonNullable.group({
    matricula: ['', Validators.required],
    idMateria: [0, Validators.required],
    periodo: [0, Validators.required],
    parcial: [0, Validators.required],
    calificacion: [0, Validators.required],
  })

  ngOnInit(): void{
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getGrades();
    this.getSubjects();
  }

  getGrades() {
    this.gradeService.getGrades().subscribe((data) => {
      this.grades.set(data.response);
      this.gradesList = data.response;
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
      const { matricula, idMateria, periodo, parcial, calificacion} = this.form.getRawValue();
      const request: GradeInsertRequest = {
        Matricula: matricula,
        IdMateria: Number(idMateria),
        Periodo: Number(periodo),
        Parcial: Number(parcial),
        Calificacion: Number(calificacion)
      };
      console.log(request);
      this.gradeService.insertGrade(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGrades();
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

  editGrade(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Matricula', placeholder: 'Matricula', formControlName: 'matricula', validators: [Validators.required], type: 'input', defaultValue: data.Matricula },
      { label: 'Materia', placeholder: 'Materia', formControlName: 'idMateria', validators: [Validators.required], type: 'select', options: this.subjectsList.map(major => ({ value: major.Id, viewValue: major.ClaveMateria }))},
      { label: 'Periodo', placeholder: 'Periodo', formControlName: 'periodo', validators: [Validators.required], type: 'input', defaultValue: data.Periodo},
      { label: 'Parcial', placeholder: 'Parcial', formControlName: 'parcial', validators: [Validators.required], type: 'input', defaultValue: data.Parcial},
      { label: 'Calificación', placeholder: 'Calificación', formControlName: 'calificacion', validators: [Validators.required], type: 'input', defaultValue: data.Calificacion}

    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar Calificación',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.gradeService.updateGrade(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGrades();
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

  deleteGrade(data: CalificacionModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: `la calificación de ${data.Materia}`, moduleName: 'Calificaciones'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gradeService.deleteGrade(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getGrades();
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
