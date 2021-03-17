import Vue from 'vue';
const ebDetailActions = Vue.prototype.$meta.module.get('a-base').options.mixins.ebDetailActions;
export default {
  meta: {
    global: false,
  },
  mixins: [ ebDetailActions ],
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
      contextmenuRecord: null,
    };
  },
  computed: {
    columns() {
      const columns = this.blockConfig.columns;
      const _columns = [];
      for (const column of columns) {
        if (column.visible === false) continue;
        // extend
        const _column = this.$meta.util.extend({}, column);
        // key
        _column.key = _column.key || _column.dataIndex;
        // title
        _column.title = this.$text(_column.title);
        // ellipsis
        _column.ellipsis = true;
        // customRender
        _column.customRender = this._customRender;
        // push
        _columns.push(_column);
      }
      return _columns;
    },
  },
  mounted() {
    this.$meta.eventHub.$on('detail:action', this.onActionChanged);
  },
  beforeDestroy() {
    this.$meta.eventHub.$off('detail:action', this.onActionChanged);
  },
  methods: {
    getItemActions() {
      const actions = this.layoutManager.action.actions;
      if (!actions) return actions;
      // just remove save
      return actions.filter(item => [ 'save' ].indexOf(item.name) === -1);
    },
    async onItemClick(event, item) {
      return await this.onAction(event, item, {
        module: item.module,
        detailClassName: item.detailClassName,
        name: 'read',
      });
    },
    onSwipeoutOpened(event, item) {
    },
    async onAction(event, item, action) {
      const _action = this.getDetailAction(action);
      if (!_action) return;
      const res = await this.$meta.util.performAction({ ctx: this, action: _action, item });
      this.$meta.util.swipeoutClose(event.target);
      return res;
    },
    onActionChanged(data) {
      const { atomKey, detailClass } = data;
      if (
        atomKey.atomId !== this.layoutManager.container.atomId ||
        detailClass.module !== this.layoutManager.container.detailClass.module ||
        detailClass.detailClassName !== this.layoutManager.container.detailClass.detailClassName
      ) return;

      const key = data.key;
      const action = data.action;
      // create
      if (action.name === 'create') {
        // load
        this.layout.loadDetails();
        return;
      }
      // delete
      const { items, index } = this.layout._findItem(key.detailId);
      if (action.name === 'delete') {
        if (index !== -1) {
          items.splice(index, 1);
          this.layout.info.total -= 1;
        }
        return;
      }
      // others
      if (index !== -1) {
        const options = this.layoutManager.base_prepareReadOptions();
        this.$api.post('/a/detail/detail/read', {
          key,
          options,
        }).then(data => {
          Vue.set(items, index, data);
        });
      }
    },
    _getItemMetaSummary(item) {
      return (item._meta && item._meta.summary) || '';
      // return (item._meta && item._meta.summary) || item.detailCode;
    },
    _getItemMetaFlags(item) {
      let flags = (item._meta && item._meta.flags) || [];
      if (!Array.isArray(flags)) flags = flags.split(',');
      return flags;
    },
    _getActionColor(action, index) {
      if (index === 0) return 'orange';
      else if (index === 1) return 'red';
      return 'blue';
    },
    _getActionTitle(action) {
      return this.getDetailActionTitle(action);
    },
    _customRender(text, record, index, column) {
      if (!column.component) {
        if (text === null || text === undefined) {
          text = '';
        } else if (typeof text === 'object' && text instanceof Date) {
          text = this.$meta.util.formatDateTime(text, column.dateFormat);
        }
        if (column.textLocale) {
          text = this.$text(text);
        }
        return <div class="eb-antdv-table-cell" title={text}>{text}</div>;
      }
      // component
      const options = {
        props: {
          layoutManager: this.layoutManager,
          layout: this.layout,
          layoutItems: this,
          info: { text, record, index, column },
        },
      };
      return <eb-component module={column.component.module} name={column.component.name} options={options}></eb-component>;
    },
    _customRow(record) {
      return {
        props: {
        },
        on: {
          contextmenu: event => {
            // popover
            const popover = this.$$(this.$el).find('.popover');
            if (popover.length === 0) return;

            event.stopPropagation();
            event.preventDefault();

            const target = event.target;
            // finished the event immediately
            this.$nextTick(() => {
              this.$f7.popover.open(popover, target);
              // record
              this.contextmenuRecord = record;
              this.onSwipeoutOpened(null, record);
            });
          },
        },
      };
    },
    _renderListItemContextMenu() {
      const item = this.contextmenuRecord;
      const itemActions = this.getItemActions();
      // domRight
      const domActions = [];
      if (itemActions) {
        for (let index in itemActions) {
          index = parseInt(index);
          const action = itemActions[index];
          const _action = this.getDetailAction(action);
          domActions.push(
            <div key={action.code} color={this._getActionColor(action, index)} propsOnPerform={event => this.onAction(event, item, action)}>
              <f7-icon slot="media" material={_action.icon.material}></f7-icon>
              {this.$device.desktop && <div slot="title">{this._getActionTitle(action)}</div>}
            </div>
          );
        }
      }
      const domRight = (
        <div slot="right" ready={!!itemActions}>
          {domActions}
        </div>
      );

      return (
        <eb-context-menu mode="menu">
          {domRight}
        </eb-context-menu>
      );
    },
    _renderTable() {
      return (
        <a-table
          bordered
          columns={this.columns}
          rowKey={item => item.detailId}
          dataSource={this.layout.dataSource}
          pagination={false}
          customRow={this._customRow}
        >
        </a-table>
      );
    },
  },
  render() {
    return (
      <div class="detai-list-layout-table-container" >
        {this._renderTable()}
        {this._renderListItemContextMenu()}
      </div>
    );
  },
};
