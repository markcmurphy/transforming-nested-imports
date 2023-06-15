// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const fs = require('fs');
const path = require('path');

const componentsDirectory = path.join(__dirname, '/components');

function createComponentMap(dir, map = {}, basePath = '') {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      map[item] = `${basePath}${item}`;
      createComponentMap(fullPath, map, `${basePath}${item}/`);
    } else {
      if (path.extname(item) === '.tsx') {
        const componentName = path.basename(item, '.tsx');
        map[componentName] = `${basePath}${componentName}`;
      }
    }
  });

  return map;
}

const componentMap = createComponentMap(componentsDirectory);

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
            [require('babel-plugin-transform-imports'), {
              "@components": {
                transform: function (importName, matches) {
                  // Check if the importName is in the map, and return the corresponding path if it is
                  if (componentMap.hasOwnProperty(importName)) {
                    return `@components/${componentMap[importName]}`;
                  }
                  // If the importName is not in the map, default to the original behavior
                  else {
                    return `@components/${importName}`;
                  }
                },
                "preventFullImport": true,
                "skipDefaultConversion": true
              }
            }]
          ]
        }
      }
    })
    return config
  }
}

module.exports = nextConfig
