import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDialogComponent {

  title: string;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }) {
    this.title = data.title;
    this.content = data.content;
  }


  dialog = inject(MatDialog);

  openDialog(titulo: string, contenido: string) {
    this.title = titulo;
    this.content = contenido;
    this.dialog.open(AlertDialogComponent,);
  }

}
