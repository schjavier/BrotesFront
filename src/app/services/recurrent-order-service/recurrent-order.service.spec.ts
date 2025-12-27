import { TestBed } from '@angular/core/testing';

import { RecurrentOrderService } from './recurrent-order.service';

describe('RecurrentOrderService', () => {
  let service: RecurrentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurrentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
