import { Component, Input, signal } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CardLayoutComponent } from "../card-layout/card-layout.component";

@Component({
  selector: 'profile-section-layout',
  standalone: true,
  imports: [MaterialModule, CardLayoutComponent],
  templateUrl: './profile-section-layout.component.html',
  styleUrl: './profile-section-layout.component.scss',
})
export class ProfileSectionLayoutComponent {
  @Input({ required: true }) public title!: string;
  public isEditing = signal(false);
  // @Input() editButtonDisabled: boolean = false;

  public toggleEdit(): void {
    this.isEditing.set(!this.isEditing());
  }
}
