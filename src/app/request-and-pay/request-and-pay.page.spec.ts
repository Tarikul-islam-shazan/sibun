import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestAndPayPage } from './request-and-pay.page';

describe('RequestAndPayPage', () => {
  let component: RequestAndPayPage;
  let fixture: ComponentFixture<RequestAndPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAndPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAndPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
