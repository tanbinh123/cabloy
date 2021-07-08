export default {
  atoms: {
    note: {
      render: {
        list: {
          layouts: {
            table: {
              blocks: {
                items: {
                  columns: [
                    {
                      dataIndex: 'atomName',
                      title: 'Atom Name',
                      align: 'left',
                      component: {
                        module: 'a-baselayout',
                        name: 'listLayoutTableCellAtomName',
                      },
                    },
                    {
                      dataIndex: 'description',
                      title: 'Description',
                      align: 'left',
                    },
                    {
                      dataIndex: 'userName',
                      title: 'Creator',
                      align: 'left',
                      component: {
                        module: 'a-baselayout',
                        name: 'listLayoutTableCellUserName',
                      },
                    },
                    {
                      dataIndex: 'atomCreatedAt',
                      title: 'Created Time',
                      align: 'left',
                    },
                    {
                      dataIndex: 'atomUpdatedAt',
                      title: 'Modification Time',
                      align: 'left',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};