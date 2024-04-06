import { lazy } from 'react';
const Home = lazy(() => import('@/views/home'))
const Rank = lazy(() => import('@/views/rank'))
const PlayList = lazy(() => import('@/views/playList'))
const PlayListDetail = lazy(() => import('@/views/playList/detail'))
const Song = lazy(() => import('@/views/song'))

const routeList = [
  {
    path: "/",
    icon: 'home',
    name: "主页",
    index: true,
    element: <Home />
  },
  {
    path: "rank",
    icon: 'rank',
    name: "排行榜",
    isNav: true,
    element: <Rank />
  },
  {
    path: "playlist",
    icon: 'playlist',
    name: "歌单",
    isNav: true,
    element: <PlayList />
  },
  {
    path: "/playlist/detail",
    element: <PlayListDetail />
  },
  {
    path: "/song",
    element: <Song />
  },
]

export default routeList;