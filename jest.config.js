module.exports = {
  globals: {
    // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },

  testEnvironment: 'jsdom',
  
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': [
      'babel-jest', {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: true,
              },
            },
          ]
        ],
        plugins: [
          '@vue/babel-plugin-jsx'
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'vue', 'json'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/input']
  roots: ['<rootDir>'],
}
