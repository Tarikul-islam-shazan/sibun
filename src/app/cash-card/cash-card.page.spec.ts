import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashCardPage } from './cash-card.page';

describe('CashCardPage', () => {
  let component: CashCardPage;
  let fixture: ComponentFixture<CashCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
