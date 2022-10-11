// (c) Tecnologico de Monterrey 2022, rights reserved.

const poolImages = [
  "https://cdn.pixabay.com/photo/2015/11/05/23/02/chichen-itza-1025099_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/51/day-of-the-dead-1868836_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/01/29/19/42/city-3116989__340.jpg",
  "https://cdn.pixabay.com/photo/2015/07/20/16/22/mexico-853048__340.jpg",
  "https://cdn.pixabay.com/photo/2018/10/26/10/26/mexico-3774303__340.jpg",
  "https://cdn.pixabay.com/photo/2017/06/22/18/44/mexico-2432038__340.jpg",
  "https://cdn.pixabay.com/photo/2021/10/19/17/54/queretaro-6724217__340.jpg",
  "https://cdn.pixabay.com/photo/2021/08/24/17/18/buildings-6571219__340.jpg",
  "https://cdn.pixabay.com/photo/2022/05/06/03/09/queretaro-7177385__340.jpg",
  "https://cdn.pixabay.com/photo/2022/05/12/03/46/tequisquiapan-7190653__340.jpg",
];

export const getRandomImage = () => {
  return poolImages[Math.floor(Math.random() * poolImages.length)];
};
