import { SetupsModule } from './setups.module';

describe('SetupsModule', () => {
  let setupsModule: SetupsModule;

  beforeEach(() => {
    setupsModule = new SetupsModule();
  });

  it('should create an instance', () => {
    expect(setupsModule).toBeTruthy();
  });
});
