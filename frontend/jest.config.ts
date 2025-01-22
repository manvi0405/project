module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@bh-digitalsolutions/ui-toolkit-angular/dist$': '<rootDir>/path/to/mock/module',
      '^@bh-digitalsolutions/ui-toolkit-angular$': '<rootDir>/node_modules/@bh-digitalsolutions/ui-toolkit-angular'
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
  };