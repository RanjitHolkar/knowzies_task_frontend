import { TestBed } from '@angular/core/testing';

import { EmpTaskService } from './emp-task.service';

describe('EmpTaskService', () => {
  let service: EmpTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
