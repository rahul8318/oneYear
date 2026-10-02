export const photos = {
  aug23: '/IMG_20260823_232604_0168.jpg',
  aug28: '/IMG_20260828_120307_0536.jpg',
  sep13: '/IMG_20260913_003618_912.jpg',
  sep20: '/IMG_20260920_222404_359.jpg',
}

export const hero = {
  eyebrow: 'for my favourite human',
  title: ['365', 'days of us.'],
  body: 'Somehow, one year became a collection of memories I never want to forget.',
  image: photos.aug28,
}

export const counters = [
  { value: 1, suffix: '', label: 'Year' },
  { value: 12, suffix: '', label: 'Months' },
  { value: 52, suffix: '', label: 'Weeks' },
  { value: 365, suffix: '', label: 'Days' },
  { value: 8760, suffix: '', label: 'Hours' },
  { value: 525600, suffix: '', label: 'Minutes' },
]

export const memories = [
  {
    src: photos.aug23,
    alt: 'A frame from one of our days together',
    caption: 'still makes me smile.',
    span: 'md:col-span-7 md:mt-0',
    ratio: 'aspect-[4/3]',
    reveal: { hidden: { opacity: 0, y: 48, rotate: -1.2 }, show: { opacity: 1, y: 0, rotate: 0 } },
  },
  {
    src: photos.sep13,
    alt: 'A moment I kept',
    caption: 'one of my favourites.',
    span: 'md:col-span-5 md:mt-24',
    ratio: 'aspect-square',
    reveal: { hidden: { opacity: 0, y: 60, rotate: 1.4 }, show: { opacity: 1, y: 0, rotate: 0 } },
  },
  {
    src: photos.sep20,
    alt: 'Another small moment',
    caption: 'this moment.',
    span: 'md:col-span-4 md:mt-16',
    ratio: 'aspect-[3/4]',
    reveal: { hidden: { opacity: 0, y: 40, rotate: 1.8 }, show: { opacity: 1, y: 0, rotate: 0 } },
  },
  {
    src: photos.aug28,
    alt: 'A favourite frame',
    caption: 'this one is basically us.',
    span: 'md:col-span-6 md:mt-2',
    ratio: 'aspect-[4/5]',
    reveal: { hidden: { opacity: 0, y: 52, rotate: -1 }, show: { opacity: 1, y: 0, rotate: 0 } },
  },
]

export const chapters = [
  {
    id: '01',
    title: 'The Beginning',
    body: 'Somewhere along the way, you became one of the most important people in my life.',
    image: null,
  },
  {
    id: '02',
    title: 'The Chaos',
    body: 'Too many conversations. Too many inside jokes. Absolutely no normal behaviour.',
    image: null,
  },
  {
    id: '03',
    title: 'The Memories',
    body: 'Some days became stories. Some stories became memories.',
    image: photos.aug23,
    alt: 'A frame from our memory chapter',
  },
  {
    id: '04',
    title: 'Today',
    body: 'And here we are... one whole year later.',
    image: photos.sep13,
    alt: 'Where we are today',
  },
]

export const loveCards = [
  { title: 'The random conversations', body: 'The ones with no point and somehow the best ones.' },
  { title: 'Inside jokes nobody else understands', body: 'If you have to ask, we probably can’t explain it.' },
  { title: 'The comfortable silence', body: 'No topic needed. Nothing to prove. Just us.' },
  { title: 'The stupid arguments', body: 'About nothing, lasting too long, ending in laughter.' },
  { title: 'The uncontrollable laughter', body: 'The kind that hurts a little and I’d keep forever.' },
  { title: 'The “I’m here” moments', body: 'Said once, quietly, and meaning everything.' },
  { title: 'The memories we didn’t plan', body: 'The best ones were never on the schedule.' },
  { title: 'Being completely ourselves', body: 'No filter, no performance. Just the real thing.' },
]

export const wallCards = [
  {
    kind: 'photo',
    src: photos.sep13,
    alt: 'A favourite square from the year',
    caption: 'one of my favourites.',
    ratio: 'aspect-square',
    className:
      'lg:left-[2%] lg:top-[2%] lg:rotate-[-6deg] lg:w-[46%] lg:max-w-[280px]',
  },
  {
    kind: 'note',
    text: 'this is the face of someone who has my whole heart.',
    className:
      'lg:left-[58%] lg:top-[10%] lg:rotate-[4deg] lg:w-[32%] lg:max-w-[215px]',
  },
  {
    kind: 'photo',
    src: photos.aug23,
    alt: 'A wide frame from the year',
    caption: 'the day this all felt real.',
    ratio: 'aspect-[3/2]',
    className:
      'lg:left-[10%] lg:top-[34%] lg:rotate-[3deg] lg:w-[62%] lg:max-w-[400px]',
  },
  {
    kind: 'note',
    text: '365 days. zero regrets. would do it all again.',
    className:
      'lg:left-[76%] lg:top-[44%] lg:rotate-[6deg] lg:w-[26%] lg:max-w-[200px]',
  },
  {
    kind: 'photo',
    src: photos.aug28,
    alt: 'A tall frame from the year',
    caption: 'still makes me smile.',
    ratio: 'aspect-[4/5]',
    className:
      'lg:left-[2%] lg:top-[58%] lg:rotate-[-4deg] lg:w-[40%] lg:max-w-[240px]',
  },
  {
    kind: 'note',
    text: 'you are the plan. everything else is just extra.',
    className:
      'lg:left-[28%] lg:top-[68%] lg:rotate-[3deg] lg:w-[32%] lg:max-w-[210px]',
  },
  {
    kind: 'photo',
    src: photos.sep20,
    alt: 'Another frame from the year',
    caption: 'and a million more to come.',
    ratio: 'aspect-[4/5]',
    className:
      'lg:left-[64%] lg:top-[70%] lg:rotate-[5deg] lg:w-[38%] lg:max-w-[230px]',
  },
]

export const letter = {
  eyebrow: 'one serious moment',
  lines: [
    { text: 'One year might not sound like a lifetime.', style: 'lead' },
    {
      text: 'But somehow, in this year, you have become such a huge part of my life.',
    },
    { text: 'Thank you for every laugh,', style: 'gap' },
    { text: 'every random conversation,' },
    { text: 'every stupid moment,' },
    { text: 'every memory,' },
    { text: 'and every time you were simply there.' },
    { text: 'I don’t know what the next year looks like.', style: 'gap' },
    { text: 'But I’m really glad this year had you in it.', style: 'accent' },
    { text: 'Happy one year, besty.', style: 'signature' },
  ],
}

export const soundtrack = [
  { title: 'Agar Tum Saath Ho', artist: 'Alka Yagnik & Arijit Singh', src: '/songs/agar-tum-saath-ho.mp3' },
  { title: 'Tu Jaane Na', artist: 'Atif Aslam', src: '/songs/tu-jaane-na.mp3' },
]
