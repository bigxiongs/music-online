import { useEffect, useState, memo, useCallback } from 'react';
import { hotPlayList, playList } from '@/apis/home';
import { App } from 'antd';
import Card from './card';
import PlayList from '@/components/playlist/list';

const LIMIT = 6;

export default memo(function Recommend() {
    const { message } = App.useApp();
    const [tags, setTags] = useState([]);  // 热门标签列表
    const [lists, setLists] = useState([]);   // 热门歌单数据
    const [loading, setLoading] = useState(true);

    // 获取热门推荐歌单标签
    const getHotTags = () => hotPlayList()
        .then(({ data: res }) => {
            if (res.code !== 200) throw new Error(res.message)
            else setTags([].concat([{ name: '为您推荐' }], res.tags.splice(0, LIMIT)))
        })
        .catch(err => message.error({ content: err.message }))

    // 获取热门歌单列表
    const getPlayList = async (idx = 0) => {
        setLoading(true);
        const { data: res } = await playList({ limit: LIMIT, offset: 0, cat: tags.length && idx != 0 ? tags[idx]['name'] : '' })

        if (res.code !== 200) {
            return message.error({
                content: res.message
            });
        }

        setLists([].concat(res.playlists));
        setLoading(false);
    };

    // 热门标签切换
    const getIndex = useCallback(() => {getPlayList()}, [tags]); //记忆函数，只有tags发生变化了才会生成新的引用，一般用于像组件传递的函数

    useEffect(() => { getHotTags(); getPlayList(); }, []);

    return (
        <Card title="热门推荐" type="recomd" getIndex={getIndex} tags={tags}>
            <PlayList lists={lists} loading={loading} count={LIMIT} />
        </Card>
    )
})

