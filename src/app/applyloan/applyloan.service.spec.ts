import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApplyloanService } from './applyloan.service';

describe('ApplyloanService', () => {
  let service: ApplyloanService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [

      ],
      providers: [
        ApplyloanService
      ],

    })
      .compileComponents()

    service = TestBed.inject(ApplyloanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
