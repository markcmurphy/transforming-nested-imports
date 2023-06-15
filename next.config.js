// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        '@swc/plugin-transform-imports',
        {
          "@components": {
            "transform": "@components/{{member}}",
          },
        },
      ],
    ],
  }
}

module.exports = nextConfig
