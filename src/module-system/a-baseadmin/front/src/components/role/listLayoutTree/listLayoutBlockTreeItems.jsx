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
    return {
      root: {
        attrs: {
          itemToggle: false,
          selectable: true,
        },
      },
    };
  },
  computed: {
    maxLevelAutoOpened() {
      let maxLevelAutoOpened = this.layoutManager.container.maxLevelAutoOpened;
      if (maxLevelAutoOpened === undefined) maxLevelAutoOpened = 2;
      return maxLevelAutoOpened;
    },
    roleIdStart() {
      return this.layoutManager.container.roleIdStart || 0;
    },
  },
  mounted() {
    this.layoutManager.data.adapter._callMethod('setTreeInstance', this.$refs.tree);
  },
  beforeDestroy() {},
  methods: {
    async _loadNodeRoles(node) {
      const refTree = this.$refs.tree;
      //
      const levelCurrent = node.__level || 0;
      const level = levelCurrent + 1;
      //
      let data;
      const roleId = node.root ? this.roleIdStart : node.id;
      if (roleId === 0) {
        data = await this.$api.post('/a/baseadmin/role/childrenTop', { page: { size: 0 } });
      } else {
        data = await this.$api.post('/a/baseadmin/role/children', { roleId, page: { size: 0 } });
      }
      const list = [];
      for (const item of data.list) {
        const nodeChild = {
          id: item.id,
          attrs: {
            id: refTree._calcNodeAttrId(node, item),
            // label: item.atomNameLocale || item.roleName || `[${this.$text('New Role')}]`,
            toggle: item.catalog === 1,
            loadChildren: item.catalog === 1,
            iconF7: item._roleTypeCodeOptions.icon.f7,
          },
          data: item,
          __level: level,
        };
        if (item.catalog === 1 && (level <= this.maxLevelAutoOpened || this.maxLevelAutoOpened === -1)) {
          await refTree._preloadChildren(nodeChild);
        }
        list.push(nodeChild);
      }
      return list;
    },
    async onLoadChildren(node) {
      return await this._loadNodeRoles(node);
    },
    onNodePerformClick(event, context, node) {
      return this.layoutManager.data.adapter.item_onActionView(event, node.data);
    },
    async onNodePerformPopover(event, node) {
      const refTree = this.$refs.tree;
      refTree._openNodeContextMenu(node);
    },
    async onNodeContextmenuOpened(node) {
      const item = node.data;
      await this.layoutManager.actions_fetchActions(item);
    },
    _renderListItemContextMenu(item) {
      return this.layoutManager.data.adapter.item_renderContextMenu(item, 'menu');
    },
    _renderNodeLabelStart(node) {
      const item = node.data;
      return item.atomNameLocale || item.roleName;
    },
    _renderNodeLabelStar(node) {
      if (!node.data.star) return;
      return <f7-icon color="orange" size="16" f7="::star"></f7-icon>;
    },
    _renderNodeAfter(node) {
      const item = node.data;
      const domAfterMetaFlags = this.layoutManager.data.adapter.item_renderMetaFlags(item);
      const domAfterLabels = this.layoutManager.data.adapter.item_renderLabels(item);
      const domPopover = (
        <eb-link
          iconF7="::more-horiz"
          iconColor="gray"
          propsOnPerform={event => this.onNodePerformPopover(event, node)}
        ></eb-link>
      );
      const domContextMenu = this._renderListItemContextMenu(item);
      return (
        <div class="treeview-item-root-end">
          {domAfterMetaFlags}
          {domAfterLabels}
          {domPopover}
          {domContextMenu}
        </div>
      );
    },
    _renderTree() {
      if (!this.layoutManager.base.ready) return;
      return (
        <eb-treeview
          ref="tree"
          root={this.root}
          propsOnLoadChildren={this.onLoadChildren}
          propsOnNodePerform={this.onNodePerformClick}
          onNodeContextmenuOpened={this.onNodeContextmenuOpened}
          {...{
            scopedSlots: {
              'label-start': ({ node }) => {
                return this._renderNodeLabelStart(node);
              },
              label: ({ node }) => {
                return this._renderNodeLabelStar(node);
              },
              'root-end': ({ node }) => {
                return this._renderNodeAfter(node);
              },
            },
          }}
        ></eb-treeview>
      );
    },
  },
  render() {
    return (
      <div>
        {this._renderTree()}
        <f7-block></f7-block>
      </div>
    );
  },
};
