import { TestBed } from '@angular/core/testing';

import { DropdownOverlayService } from './dropdown-overlay.service';

describe('DropdownOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownOverlayService = TestBed.get(DropdownOverlayService);
    expect(service).toBeTruthy();
  });
});
