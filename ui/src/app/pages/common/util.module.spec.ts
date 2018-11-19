import { UtilModule } from './util.module';

describe('CommonModule', () => {
  let commonModule:UtilModule;

  beforeEach(() => {
    commonModule = new UtilModule();
  });

  it('should create an instance', () => {
    expect(commonModule).toBeTruthy();
  });
});
