import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { CarreraModel, MajorInserRequest } from 'src/app/core/models/majors';
import { CarrerasService } from 'src/app/core/services/carreras.service';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CustomTableComponent,
    MatDialogModule
  ],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent {
  private fb = inject(FormBuilder);
  private majorService = inject(CarrerasService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  majors = signal<CarreraModel[]>([]);
  majorsList: CarreraModel[] = [];

  form = this.fb.nonNullable.group({
    nombreCarrera: ['', [Validators.required]],
    abreviatura: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getMajors();
  }

  getMajors(){
    this.majorService.getMajors().subscribe((data) => {
      this.majors.set(data.response);
      this.majorsList = data.response;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { nombreCarrera, abreviatura } = this.form.getRawValue();
      const request: MajorInserRequest = {
        NombreCarrera: nombreCarrera,
        Abreviatura: abreviatura
      };
      this.majorService.insertMajor(request)
        .subscribe({
          next: (res) => {
            const data = res;
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

  editMajor(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Nombre de la Carrera', placeholder: 'Nombre Carrera', formControlName: 'nombreCarrera', validators: [Validators.required], type: 'input', defaultValue: data.NombreCarrera },
      { label: 'Abreviatura', placeholder: 'Abreviatura', formControlName: 'abreviatura', validators: [Validators.required], type: 'input', defaultValue: data.Abreviatura },

    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar carrera',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.majorService.updateMajors(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getMajors();
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

  deleteMajor(data: CarreraModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: data.NombreCarrera, moduleName: 'Carrera'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.majorService.deleteMajor(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getMajors();
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
