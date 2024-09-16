import Image from 'next/image';
import React from 'react';

const slider = [
  {
    id: 1,
    url: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
    item: 'item1',
  },
  {
    id: 2,
    url: 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
    item: 'item2',
  },
  {
    id: 3,
    url: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
    item: 'item3',
  },
  {
    id: 4,
    url: 'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp',
    item: 'item4',
  },
];

const SliderComponent = () => {
  return (
    <div className="carousel w-full mt-4">
      {slider.map((data) => (
        <div id={data.item} className="carousel-item w-full" key={data.id}>
          <Image
            src={data.url}
            width={1920}
            height={700}
            alt={`Slide ${data.id}`}
            className="w-full"
          />
        </div>
      ))}
      <div className="flex justify-center gap-2 py-2">
        {slider.map((data) => (
          <a key={data.id} href={`#${data.item}`} className="btn btn-xs">
            {data.id}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
