import Vue from 'vue';
import Base from './base.jsx';
import Page from './page.jsx';
import Layout from './layout.jsx';
import Bulk from './bulk.jsx';
import Search from './search.jsx';
import Select from './select.jsx';
import Order from './order.jsx';
import Filter from './filter.jsx';
import Subnavbar from './subnavbar.jsx';
import Bottombar from './bottombar.jsx';
import Actions from './actions.jsx';
import Data from './data.jsx';
const ebAtomClasses = Vue.prototype.$meta.module.get('a-base').options.mixins.ebAtomClasses;
const ebAtomActions = Vue.prototype.$meta.module.get('a-base').options.mixins.ebAtomActions;

// container: {
//   atomClass,
//   options,
//   params,
//   scene, // default/search/select/selecting
//   layout,
// },

export default {
  mixins: [
    ebAtomClasses, //
    ebAtomActions,
    Base,
    Page,
    Layout,
    Bulk,
    Search,
    Select,
    Order,
    Filter,
    Subnavbar,
    Bottombar,
    Actions,
    Data,
  ],
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.index_init();
    });
  },
  beforeDestroy() {
    this.$emit('layoutManager:destroy');
  },
  methods: {
    async index_init() {
      await this.base_init();
      await this.select_prepareSelectedAtoms();
      await this.layout_prepareConfig();
      await this.bulk_actionsInit();
      await this.filter_prepareData();
      await this.data_adapterInit();
      this.base.ready = true;
    },
  },
};