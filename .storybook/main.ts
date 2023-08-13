import { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        fsCache: true,
        lazyCompilation: true
      }
    }
  },
  docs: {
    autodocs: 'tag'
  },
  async webpackFinal(config) {
    // console.log(config.module.rules)
    // @ts-ignore
    config.module.rules[2].use.push({
      loader: '@compiled/webpack-loader',
      options: {
        extract: false,
        addComponentName: true
      }
    })

    return config;
  }
};
export default config;