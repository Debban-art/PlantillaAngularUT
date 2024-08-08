import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { MateriaModel, SubjectInsertRequest } from 'src/app/core/models/subjects';
import { MateriasService } from 'src/app/core/services/materias.service';
import { CarreraModel } from 'src/app/core/models/majors';
import { CarrerasService } from 'src/app/core/services/carreras.service';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  private fb = inject(FormBuilder);
  private subjectService = inject(MateriasService);
  private majorService = inject(CarrerasService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  subjects = signal<MateriaModel[]>([]);
  subjectsList: MateriaModel[] = [];
  majors = signal<CarreraModel[]>([]);
  majorsList: CarreraModel[] = [];

  form = this.fb.nonNullable.group({
    nombreMateria: ['', Validators.required],
    claveMateria: ['', Validators.required],
    idCarrera: [0, Validators.required]
  })

  ngOnInit(): void{
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getSubjects();
    this.getMajors();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects.set(data.response);
      this.subjectsList = data.response;
    });
  }

  getMajors(){
    this.majorService.getMajors().subscribe((data) => {
      this.majors.set(data.response);
      this.majorsList = data.response;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { nombreMateria, claveMateria, idCarrera} = this.form.getRawValue();
      const request: SubjectInsertRequest = {
        NombreMateria: nombreMateria,
        ClaveMateria: claveMateria,
        IdCarrera: Number(idCarrera)
      };
      console.log(request);
      this.subjectService.insertSubject(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getSubjects();
            this.getMajors();
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

  editSubject(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Nombre', placeholder: 'Nombre', formControlName: 'nombreMateria', validators: [Validators.required], type: 'input', defaultValue: data.NombreMateria },
      { label: 'Clave', placeholder: 'Clave', formControlName: 'claveMateria', validators: [Validators.required], type: 'input', defaultValue: data.ClaveMateria },
      { label: 'Carrera', placeholder: 'Carrera', formControlName: 'idCarrera', validators: [Validators.required], type: 'select', options: this.majorsList.map(major => ({ value: major.Id, viewValue: major.Abreviatura })),defaultValue: data.IdCarrera },
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar materia',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.subjectService.updateSubject(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getSubjects();
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

  deleteSubject(data: MateriaModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: data.NombreMateria, moduleName: 'Materia'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subjectService.deleteSubject(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getSubjects();
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
