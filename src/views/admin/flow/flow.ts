import jsPlumb from 'jsplumb';
import { Modal } from 'ant-design-vue';
import { onContextMenu } from './tool'
let globaljsPlumb = null
async function initFlowChart(initData, callback) {
  // 初始化一下全局的可拖拽
  window.canDrag = true;
  await nextTick(); // 确保DOM更新完成
  let data = toRaw(initData)


  // 动态维护一个节点列表，用于后续的拖拽操作，并将他返回
  let displayNodeList = [];


  const nodeList = [];
  let jsPlumbInstance = null;
  // 初始化节点列表

  Object.keys(data.list).forEach(key => {
    const node = data.list[key];
    nodeList.push(node);
  })

  // 初始化jsPlumb实例
  jsPlumbInstance = jsPlumb.jsPlumb.getInstance({
    // 网格线

    container: document.getElementById('flow-chart-container'),
    // 允许拖动
    DragOptions: { cursor: "pointer", zIndex: 2000 },
    // 设置成折线
    Connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
    PaintStyle: { stroke: "#1d39c4", strokeWidth: 2 }, // 设置线条颜色和宽度
    EndpointStyle: { radius: 5, fill: "#1d39c4" }, // 设置端点样式
    HoverPaintStyle: { stroke: "#f5222d", strokeWidth: 3 }, // 鼠标悬停时的线条样式
    ArrowType: "arrow", // 添加箭头，可选值有 "arrow", "diamond", 等
    ArrowSize: 10, // 箭头大小
    // 开启网格线
    Grid: [10, 10],

  });
  globaljsPlumb = jsPlumbInstance
  jsPlumbInstance.ready(function () {
    nodeList.forEach(node => {
      //设置可拖动
      jsPlumbInstance.draggable(`node-${node.id}`, {
        start: (event) => {
          // 拖动开始时的处理逻辑
          // console.log(`Dragging started for node ${node.id}`,event);
          // 可以在这里添加例如高亮显示被拖动节点的逻辑
          if (window.canDrag = true) {
            event.preventDefault();
            return true
          } else {
            event.preventDefault();
            return false
          }
        },
        drag: (event) => {
          // 拖动过程中的处理逻辑
          // ui.position 包含当前元素的位置信息，例如：{ left: x, top: y }
          // 这里可以实时更新节点位置或者预览效果
          // console.log(`Dragging node ${node.id}`, event);
          if (window.canDrag = true) {
            return true
          } else {
            return false
          }
        },
        stop: (event) => {
          // 拖动停止后的处理逻辑
          // 这里可以更新节点最终的位置到数据库，或者进行其他清理工作
          // console.log(`Dragging stopped for node ${node.id} at position:`, event.pos);
          displayNodeList = nodeList
          // //需要触发更新逻辑，更新位置信息
          let index = nodeList.findIndex(item => item.id === node.id);
          let node2 = nodeList[index]
          let newStyle = node2.style;
          // //replace
          newStyle = newStyle.replace(/left:(\d+)px;/, `left:${event.pos[0]}px;`);
          newStyle = newStyle.replace(/top:(\d+)px;/, `top:${event.pos[1]}px;`);
          displayNodeList[index]['style'] = newStyle;
          callback(displayNodeList)
        }
      })

      if (node.process_to) {
        // 将含有process_to属性的节点设为可连线的源节点
        jsPlumbInstance.makeSource(`node-${node.id}`, {
          anchor: "Continuous",
          connectorStyle: { stroke: "#1d39c4", strokeWidth: 3, outlineStroke: "transparent", outlineWidth: 3 },
          maxConnections: -1
        });
      }

      // 假设所有节点都可作为目标节点
      jsPlumbInstance.makeTarget(`node-${node.id}`, {
        anchor: "Continuous",
        allowLoopback: false
      });

      // 为每一个节点添加右键
      // 监听节点的右键事件
      let nodeEle = document.querySelector(`#node-${node.id}`)
      if (nodeEle) {
        nodeEle.addEventListener('contextmenu', (event) => {
          //阻止向上传递，因为父级也注册了contextmenu事件
          event.stopPropagation();

          event.preventDefault();
          onContextMenu(event)
        })
      }

    });

    jsPlumbInstance.bind('click', function (conn, originalEvent) {
      // if (window.prompt('确定删除所点击的链接吗？ 输入1确定') === '1') {
      //   jsPlumb.detach(conn)
      // }
      Modal.confirm({
        //居中
        centered: true,
        title: '提示',
        content: '确定删除所点击的链接吗？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          // jsPlumb.detach(conn)
        },
        onCancel() {
          console.log('Cancel');
        }
      })
    })

    // 根据process_to字段创建连接线
    nodeList.forEach(node => {
      if (node.process_to) {
        node.process_to.split(",").forEach(targetId => {
          jsPlumbInstance.connect({
            source: `node-${node.id}`,
            target: `node-${targetId}`,
            paintStyle: { stroke: "#422517", strokeWidth: 12 }, // 线条样式
            endpointStyle: { fill: "#422517", radius: 4 }, // 端点样式
            Connector: "Orthogonal",
            options: {
              stub: 25
            },
            anchors: [jsPlumb.DynamicAnchor, jsPlumb.DynamicAnchor], // 自动选择最佳连接点
            overlays: [
              ["Arrow", {
                location: 1, // 箭头位置，1为连接线末端
                length: 10, // 箭头长度
                foldback: 0.8, // 箭头的折叠程度
                width: 15, // 箭头宽度
                direction: 1, // 箭头方向，1为默认方向
                paintStyle: { fill: "#422517", stroke: "transparent" } // 箭头填充色和边框色
              }]
            ]
          });
        });
      }
    });

    // 允许拖动
    // 假设jsPlumb实例已经初始化为jsPlumbInstance
    // nodeList 是包含所有节点信息的数组


    // 可选：添加连接后处理程序
    jsPlumbInstance.bind("connection", function (info) {
      console.log("连接已建立:", info);
    });
    return nodeList
  })
}


export default initFlowChart