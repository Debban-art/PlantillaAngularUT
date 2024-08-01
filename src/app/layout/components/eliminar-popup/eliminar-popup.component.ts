import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




export interface EliminarRegistroData {
  id: number;
  name: string;
  moduleName: string;
}


@Component({
  selector: 'app-eliminar-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './eliminar-popup.component.html',
  styleUrl: './eliminar-popup.component.css'
})
export class EliminarPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EliminarRegistroData
  ) {}

  onDelete(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}