export default {
  meta: {
    global: false,
  },
  props: {
    layoutManager: {
      type: Object,
    },
    layout: {
      type: Object,
    },
    blockConfig: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    _renderList() {
      const items = this.layoutManager.data_getItems();
      const children = [];
      for (const item of items) {
        const domListItem = this.layoutManager.layout_renderBlock({
          blockName: 'item',
          key: item.atomId,
          info: { item },
          listItem: true,
        });
        children.push(domListItem);
      }
      return <f7-list>{children}</f7-list>;
    },
  },
  render() {
    return <div>{this._renderList()}</div>;
  },
};
