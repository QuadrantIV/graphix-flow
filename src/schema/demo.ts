export const DemoSchema = {
  id: 'd94bc0d46131c',
  documentType: 'bpms',
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
        source: {
          id: 'node_lqyw35yl',
          port: 'bottom',
        },
        target: {
          id: 'node-end',
          port: 'top',
        },
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
        source: {
          id: 'node-start',
          port: 'bottom',
        },
        target: {
          id: 'node_lr0konzp',
          port: 'top',
        },
      },
      id: 'node_lr0konzs',
    },
    {
      type: 'Edge',
      props: {
        source: {
          id: 'node_lr0konzp',
          port: 'bottom',
        },
        target: {
          id: 'node_lqyw35yl',
          port: 'top',
        },
      },
      id: 'node_lr0konzt',
    },
  ],
};
