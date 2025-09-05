export default {
  start: jest.fn(),
  stop: jest.fn(),
  cancel: jest.fn(),
  destroy: jest.fn(),
  isRecognizing: jest.fn(() => Promise.resolve(false)),
  onSpeechStart: jest.fn(),
  onSpeechEnd: jest.fn(),
  onSpeechError: jest.fn(),
  onSpeechResults: jest.fn(),
};
