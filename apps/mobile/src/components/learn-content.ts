import type { ImageSourcePropType } from 'react-native';

export type UseSection = {
  label?: string;
  steps: string[];
};

export type Product = {
  id: string;
  name: string;
  image?: ImageSourcePropType;
  emoji?: string;
  colour: string;
  description: string;
  useSections: UseSection[];
};

// Carried over from tpp-app/src/pages/DYKFacts.json
export const facts = [
  'A period is a natural part of a person’s life when the body is preparing for pregnancy. If no pregnancy occurs, the lining of the uterus sheds. This is known as your period.',
  'Periods start during puberty, when your body starts to change as an adult and has the ability to reproduce.',
  'The first period occurs at around the age of 10–15 years old, but will vary with each individual.',
  'Periods come every 26–35 days and last 3–7 days. The time between your periods and the length of your period can vary with each individual. Periods take time to regulate.',
  'Common period symptoms include bloating, cravings, irritability, low energy, acne and cramps. You can manage these symptoms with sleep, hot compresses, movement and a healthy diet.',
  'Period symptoms can change each month depending on your lifestyle, mental-emotional changes, stressors and physical activity.',
  'Approximately 50–80ml of blood exits your body during a period, equaling to about 10–18 pads/tampons per cycle.',
  'There are 4 phases in your cycle: menstruation, follicular phase, ovulation phase and luteal phase.',
  'Canadians that menstruate spend an estimated $6,000 on menstrual products in their lifetime.',
  'One third of Canadian menstruators, under the age of 25 struggle to afford menstrual products or can’t access them at all.',
  'Another word for menstruation is “catamenia,” from the Greek word katamenia (kata = by + menia = month).',
  'The word “period” first appeared on TV in a Tampax advertisement in 1985, starring Courteney Cox.',
  'There is a board game that educates youth all about periods, called “The Period Game.”',
  'Nearly 1 in 4 young people don’t know why people get periods or how to manage them.',
  '1 in 3 young people don’t feel prepared for their first period.',
  'Approximately 11,000 disposable products are used in an average menstruator’s lifetime.',
  'The average menstruator spends nearly 10 years menstruating in their lifetime.',
  'A man named Dr. Earle Haas invented the first modern tampon in 1931, though variations of tampons were used thousands of years prior.',
  'Disney made a movie about periods in the 1940s called, “The Story Of Menstruation.”',
  'The documentary “Period. End of a Sentence” follows a group of Indian women fighting the stigma of menstruation and begin manufacturing pads. The documentary won an Academy Award in 2019.',
  'An estimated 20 billion pads, tampons and applicators are sent to North American landfills annually.',
  'Only 46% of Canadians feel comfortable talking about periods. Periods rank lower in comfortability to talk about than politics, sex, and Sexually Transmitted Infections (STIs).',
  'Your menstrual cycle and periods are controlled by hormones, like estrogen and progesterone.',
  '70% of menstruators have missed work, school or social activities because of their period.',
  'The menstrual period occurs 14 days after ovulation.',
  'Ovulation occurs halfway between your cycle when your hormones tell one of your ovaries to release a mature egg.',
  'Since plastic can take as long as 500 years for pads & tampons to decompose, that means every disposable menstrual product that’s ever been used is still sitting in a landfill.',
  '63% of young people believe the government should do more to provide free period products to those who need them.',
];

