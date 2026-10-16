export interface Film {
  slug: string;
  id: string;
  title: string;
  roles: string[];
  genre: string;
  duration: string;
  synopsis: string;
  synopsisCn: string;
  thumbnail: string;
  stills?: string[];
}

export const filmsData: Film[] = [
  {
    slug: "rose-and-i",
    id: "_Ow32YBBnf8",
    title: "Rose and I",
    roles: ["Director", "Scriptwriter", "Editor", "Sound Designer"],
    genre: "Motivational / Personal Growth",
    duration: "08:32",
    synopsis: "During the 1990s financial crisis, an unemployed man falls into despair. Everything changes when he unexpectedly receives a single rose, giving him new hope and strength to start over.",
    synopsisCn: "讲述一名因90年代金融风暴影响而失业的男人，在跌入人生低谷时偶然收到一朵玫瑰，从而重拾希望的故事。",
    thumbnail: "https://img.youtube.com/vi/_Ow32YBBnf8/maxresdefault.jpg",
    stills: [
      "/portfolio/shortfilm/rose/still_01.png",
      "/portfolio/shortfilm/rose/still_02.png",
      "/portfolio/shortfilm/rose/still_03.png",
      "/portfolio/shortfilm/rose/still_04.png",
      "/portfolio/shortfilm/rose/still_06.png",
      "/portfolio/shortfilm/rose/still_07.png",
      "/portfolio/shortfilm/rose/still_08.png",
      "/portfolio/shortfilm/rose/still_09.png",
      "/portfolio/shortfilm/rose/still_10.png",
      "/portfolio/shortfilm/rose/still_11.png",
      "/portfolio/shortfilm/rose/still_12.png",
      "/portfolio/shortfilm/rose/still_13.png",
      "/portfolio/shortfilm/rose/still_14.png",
      "/portfolio/shortfilm/rose/still_15.png",
      "/portfolio/shortfilm/rose/still_16.png",
      "/portfolio/shortfilm/rose/still_17.png",
      "/portfolio/shortfilm/rose/still_18.png"
    ]
  },
  {
    slug: "eternity",
    id: "iDldMDeYM0E",
    title: "I Will Love You Eternity",
    roles: ["Director", "Scriptwriter", "Colorist", "VFX & Compositing"],
    genre: "Romance",
    duration: "09:07",
    synopsis: "A girl wakes up and meets a mysterious boy, slowly falling in love with him. One day, she follows him and uncovers the shocking truth behind everything.",
    synopsisCn: "讲述一名女生在醒来后遇见一名神秘少年并逐渐爱上了他。直到某一天，她跟随少年发现了所有的真相。",
    thumbnail: "https://img.youtube.com/vi/iDldMDeYM0E/maxresdefault.jpg",
    stills: [
      "/portfolio/shortfilm/eternity/still_01.png",
      "/portfolio/shortfilm/eternity/still_02.png",
      "/portfolio/shortfilm/eternity/still_03.png",
      "/portfolio/shortfilm/eternity/still_04.png",
      "/portfolio/shortfilm/eternity/still_05.png",
      "/portfolio/shortfilm/eternity/still_06.png",
      "/portfolio/shortfilm/eternity/still_07.png",
      "/portfolio/shortfilm/eternity/still_08.png",
      "/portfolio/shortfilm/eternity/still_09.png",
      "/portfolio/shortfilm/eternity/still_10.png",
      "/portfolio/shortfilm/eternity/still_11.png",
      "/portfolio/shortfilm/eternity/still_12.png",
      "/portfolio/shortfilm/eternity/still_13.png",
      "/portfolio/shortfilm/eternity/still_14.png",
      "/portfolio/shortfilm/eternity/still_15.png",
      "/portfolio/shortfilm/eternity/still_16.png",
      "/portfolio/shortfilm/eternity/still_17.png",
      "/portfolio/shortfilm/eternity/still_18.png",
      "/portfolio/shortfilm/eternity/still_19.png",
      "/portfolio/shortfilm/eternity/still_20.png",
      "/portfolio/shortfilm/eternity/still_21.png",
      "/portfolio/shortfilm/eternity/still_22.png",
      "/portfolio/shortfilm/eternity/still_23.png",
      "/portfolio/shortfilm/eternity/still_24.png"
    ]
  },
  {
    slug: "wen-mi",
    id: "iiBlWMHM4mE",
    title: "问米 Wen Mi",
    roles: ["Scriptwriter", "Colorist"],
    genre: "Suspense / Thriller",
    duration: "17:10",
    synopsis: "After her mother passes away, strange supernatural events start happening in Yi'an's house. Deeply missing her mother, she visits a spiritual medium who can speak with the dead to find her.",
    synopsisCn: "女孩忆安在妈妈去世后，家中不断发生灵异事件。极度思念妈妈的她，去找了能与死者沟通的问米婆，希望能找回妈妈。",
    thumbnail: "https://img.youtube.com/vi/iiBlWMHM4mE/maxresdefault.jpg",
    stills: [
      "/portfolio/shortfilm/wenmi/still_01.png",
      "/portfolio/shortfilm/wenmi/still_02.png",
      "/portfolio/shortfilm/wenmi/still_03.png",
      "/portfolio/shortfilm/wenmi/still_04.png",
      "/portfolio/shortfilm/wenmi/still_05.png",
      "/portfolio/shortfilm/wenmi/still_06.png",
      "/portfolio/shortfilm/wenmi/still_07.png",
      "/portfolio/shortfilm/wenmi/still_08.png",
      "/portfolio/shortfilm/wenmi/still_09.png",
      "/portfolio/shortfilm/wenmi/still_10.png",
      "/portfolio/shortfilm/wenmi/still_11.png",
      "/portfolio/shortfilm/wenmi/still_12.png",
      "/portfolio/shortfilm/wenmi/still_13.png",
      "/portfolio/shortfilm/wenmi/still_14.png",
      "/portfolio/shortfilm/wenmi/still_15.png",
      "/portfolio/shortfilm/wenmi/still_16.png",
      "/portfolio/shortfilm/wenmi/still_17.png",
      "/portfolio/shortfilm/wenmi/still_18.png",
      "/portfolio/shortfilm/wenmi/still_19.png",
      "/portfolio/shortfilm/wenmi/still_20.png",
      "/portfolio/shortfilm/wenmi/still_21.png",
      "/portfolio/shortfilm/wenmi/still_22.png"
    ]
  }
];
