const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        postcssNested,
        postcssCustomProperties,
        postcssFlexbugsFixes,
        postcssPresetEnv({
          stage: 1,
          features: {
            'nesting-rules': false
          }
        }),
      ],
    },
  },
};
