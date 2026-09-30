import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompactNumberPipe } from 'extra-pipe';

@Component({
  selector: 'app-root',
  imports: [CompactNumberPipe],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
