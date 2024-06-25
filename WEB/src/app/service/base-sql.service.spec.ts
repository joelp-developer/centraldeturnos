import { TestBed } from '@angular/core/testing';

import { BaseSQLService } from './base-sql.service';

describe('BaseSQLService', () => {
  let service: BaseSQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseSQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
