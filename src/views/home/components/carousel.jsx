import '../scss/carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Image, Skeleton, App } from 'antd';
import { useState, useEffect } from 'react';
import { getBanner } from '@/apis/home.js';

const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();
  const [list, setList] = useState([]);
  
  const getBannerHandler = () => getBanner()
    .then(({ data: res }) => {
      if (res.code !== 200) return Promise.reject(res.message);
      setList(res.banners);
      setLoading(false);
    })
    .catch(err => message.error({ content: err.message }))

  useEffect(() => {getBannerHandler()}, []);

  return (
    <div className="carousel">
      {
        <Skeleton loading={loading} active paragraph={false} className='Skeleton-banner'>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="banner_wrap"
          >
            {list.map(item => <SwiperSlide key={item.imageUrl}><Image className='banner_img' preview={false} src={item.imageUrl} /></SwiperSlide>)}
          </Swiper>
        </Skeleton>

      }
    </div>
  )
}
export default Carousel