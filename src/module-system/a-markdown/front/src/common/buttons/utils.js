import { MenuItem } from 'prosemirror-menu';
import { toggleMark } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';

export function wrapListItem(nodeType, options) {
  return cmdItem(wrapInList(nodeType, options.attrs), options);
}

export function cmdItem(cmd, options) {
  const passedOptions = {
    label: options.title,
    run: cmd,
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  if ((!options.enable || options.enable === true) && !options.select) {
    passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
  }

  return new MenuItem(passedOptions);
}

export function markActive(state, type) {
  const { from, $from, to, empty } = state.selection;
  if (empty) return type.isInSet(state.storedMarks || $from.marks());
  return state.doc.rangeHasMark(from, to, type);
}

export function markItem(markType, options) {
  const passedOptions = {
    active(state) {
      return markActive(state, markType);
    },
    enable: true,
  };
  for (const prop in options) passedOptions[prop] = options[prop];
  return cmdItem(toggleMark(markType), passedOptions);
}

export function canInsert(state, nodeType) {
  const $from = state.selection.$from;
  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
  }
  return false;
}

export function buildMenuItem(ctx, element, key, buttonOptions) {
  if (!buttonOptions) return null;
  const options = {
    ...buttonOptions,
    title: ctx.$text(buttonOptions.title),
    key,
    ctx,
  };
  let menuItem;
  if (buttonOptions.onBuild) {
    // build
    menuItem = buttonOptions.onBuild(element, options);
  } else if (buttonOptions.popup) {
    // popup
    menuItem = buildPopupButton(ctx, element, options);
  }
  return menuItem;
}

export function buildPopupButton(ctx, element, options) {
  // children
  const menuItems = [];
  for (const buttonOptions of options.children) {
    const menuItem = buildMenuItem(ctx, element, buttonOptions.key, buttonOptions);
    if (menuItem) {
      menuItems.push(menuItem);
    }
  }
  const menuItem = new MenuItem({
    ...options,
    menuItems,
    run(state, dispatch, view, event) {
      options.onPopup(state, dispatch, view, event, menuItem);
    },
  });
  return menuItem;
}

export async function onPopupPerform(state, dispatch, view, event, menuItemParent) {
  try {
    const { ctx, menuItems } = menuItemParent.spec;
    const buttons = [];
    for (const menuItem of menuItems) {
      buttons.push({
        text: menuItem.spec.title,
        disabled: !menuItem.enabled,
        data: menuItem,
      });
    }
    // choose
    const params = {
      forceToPopover: true,
      targetEl: event.target,
      buttons,
    };
    const button = await ctx.$view.actions.choose(params);
    const menuItem = button.data;
    menuItem.spec.run(state, dispatch, view);
  } catch (err) {}
}

export function insertNode(nodeType, options) {
  return new MenuItem({
    ...options,
    enable(state) {
      return canInsert(state, nodeType);
    },
    run(state, dispatch) {
      dispatch(state.tr.replaceSelectionWith(nodeType.create()));
    },
  });
}

export function extendMenuItem(menuItem, options) {
  return new MenuItem({
    ...menuItem.spec,
    ...options,
  });
}