import ContextMenu from '@imengyu/vue3-context-menu'

const onContextMenu = (e: MouseEvent) => {
    //prevent the browser's default menu
    e.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        items: [
            {
                label: "拖拽",
                svgIcon: "#icon-operation",
                onClick: () => {
                    window.canDrag = false
                }
            },
            {
                label: "编辑",
                svgIcon: "#icon-operation",
                onClick: () => {
                    alert("You click a menu item");
                }
            },
            {
                label: "删除",
                svgIcon: "#icon-delete",
                svgProps: {
                    fill: '#f60',
                },
                onClick: () => {
                    alert("You click a menu item");
                }
            },
        ]
    });
}
export {
    onContextMenu
}