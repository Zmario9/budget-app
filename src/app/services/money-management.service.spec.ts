import { TestBed } from '@angular/core/testing';
//Comentario
import { MoneyManagementService } from './money-management.service';

describe('MoneyManagementService', () => {
  let service: MoneyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
