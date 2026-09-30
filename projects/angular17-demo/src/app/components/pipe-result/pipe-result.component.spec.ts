import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeResultComponent } from './pipe-result.component';

describe('PipeResultComponent', () => {
  let fixture: ComponentFixture<PipeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PipeResultComponent);
    fixture.detectChanges();
  });

  it('adds an item without mutating the previous collection', () => {
    const component = fixture.componentInstance;
    const previousItems = component.items;
    const previousContents = [...previousItems];

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(component.items).not.toBe(previousItems);
    expect(previousItems).toEqual(previousContents);
    expect(component.items[component.items.length - 1]).toEqual({
      id: 4,
      name: 'New item',
    });
  });
});
