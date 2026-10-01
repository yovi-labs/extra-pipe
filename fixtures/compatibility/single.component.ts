import { Component } from '@angular/core';
import { CompactNumberPipe } from 'extra-pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CompactNumberPipe],
  template: `{{ 12500 | compactNumber }}`,
})
export class SingleComponent {}
