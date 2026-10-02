import { Base64ImageUrlPipe } from '../../../public-api';

describe('Base64ImageUrlPipe', () => {
  let pipe: Base64ImageUrlPipe;

  beforeEach(() => {
    pipe = new Base64ImageUrlPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform base64 to a data URL', () => {
    const base64 = 'your-base64-data';
    const mimeType = 'image/png';

    const result = pipe.transform(base64, mimeType);

    expect(result).toBe(`data:${mimeType};base64,${base64}`);
  });
});
