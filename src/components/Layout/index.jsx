import { Layout, Menu} from 'antd'
import Login from '@/components/login'
import Routers from '@/router';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons'
import './index.scss'
import { useNavigate,useLocation } from 'react-router-dom'
import Playbar from '@/components/playbar'

const { Header, Sider } = Layout
const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '排行榜',
    key: '/rank',
    icon: <DiffOutlined />,
  },
  {
    label: '歌单',
    key: '/playlist',
    icon: <EditOutlined />,
  },
  // {
  //   label: 'MV',
  //   key: '/mv',
  //   icon: <EditOutlined />,
  // },
  // {
  //   label: '歌手',
  //   key: '/singer',
  //   icon: <EditOutlined />,
  // },
]

const LayoutMain = () => {
  const navToggle=useNavigate()
  // 反向高亮
  const location = useLocation()
  const seletKey=location.pathname
  return (
    <Layout className='layout'>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <Login/>         
        </div>
      </Header>
      <Layout>
        <Sider width={150} theme="light" className="sider">
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={seletKey}
            items={items}
            style={{borderRight: 0 }} onClick={(router)=>navToggle(router.key)}></Menu>
        </Sider>
        <Layout className="layout-content">
          <Routers/>
        </Layout>
      </Layout>
      <Playbar/> 
    </Layout>
  )
}
export default LayoutMain