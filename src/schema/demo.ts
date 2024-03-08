export const DemoSchema = {
  id: 'd94bc0d46131c',
  documentType: 'process',
  documentVersion: '1.0.0',
  props: {
    variables: '{}',
  },
  nodes: [
    {
      type: 'Start',
      props: {
        position: {
          x: 450,
          y: 150,
        },
      },
      id: 'node-start',
    },
    {
      type: 'End',
      props: {
        position: {
          x: 450,
          y: 550,
        },
      },
      id: 'node-end',
    },
    {
      type: 'Task',
      props: {
        name: 'Task2',
        description: 'Task2',
        position: {
          x: 352,
          y: 410,
        },
      },
      id: 'node_lqyw35yl',
    },
    {
      type: 'Edge',
      props: {
        source: 'node_lqyw35yl',
        target: 'node-end',
      },
      id: 'node_lqyw35yo',
    },
    {
      type: 'Task',
      props: {
        name: 'Task1',
        description: 'Task1',
        position: {
          x: 352,
          y: 266,
        },
      },
      id: 'node_lr0konzp',
    },
    {
      type: 'Edge',
      props: {
        source: 'node-start',
        target: 'node_lr0konzp',
      },
      id: 'node_lr0konzs',
    },
    {
      type: 'Edge',
      props: {
        source: 'node_lr0konzp',
        target: 'node_lqyw35yl',
      },
      id: 'node_lr0konzt',
    },
  ],
};
