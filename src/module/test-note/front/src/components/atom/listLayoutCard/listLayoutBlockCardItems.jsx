import Vue from 'vue';
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
      radioName: Vue.prototype.$meta.util.nextId('radio'),
    };
  },
  methods: {
    onItemClick(event, item) {
      if (this.layoutManager.bulk.selecting) return;
      return this.layoutManager.data.adapter.item_onActionView(event, item);
    },
    onSwipeoutOpened(event, item) {
      this.layoutManager.actions_fetchActions(item);
    },
    onItemChange(event, item) {
      this.layoutManager.bulk_onItemChange(event, item);
    },
    _getItemChecked(item) {
      const index = this.layoutManager.bulk.selectedAtoms.findIndex(_item => _item.atomId === item.atomId);
      return index > -1;
    },
    _renderListItem(item) {
      // media
      const domMedia = this.layoutManager.bulk.selecting ? null : <div slot="media">{this.layoutManager.data.adapter.item_renderMedia(item)}</div>;
      // domHeader
      const domHeader = (
        <div slot="root-start" class="header">
          <div class="mediaLabel">
            <span>{this.layoutManager.data.adapter.item_getMetaMediaLabel(item)}</span>
          </div>
          <div class="date">
            {this.layoutManager.data.adapter.item_renderStats(item)}
            <span>{this.$meta.util.formatDateTimeRelative(item.atomUpdatedAt)}</span>
          </div>
        </div>
      );
      // domTitle
      const domTitle = (
        <div slot="title" class="title">
          <div>{this.layoutManager.data.adapter.item_getAtomName(item)}</div>
        </div>
      );
      // // domSummary
      // const domSummary = (
      //   <div slot="root-end" class="summary">
      //     {this.layoutManager.data.adapter.item_getMetaSummary(item)}
      //   </div>
      // );
      // domAfter
      const domAfterMetaFlags = this.layoutManager.data.adapter.item_renderMetaFlags(item);
      const domAfterLabels = this.layoutManager.data.adapter.item_renderLabels(item);
      const domAfter = (
        <div slot="after" class="after">
          {domAfterMetaFlags}
          {domAfterLabels}
        </div>
      );
      // ok
      return (
        <f7-card key={item.atomId}>
          <f7-card-header>
            <f7-list>
              <eb-list-item
                class="item"
                key={item.atomId}
                link={this.layoutManager.bulk.selecting ? false : '#'}
                name={this.radioName}
                checkbox={this.layoutManager.bulk.selecting}
                checked={this._getItemChecked(item)}
                propsOnPerform={event => this.onItemClick(event, item)}
                swipeout
                onSwipeoutOpened={event => {
                  this.onSwipeoutOpened(event, item);
                }}
                onContextmenuOpened={event => {
                  this.onSwipeoutOpened(event, item);
                }}
                onChange={event => this.onItemChange(event, item)}
              >
                {domMedia}
                {domHeader}
                {domTitle}
                {domAfter}
                {this._renderListItemContextMenu(item)}
              </eb-list-item>
            </f7-list>
          </f7-card-header>
          <f7-card-content>{item.content}</f7-card-content>
        </f7-card>
      );
    },
    _renderListItemContextMenu(item) {
      return this.layoutManager.data.adapter.item_renderContextMenu(item);
    },
    _renderList() {
      const items = this.layoutManager.data_getItems();
      const children = [];
      for (const item of items) {
        children.push(this._renderListItem(item));
      }
      return children;
    },
  },
  render() {
    return <div class="atom-list-layout-card-container">{this._renderList()}</div>;
  },
};
