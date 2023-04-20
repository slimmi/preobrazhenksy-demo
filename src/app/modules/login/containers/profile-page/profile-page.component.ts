import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'em-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
}
