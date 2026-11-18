import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@/global.css', () => ({}));
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
