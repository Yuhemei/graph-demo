import { Drawer, message } from 'antd';



const DrawerGraphTool = (props: any) => {
    const content = props.content
    const contentKeys = Object.keys(content)
    const contentDrawer = contentKeys.map(k =>
        <li key={k}>{k}:{JSON.stringify(content[k])}</li>
    )
    return (
        <Drawer title={content.id} placement="right" onClose={props.onCloseDrawer} visible={props.visibleDrawer}>
            <ul>{contentDrawer}</ul>
        </Drawer>
    )
}
export default DrawerGraphTool
