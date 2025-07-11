import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTree } from './resource-tree';

describe('ResourceTree', () => {
  let component: ResourceTree;
  let fixture: ComponentFixture<ResourceTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
