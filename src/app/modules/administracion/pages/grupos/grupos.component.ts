import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarPopupComponent, EliminarRegistroData } from 'src/app/layout/components/eliminar-popup/eliminar-popup.component';
import { ActualizarDialogData, ActualizarPopupComponent } from 'src/app/layout/components/actualizar-popup/actualizar-popup.component';
import { ConfigCampos } from 'src/app/core/models/configuracion-campos/config-campos';
import { GrupoModel, GroupInsertRequest } from 'src/app/core/models/groups';
import { GruposService } from 'src/app/core/services/grupos.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CustomTableComponent, MatDialogModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  private fb = inject(FormBuilder);
  private groupService = inject(GruposService);
  private dialog = inject(MatDialog);

  idUsuario:number = 0;
  groups = signal<GrupoModel[]>([]);
  groupsList: GrupoModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    clave: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem('idUsuario'))
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups().subscribe((data) => {
      this.groups.set(data.response);
      this.groupsList = data.response;
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, clave} = this.form.getRawValue();
      const request: GroupInsertRequest = {
        Nombre: nombre,
        Clave: clave,
      };
      this.groupService.insertGroup(request)
        .subscribe({
          next: (res) => {
            const data = res;
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

  editGroup(data:any){
    const fields: ConfigCampos[] = [
      { label: 'Nombre', placeholder: 'Nombre', formControlName: 'nombre', validators: [Validators.required], type: 'input', defaultValue: data.Nombre },
      { label: 'Clave', placeholder: 'Clave', formControlName: 'clave', validators: [Validators.required], type: 'input', defaultValue: data.Clave },
      
    ]
     const dialogRef = this.dialog.open(ActualizarPopupComponent, {
      data: {
        title: 'Editar grupo',
        fields: fields,
        data: data,
        id: data.Id
    } as ActualizarDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí llamas al servicio para actualizar la persona con los datos recibidos
        this.groupService.updateGroup(result)
        .subscribe({
          next: (res) => {
            const data = res;
            this.getGroups();
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

  deleteGroup(data: GrupoModel){
    const dialogRef = this.dialog.open(EliminarPopupComponent, {
      data: { id: data.Id, name: data.Nombre , moduleName: 'Grupo'  } as EliminarRegistroData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.groupService.deleteGroup(data.Id)
        .subscribe({next: (res) => {
          const data = res;
          this.getGroups();
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