// Same order, colour, and content as cardData in tpp-app/src/info/Info.js and tpp-app/src/pages/*Info.js
export const products: Product[] = [
  {
    id: 'underwear',
    name: 'Period\nUnderwear',
    image: require('@/assets/images/learn/period-underwear.png'),
    emoji: '🩲',
    colour: '#FFA3A4',
    description:
      'Quick, your period is “OMW” - period underwear has you covered. Wow, the first period underwear product arrived on the market in the late 1980s!?\n\nPeriod underwear is designed to completely replace pads and tampons (or be used as a backup). With a leak-proof layer, it can absorb 1-2 tampons’ worth of fluid! Change it daily like normal underwear, but give it a quick rinse with cool water before washing it with your regular laundry.\n\nWhile period underwear can be costly, ranging from $30-$100 per pair depending on size, fit and duration of wear, it can cost you less in the long run as one pair generally lasts a few years.',
    useSections: [
      {
        steps: [
          'Put on underwear',
          'Wear up to 12 hours',
          'Hand wash OR machine wash',
          'Hang to dry',
        ],
      },
    ],
  },
  {
    id: 'cup',
    name: 'Menstrual\nCup',
    image: require('@/assets/images/learn/menstrual-cup.png'),
    emoji: '🍷',
    colour: '#FFA3A4',
    description:
      'Just popping in to let you know - the earliest versions of the menstrual cup were designed in 1932 and made of natural rubber. Today, menstrual cups are typically made of silicone, which is flexible, durable and anti-bacterial.\n\nMenstrual cups are cost effective and sustainable, with almost no waste created each cycle. A cup costs about $40 CAD and can last at least two years.\n\nA menstrual cup can be used for up to 12 hours, depending on your menstrual flow. It does take a few uses to learn how often you want to “empty” your cup, and this can vary for each cycle and for every person.',
    useSections: [
      {
        steps: [
          'Fold in half',
          'Insert with your fingers',
          'Wear up to 12 hours',
          'Pinch cup to release suction',
          'Empty cup',
          'Wash cup',
        ],
      },
    ],
  },
  {
    id: 'pads',
    name: 'Pads',
    image: require('@/assets/images/learn/pad.png'),
    emoji: '🩹',
    colour: '#FFA3A4',
    description:
      'BRB, grabbing a pad.\n\nDespite being the oldest period product, invented back in the 10th century, we’re still the most popular choice for youth.\n\nDo you know what is inside your pad? Most are made from plastic, so every pad you’ve ever used is still sitting in a landfill. Ack. There are brands that use healthier, biodegradable ingredients like bamboo. You gotta go check them out.\n\nPeriod prep time: remember to keep one or two pads in your school backpack for you and your friends! They come in different sizes and absorbencies, so you’ll have to test them out to see which ones work best for you during your cycle.',
    useSections: [
      {
        steps: [
          'Put in underwear and snap into place',
          'Put in underwear',
          'Wear for 3-5 hours',
          'Discard pad in trash',
        ],
      },
    ],
  },
  {
    id: 'cloth-pads',
    name: 'Cloth\nPads',
    image: require('@/assets/images/learn/cloth-pads.png'),
    emoji: '🌱',
    colour: '#FFA3A4',
    description:
      'Storytime: here comes your period - reusable cloth pads are a great period product option!\n\nCloth pads originated as cloth rags dating back to the 10th century in Ancient Greece. Now they are made of cotton, an absorbent, leak-proof material such as “Zorb,” Polyurethane Laminate (a plastic-like material for the pad’s backing), or amazing bamboo or organic cotton. Most of them have snaps to secure the pad in place, like a pad with wings.\n\nYou need about five cloth pads to wash and use throughout your cycle. They are also a financial investment (around $100 for 5), but cloth pads will last for 2-3 years, depending on personal usage and care.',
    useSections: [
      {
        steps: [
          'Put in underwear and snap into place',
          'Wear for 3-5 hours',
          'Hand wash OR machine wash',
          'Hang to dry',
        ],
      },
    ],
  },
  {
    id: 'tampons',
    name: 'Tampons',
    image: require('@/assets/images/learn/tampons.png'),
    emoji: '✨',
    colour: '#FFA3A4',
    description:
      'Heyyyy! Iz me, your period.\n\nCan you imagine that Ancient Egyptians made tampons out of softened papyrus? Ancient Greeks wrapped bits of wood with lint. Eeek.\n\nToday, tampons are made of absorbent ingredients like purified cotton, rayon fibers, and sometimes bleach. But there are amazing companies that make biodegradable tampons out of organic material. Do you know what’s in your tampons?\n\nTampon applicators are one of the most common items found when doing a beach clean up. Double eeks. Can you find a tampon without an applicator? Don’t worry, tampons won’t get lost inside you and you can sleep with one inserted too.',
    useSections: [
      {
        label: 'With applicator',
        steps: [
          'Remove the wrapper',
          'Gently pull plunger',
          'Insert applicator',
          'Push in plunger',
          'Remove applicator and discard',
          'Wear for 2-4 hours',
          'Pull string to remove',
          'Discard tampon in trash',
        ],
      },
      {
        label: 'Without applicator',
        steps: [
          'Remove the wrappers',
          'Insert with your fingers',
          'Wear for 2-4 hours',
          'Pull string to remove',
          'Discard tampon in trash',
        ],
      },
    ],
  },
  {
    id: 'disc',
    name: 'Menstrual\nDisc',
    image: require('@/assets/images/learn/menstrual-disc.png'),
    emoji: '🔘',
    colour: '#FFA3A4',
    description:
      'Vibe check! (Because your period’s almost here). Menstrual discs are gaining popularity very quickly and were created less than 30 years ago!\n\nUnlike menstrual cups, discs don’t use suction to stay in place. If you can feel it, try making sure that it is pushed all the way back before tucking it up behind your pubic bone.\n\nMany menstrual discs are single use, but there are more companies coming on the market introducing reusable menstrual discs. They are made of non-porous medical grade silicone, and like a menstrual cup, should be changed up to every 12 hours. They only come in one size and one shape, so it fits everyone!',
    useSections: [
      {
        steps: [
          'Fold in half',
          'Insert with your fingers',
          'Wear up to 12 hours',
          'Hook rim with fingers to remove',
          'Empty disc',
          'Wash disc',
        ],
      },
    ],
  },
];

export function todaysFact() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / 86_400_000);
  return facts[day % facts.length];
}

// Matches legacy Info.js
export function todaysFactPreview() {
  const fact = todaysFact();
  return `${fact.slice(0, Math.floor(fact.length / 2))}...`;
}