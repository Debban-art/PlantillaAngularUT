import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table'
import { PersonaModel, PersonInsertRequest } from '@Models/Person';
import { PerfilModel } from '@Models/Profile';
import { TiendaModel } from '@Models/Store';
import { PersonasService, StoresService, PerfilesService } from '@Services';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CustomTableComponent],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  private fb = inject(FormBuilder);
  private personService = inject(PersonasService);

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
      this.persons.set(data.Response.data);
      this.personsList = data.Response.data;
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
    console.log(data)
  }

  deletePerson(id:number){
    console.log(id)
  }
}
