module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/+(*.)+(spec).+(ts)'
    ],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transform: {
        '^.+\\.(ts|js|html)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$'
            }
        ]
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.module.ts',
        '!src/**/*.array.ts',
        '!src/**/*.interface.ts',
        '!src/main.ts',
        '!src/environments/**'
    ]
};
