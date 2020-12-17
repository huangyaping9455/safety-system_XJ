import Vue from 'vue';
// iview ui
import 'view-design/dist/styles/iview.css';
import {
  Message,
  Form,
  FormItem,
  Button,
  Input,
  Menu,
  Submenu,
  Slider,
  MenuItem,
  Icon,
  Select,
  Option,
  Modal,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Table,
  DatePicker,
  Page,
  Spin,
  Upload,
  Drawer,
  Checkbox,
  CheckboxGroup,
  OptionGroup,
  Poptip,
  InputNumber,
  Radio,
  RadioGroup,
  Split,
  Divider,
  Tree,
  Progress,
  Card,
  Badge
} from 'view-design';

Vue.component('i-split', Split);
Vue.component('i-divider', Divider);
Vue.component('i-poptip', Poptip);
Vue.component('i-slider', Slider);
Vue.component('i-radio', Radio);
Vue.component('i-radio-group', RadioGroup);
Vue.component('i-check-group', CheckboxGroup);
Vue.component('i-check', Checkbox);
Vue.component('i-number', InputNumber);
Vue.component('i-upload', Upload);
Vue.component('i-drawer', Drawer);
Vue.component('i-page', Page);
Vue.component('i-date', DatePicker);
Vue.component('i-form', Form);
Vue.component('i-formitem', FormItem);
Vue.component('icon', Icon);
Vue.component('i-button', Button);
Vue.component('i-input', Input);
Vue.component('i-menu', Menu);
Vue.component('i-submenu', Submenu);
Vue.component('i-menuitem', MenuItem);
Vue.component('i-select', Select);
Vue.component('i-option', Option);
Vue.component('i-option-group', OptionGroup);
Vue.component('i-modal', Modal);
Vue.component('i-dropdown', Dropdown);
Vue.component('i-dropdown-menu', DropdownMenu);
Vue.component('i-dropdown-item', DropdownItem);
Vue.component('i-tooltip', Tooltip);
Vue.component('i-table', Table);
Vue.component('i-spin', Spin);
Vue.component('i-tree', Tree);
Vue.component('i-progress', Progress);
Vue.component('i-card', Card);
Vue.component('i-badge', Badge);
Vue.prototype.$modal = Modal;
Vue.prototype.$message = Message;
Vue.prototype.$spin = Spin;
Vue.prototype.$dev = process.env.NODE_ENV == 'development';
// scroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#3080fb',
      opacity: 0.6
    }
  },
  name: 'scroll'
});

// ECharts
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
Vue.component('e-chart', ECharts);

// import VueLazyload from 'vue-lazyload';
// Vue.use(VueLazyload);
