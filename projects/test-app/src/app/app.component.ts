import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PipeResultComponent } from './components/pipe-result/pipe-result.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [PipeResultComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
