import {PanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/health-check-panel.css!';

const panelDefaults = {
  checkInterval: 2000,
  healthy: {
    text: 'Healthy',
    bgColor: '#2F8A00',
    fontSize: '60px',
  },
  unhealthy: {
    text: 'Unhealthy',
    bgColor: '#800000',
    fontSize: '60px',
  }
};

export class HealthCheckCtrl extends PanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));

    this.updateHealthCheck();
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-health-check-panel/editor.html', 2);
  }

  onPanelTeardown() {
    this.$timeout.cancel(this.nextTickPromise);
  }

  updateHealthCheck() {
    this.doHealthCheck();
    this.nextTickPromise = this.$timeout(this.updateHealthCheck.bind(this), this.panel.checkInterval);
  }

  doHealthCheck() {
    var that = this

    var request = new XMLHttpRequest();
    request.open('HEAD', '/', true);

    request.onload = function() {
      if (request.status === 200) {
        that.panel.state = that.panel.healthy;
        that.render();
      } else {
        that.panel.state = that.panel.unhealthy;
        that.render();
      }
    };

    request.onerror = function() {
      that.panel.state = that.panel.unhealthy;
      that.render();
    };

    request.send();
  }

  link(scope, elem) {
    this.events.on('render', () => {
      const $panelContainer = elem.find('.panel-container');
      $panelContainer.css('background-color', this.panel.state.bgColor);
    });
  }
}

HealthCheckCtrl.templateUrl = 'module.html';
