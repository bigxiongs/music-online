import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toplist, topRankList } from '@/apis/home.js';
import { formatSongs, formartDate, wrap } from '@/utils/index';
import { playListInfoStore } from '@/store/index';
import rankSty from '../scss/rank.module.scss';
import { Skeleton, Image, App } from 'antd';

const LIMIT = 6, LIST = 4;

export default memo(function Rank() {
    const { message } = App.useApp();
    const [topList, setTopList] = useState([]);  // 排行榜类别列表
    const [songList, setSongList] = useState({}); // 排行榜下的歌曲列表
    const [loading, setLoading] = useState(true);
    const addToList = playListInfoStore(state => state.addToList); //添加歌曲到当前播放列表

    const getToplist = async () => {
        let list, newList

        toplist()
            .then(({ data: res }) => res.code !== 200 ? Promise.reject(res.message) : res)
            .then(res => {
                const promises = [];
                list = res.list.splice(0, 4);
                newList = Object.assign({}, songList);
                list.forEach(item => { promises.push(topRankList({ id: item.id })) });

                return Promise.all(promises)
            })
            .then(lists => {
                lists.forEach(({ data: res }) => {
                    if (res.code !== 200) return Promise.reject(res.message);
                    const itemList = formatSongs(res.playlist.tracks.splice(0, LIMIT), res.privileges.splice(0, LIMIT));
                    newList[res.playlist.id] = itemList;
                });
                setTopList(list);
                setSongList(newList);
                setLoading(false);
            })
            .catch(err => message.error({ content: err.message }))
    };

    useEffect(wrap(getToplist), []);

    // 添加到播放歌单
    const addSongList = item => () => addToList([item]);

    return (
        <div className={rankSty.rank}>
            {
                loading ?
                    [...new Array(LIST)].map((item, index) =>
                        <div className={rankSty.rankItem} key={index}>
                            <div className={rankSty.itemHeader}>
                                <Skeleton.Button active={true} size={'small'} block={true} className='info_title' />
                                <Skeleton.Button active={true} size={'small'} />
                            </div>
                            <div className={rankSty.itemMain}>
                                {
                                    [...new Array(LIMIT)].map((itm, idx) =>
                                        <div className={rankSty.rankSong} key={idx}>
                                            <Skeleton.Image active={true} block={true} className='skeleton-img' />
                                            <div className={rankSty.songinfo}>
                                                <Skeleton.Button active={true} size={'small'} block={true} />
                                                <Skeleton.Button active={true} size={'small'} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ) :
                    topList.map(item =>
                        <div className={rankSty.rankItem} key={item.id}>
                            <div className={rankSty.itemHeader}>
                                <Link to={`/rank?id=${item.id}`}>{item.name}</Link>
                                <div className={rankSty.itemUpdate}>最近更新：{formartDate(item.updateTime, 'MM月dd日')}<span>（{item.updateFrequency}）</span></div>
                            </div>
                            <div className={rankSty.itemMain}>
                                {
                                    songList[item.id] && songList[item.id].map(itm =>
                                        <div className={rankSty.rankSong} key={itm.id}>
                                            <Link to={`/song?id=${itm.id}`} className={rankSty.songimg}>
                                                <Image preview={false} src={`${itm.album.picUrl}?param=120y120`} />
                                            </Link>
                                            <div className={rankSty.songinfo}>
                                                <Link to={`/song?id=${itm.id}`} className={rankSty.songTitle}>{itm.name}</Link>
                                                <div className={rankSty.songAuthor}>
                                                    {
                                                        itm.singer.map(author =>
                                                            <Link to={`/singer/detail?id=${author.id}`} className={rankSty.songName} key={author.name}>{author.name}</Link>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className={rankSty.operate}>
                                                <i className="iconfont icon-add" title="添加到列表" onClick={addSongList(itm)}></i>
                                                {/* onClick={addSongList(itm)} */}
                                                <i className="iconfont icon-fav" title="添加到收藏"></i>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
});
