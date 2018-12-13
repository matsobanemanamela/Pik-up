import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAndTalentComponent } from './skills-and-talent.component';

describe('SkillsAndTalentComponent', () => {
  let component: SkillsAndTalentComponent;
  let fixture: ComponentFixture<SkillsAndTalentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsAndTalentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsAndTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
