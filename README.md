## Health Check Panel Plugin for Grafana
[![Build Status](https://travis-ci.org/anisimovsergey/health-check-panel.svg?branch=master)](https://travis-ci.org/anisimovsergey/health-check-panel)

The Health Check

## Build

In order to build the plugin, you need to have [Node.js/npm](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads) installed.

Clone a copy of the main git repo by running:

```bash
git clone git://github.com/anisimovsergey/health-check-panel.git
```

Install the dependencies:
```bash
npm install
```

Run eslint:
```bash
npm run lint
```

Run the build script:
```bash
npm run build
```

The built version of the plugin will be put in the `dist/` subdirectory.
