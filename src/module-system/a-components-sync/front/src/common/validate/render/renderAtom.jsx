export default {
  methods: {
    renderAtom(context) {
      let { property } = context;
      if (!property.ebRender) {
        property = {
          ...property,
          ebRender: {
            module: 'a-basefront',
            name: 'renderAtom',
          },
        };
        context = {
          ...context,
          property,
        };
      }
      return this.renderComponent(context);
    },
  },
};