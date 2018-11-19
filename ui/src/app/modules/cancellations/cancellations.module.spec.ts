import { CancellationsModule } from './cancellations.module';

describe('CancellationsModule', () => {
  let cancellationsModule: CancellationsModule;

  beforeEach(() => {
    cancellationsModule = new CancellationsModule();
  });

  it('should create an instance', () => {
    expect(cancellationsModule).toBeTruthy();
  });
});
