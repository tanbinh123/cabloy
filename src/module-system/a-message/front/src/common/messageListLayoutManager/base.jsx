export default {
  data() {
    return {
      base: {
        ready: false,
        configMessageBase: null,
        configMessage: null,
        config: null,
        layoutConfig: null,
      },
    };
  },
  computed: {
    base_user() {
      return this.$store.state.auth.user.op;
    },
    base_messageClass() {
      const messageClass = this.container.messageClass;
      return {
        module: messageClass.info.module,
        messageClassName: messageClass.info.name,
      };
    },
  },
  created() {},
  methods: {
    async base_init() {
      // layoutConfig
      this.base.layoutConfig = await this.$store.dispatch('a/base/getLayoutConfig', 'a-basefront');
    },
    base_getLayoutConfigKeyCurrent() {
      const messageClass = this.base_messageClass;
      const messageClassKey = messageClass ? `${messageClass.module}_${messageClass.messageClassName}` : null;
      return `message.${messageClassKey}.render.list.layout.current.${this.$view.size}`;
    },
    base_prepareSelectOptions() {
      // options
      let options = {
        where: {},
      };
      // layout
      options.layout = this.layout.current;
      // order
      options.orders = [['a.createdAt', 'desc']];
      // extend 1
      if (this.container.options) {
        options = this.$utils.extend({}, options, this.container.options);
      }
      // options
      return options;
    },
    base_prepareSelectParams() {
      // options
      const options = this.base_prepareSelectOptions();
      // params
      const params = {
        messageClass: this.base_messageClass,
        options,
      };
      return params;
    },
    base_getItems() {
      return this.layout.instance ? this.layout.instance.getItems() : [];
    },
  },
};
