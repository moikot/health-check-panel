'use strict';

System.register(['app/plugins/sdk', 'lodash', './css/health-check-panel.css!'], function (_export, _context) {
  "use strict";

  var PanelCtrl, _, _createClass, panelDefaults, HealthCheckCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssHealthCheckPanelCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
        checkInterval: 2000,
        healthy: {
          text: 'Healthy',
          bgColor: '#2F8A00',
          fontSize: '60px'
        },
        unhealthy: {
          text: 'Unhealthy',
          bgColor: '#800000',
          fontSize: '60px'
        }
      };

      HealthCheckCtrl = function (_PanelCtrl) {
        _inherits(HealthCheckCtrl, _PanelCtrl);

        function HealthCheckCtrl($scope, $injector) {
          _classCallCheck(this, HealthCheckCtrl);

          var _this = _possibleConstructorReturn(this, (HealthCheckCtrl.__proto__ || Object.getPrototypeOf(HealthCheckCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-teardown', _this.onPanelTeardown.bind(_this));
          _this.events.on('panel-initialized', _this.render.bind(_this));

          _this.updateHealthCheck();
          return _this;
        }

        _createClass(HealthCheckCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/grafana-health-check-panel/editor.html', 2);
          }
        }, {
          key: 'onPanelTeardown',
          value: function onPanelTeardown() {
            this.$timeout.cancel(this.nextTickPromise);
          }
        }, {
          key: 'updateHealthCheck',
          value: function updateHealthCheck() {
            this.doHealthCheck();
            this.nextTickPromise = this.$timeout(this.updateHealthCheck.bind(this), this.panel.checkInterval);
          }
        }, {
          key: 'doHealthCheck',
          value: function doHealthCheck() {
            var that = this;

            var request = new XMLHttpRequest();
            request.open('HEAD', '/', true);

            request.onload = function onload() {
              if (request.status === 200) {
                that.panel.state = that.panel.healthy;
                that.render();
              } else {
                that.panel.state = that.panel.unhealthy;
                that.render();
              }
            };

            request.onerror = function onerror() {
              that.panel.state = that.panel.unhealthy;
              that.render();
            };

            request.send();
          }
        }, {
          key: 'link',
          value: function link(scope, elem) {
            var _this2 = this;

            this.events.on('render', function () {
              var $panelContainer = elem.find('.panel-container');
              $panelContainer.css('background-color', _this2.panel.state.bgColor);
            });
          }
        }]);

        return HealthCheckCtrl;
      }(PanelCtrl);

      HealthCheckCtrl.templateUrl = 'module.html';

      _export('default', HealthCheckCtrl);
    }
  };
});
//# sourceMappingURL=health_check_ctrl.js.map
