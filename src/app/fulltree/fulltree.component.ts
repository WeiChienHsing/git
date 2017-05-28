import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';



@Component({
  selector: 'app-fulltree',
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `
    <tree-root
      #tree
      [nodes]="nodes"
      (treeDrop)="onDrop($event)"
      [options]="customTemplateStringOptions"
      [focused]="true"
      (event)="onEvent($event)"
      (initialized)="onInitialized(tree)"
      
    >
      <ng-template #treeNodeTemplate let-node>
        <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
        <span class="pull-right">{{ childrenCount(node) }}</span>
      </ng-template>
      <ng-template #loadingTemplate>Loading, please hold....</ng-template>
    </tree-root>
  `
})
export class FullTreeComponent{
  actionMapping = {
      mouse: {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
           TREE_ACTIONS.FOCUS(tree, node, $event);
           console.log(Math.abs(~2020));
      },
      drag: (tree, node, $event) => {
        console.log($event);
      },
      dblClick: (tree, node, $event) => {
        let nodeInfo;
        console.log(node);
        if (!node.hasChildren) {
         
          nodeInfo = new Array(1);
          nodeInfo[0] = node.data; 
        } else {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
          //console.log();
          nodeInfo = new Array(node.data.children.length)
          node.data.children.map(function(item, index) {
              nodeInfo[index] = item;
          });
  
        }
        
  
         this.listData = nodeInfo;
        console.log(nodeInfo);
      },
      click: (tree, node, $event) => {
        
         // console.log("click");
         
      }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

  nodes: any[];
  nodes2 = [{name: 'root'}, {name: 'root2'}];
  constructor() {
  }
  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {
          expanded: true,
          name: 'root expanded',
          subTitle: 'the root',
          children: [
            {
              name: 'child1',
              subTitle: 'a good child',
              hasChildren: false
            }, {
              name: 'child2',
              subTitle: 'a bad child',
              hasChildren: false
            }
          ]
        },
        {
          name: 'root2',
          subTitle: 'the second root',
          children: [
            {
              name: 'child2.1',
              subTitle: 'new and improved',
              uuid: '11',
              hasChildren: false
            }, {
              name: 'child2.2',
              subTitle: 'new and improved2',
              children: [
                {
                  uuid: 1001,
                  name: 'subsub',
                  subTitle: 'subsub',
                  hasChildren: false
                }
              ]
            }
          ]
        },
        {
          name: 'asyncroot',
          hasChildren: true
        }
      ];

      for(let i = 0; i < 4; i++) {
        this.nodes.push({
          name: `rootDynamic${i}`,
          subTitle: `root created dynamically ${i}`,
          children: new Array((i + 1) * 100).fill(null).map((item, n) => ({
            name: `childDynamic${i}.${n}`,
            subTitle: `child created dynamically ${i}`,
            hasChildren: false
          }))
        });
      }
    }, 1);
  }

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  addNode(tree) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping : this.actionMapping,
    nodeHeight: 15,
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      // console.log('allowDrop?');
      return true;
    },

    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }
  onEvent(event) {
    //console.log(this.nodes2);
  }


  onDrop($event) {
    // Dropped $event.element
  
    console.log($event);
    console.log($event.event.shiftKey);
  }

  onInitialized(tree) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }

  listData;

  show(){
    return this.listData;
  }
}
