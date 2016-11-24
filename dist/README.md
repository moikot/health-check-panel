## Health Check Panel Plugin for Grafana
[![Build Status](https://travis-ci.org/anisimovsergey/health-check-panel.svg?branch=master)](https://travis-ci.org/anisimovsergey/health-check-panel)

### Why?

[Grafana](https://grafana.net/) is very nice and cool and allows you to monitor your infrastructure displaying the state of various metrics. The problem is that when the backend of Grafana becomes unreachable due to either network problems or something else, it's quite difficult to notice that the page is disconnected and doesn't reflect the latest state of your system.

### How does it look?

It looks very simple, it's just a panel with a text on it. When the backend is reachable, the panel is green and healthy. When the backend is not reachable, the panel becomes read and brings your attention.

![showcase](https://raw.githubusercontent.com/anisimovsergey/health-check-panel/master/src/img/screenshot-showcase.png)

### How does it work?

It works very simply, the plugin implements a simple health monitoring of the [Grafana](https://grafana.net/) backend by making regular HEAD requests to its root. The user can change the interval of the requests as well as the background color and text of the `healthy` and `unhealthy` states.

![options](https://raw.githubusercontent.com/anisimovsergey/health-check-panel/master/src/img/screenshot-health-check-options.png)

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
