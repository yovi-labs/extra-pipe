import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IncludesPipe, RemoveByKeyPipe, RemoveDuplicatesByKeyPipe } from '../../../public-api';

@Component({
  selector: 'app-selection-test', standalone: true,
  imports: [JsonPipe, IncludesPipe, RemoveByKeyPipe, RemoveDuplicatesByKeyPipe],
  template: `<span class="includes">{{ values | includes: 2 }}</span>
    <span class="removed">{{ items | removeByKey: 'id': excluded | json }}</span>
    <span class="unique">{{ items | removeDuplicatesByKey: 'id' | json }}</span>`,
})
class SelectionTest {
  values = [1];
  items = [{ id: 1 }];
  readonly excluded = [1];
}

describe('pure selection template refresh', () => {
  it('requires replacement array references, not in-place mutation', () => {
    const fixture = TestBed.createComponent(SelectionTest);
    fixture.detectChanges();
    const rendered = () => fixture.nativeElement.textContent as string;
    const initial = rendered();
    fixture.componentInstance.values.push(2);
    fixture.componentInstance.items.push({ id: 2 });
    fixture.detectChanges();
    expect(rendered()).toBe(initial);
    fixture.componentInstance.values = [...fixture.componentInstance.values];
    fixture.componentInstance.items = [...fixture.componentInstance.items];
    fixture.detectChanges();
    expect(rendered()).toContain('true');
    expect(rendered()).toContain('2');
    expect(rendered()).not.toBe(initial);
  });
});
