module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest', //typescript转换
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
