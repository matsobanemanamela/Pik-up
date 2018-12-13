import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsAndTalentComponent } from './add-skills-and-talent.component';

describe('AddSkillsAndTalentComponent', () => {
  let component: AddSkillsAndTalentComponent;
  let fixture: ComponentFixture<AddSkillsAndTalentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillsAndTalentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsAndTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
