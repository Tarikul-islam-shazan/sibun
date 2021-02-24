import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaidBankPage } from './plaid-bank.page';

describe('PlaidBankPage', () => {
  let component: PlaidBankPage;
  let fixture: ComponentFixture<PlaidBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaidBankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaidBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
