/**
 * Product content for the Learn section.
 *
 * Single source of truth for every period product shown in the app:
 * the grid cards, and the details screen, read from `productCards`. 
 * To add a product, add one entry to the array. Relevent Screens will adjust.
 */

import type { ImageSourcePropType } from 'react-native';

/* One instructional step in a "How to Use" list. */
type ProductStep = {
    /* Short caption shown next to the step number. */
    text: string;
    /* Coressponding Illustration for this step. */
    image: ImageSourcePropType;
};

/**
 * An ordered list of steps. Most products have one list with no label;
 * tampons have two ("With applicator" / "Without applicator").
 */
type StepPath = {
    /* Heading shown above the list on details screen. Omited when a product has only one list. */
    label?: string; 
    steps: ProductStep[];
}

export interface Product {
    /* URL-safe identifier, used in the expo router. Must be unique. */
    id: string;  
    /* Display name, used as the card title and the details page heading. */          
    name: string;
    /* Image shown on the product's card and at the top of its details page. */       
    illustration: ImageSourcePropType;
    /* Intro text for the details page. Paragraphs are separated by "\n\n". */
    summary: string;
    /* One or more step lists making up the "How to Use" section. */
    StepPaths: StepPath[];
};

/** All products, in the order they appear in the grid, stored in central data array. */
export const productCards: Product[] = [
    {
        id: "period-underwear",
        name: "Period Underwear",
        illustration: require('@/assets/images/flashCardImages/period-underwear/underwear.png'),
        summary: "Quick, your period is “OMW”- period underwear has you covered. Wow, the first period underwear product arrived on the market in the late 1980s!?\n\n" +
            "Period underwear is designed to completely replace pads and tampons (or be used as a backup). With a leak-proof layer, it can absorb 1-2 tampons' worth of fluid! Change it daily like normal underwear, but give it a quick rinse with cool water before washing it with your regular laundry. \n\n" +
            "While period underwear can be costly, ranging from $30-$100 per pair depending on size, fit and duration of wear, it can cost you less in the long run as one pair generally lasts a few years.",
        StepPaths: [{
            steps: [
                { text: "Put on underwear", image: require('@/assets/images/flashCardImages/period-underwear/period-underwear1.png') },
                { text: "Wear up to 12 hours", image: require('@/assets/images/flashCardImages/period-underwear/period-underwear2.png') },
                { text: "Hand wash OR machine wash", image: require('@/assets/images/flashCardImages/period-underwear/period-underwear3.png') },
                { text: "Hang to dry", image: require('@/assets/images/flashCardImages/period-underwear/period-underwear4.png') }
            ]
        }]
    },
    {
        id: "menstrual-cup",
        name: "Menstrual Cup",
        illustration: require('@/assets/images/flashCardImages/menstrual-cup/cup.png'),
        summary: "Just popping in to let you know - the earliest versions of the menstrual cup were designed in 1932 and made of natural rubber. Today, menstrual cups are typically made of silicone, which is flexible, durable and anti-bacterial.\n\n" +
            "Menstrual cups are cost effective and sustainable, with almost no waste created each cycle. A cup costs about $40 CAD and can last at least two years. \n\n" +
            "A menstrual cup can be used for up to 12 hours, depending on your menstrual flow. It does take a few uses to learn how often you want to “empty” your cup, and this can vary for each cycle and for every person.",
        StepPaths: [{
            steps: [
                { text: "Fold in half", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup1.png') },
                { text: "Insert with your fingers", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup2.png') },
                { text: "Wear up to 12 hours", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup3.png') },
                { text: "Pinch cup to release suction", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup4.png') },
                { text: "Empty cup", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup5.png') },
                { text: "Wash cup", image: require('@/assets/images/flashCardImages/menstrual-cup/menstrual-cup6.png') }
            ]
        }]
    },
    {
        id: "pads",
        name: "Pads",
        illustration: require('@/assets/images/flashCardImages/pads/pad.png'),
        summary: "BRB, grabbing a pad.\n\n" +
            "Despite being the oldest period product, invented back in the 10th century, we're still the most popular choice for youth. \n\n" +
            "Do you know what is inside your pad? Most are made from plastic, so every pad you've ever used is still sitting in a landfill. Ack. There are brands that use healthier, biodegradable ingredients like bamboo. You gotta go check them out. \n\n" +
            "Period prep time: remember to keep one or two pads in your school backpack for you and your friends! They come in different sizes and absorbencies, so you'll have to test them out to see which ones work best for you during your cycle.",
        StepPaths: [{
            steps: [
                { text: "Put in underwear and snap into place", image: require('@/assets/images/flashCardImages/pads/pad1.png') },
                { text: "Put in underwear", image: require('@/assets/images/flashCardImages/pads/pad2.png') },
                { text: "Wear for 3-5 hours", image: require('@/assets/images/flashCardImages/pads/pad3.png') },
                { text: "Discard pad in trash", image: require('@/assets/images/flashCardImages/pads/pad4.png') }
            ]
        }]
    },
    {
        id: "cloth-pads",
        name: "Cloth Pads",
        illustration: require('@/assets/images/flashCardImages/cloth-pads/cloth-pad.png'),
        summary: "Storytime: here comes your period - reusable cloth pads are a great period product option!\n\n" +
            "Cloth pads originated as cloth rags dating back to the 10th century in Ancient Greece. Now they are made of cotton, an absorbent, leak-proof material such as “Zorb,” Polyurethane Laminate (a plastic-like material for the pad's backing), or amazing bamboo or organic cotton. Most of them have snaps to secure the pad in place, like a pad with wings. \n\n" +
            "You need about five cloth pads to wash and use throughout your cycle. They are also a financial investment (around $100 for 5), but cloth pads will last for 2-3 years, depending on personal usage and care.",
        StepPaths: [{
            steps: [
                { text: "Put in underwear and snap into place", image: require('@/assets/images/flashCardImages/cloth-pads/cloth1.png') },
                { text: "Wear for 3-5 hours", image: require('@/assets/images/flashCardImages/cloth-pads/cloth2.png') },
                { text: "Hand wash OR machine wash", image: require('@/assets/images/flashCardImages/cloth-pads/cloth3.png') },
                { text: "Hang to dry", image: require('@/assets/images/flashCardImages/cloth-pads/cloth4.png') }

            ]
        }]
    },
    {
        id: "tampons",
        name: "Tampons",
        illustration: require('@/assets/images/flashCardImages/tampons/tampons.png'),
        summary: "Heyyyy! Iz me, your period.\n\n" +
            "Can you imagine that Ancient Egyptians made tampons out of softened papyrus? Ancient Greeks wrapped bits of wood with lint. Eeek. \n\n" +
            "Today, tampons are made of absorbent ingredients like purified cotton, rayon fibers, and sometimes bleach. But there are amazing companies that make biodegradable tampons out of organic material. Do you know what's in your tampons? \n\n" +
            "Tampon applicators are one of the most common items found when doing a beach clean up. Double eeks. Can you ind a tampon without an applicator? Don't worry, tampons won't get lost inside you and you can sleep with one inserted too.",
        StepPaths: [{
            label: "With applicator",
            steps: [
                { text: "Remove the wrapper", image: require('@/assets/images/flashCardImages/tampons/tamponwith1.png') },
                { text: "Gently pull plunger", image: require('@/assets/images/flashCardImages/tampons/tamponwith2.png') },
                { text: "Insert applicator", image: require('@/assets/images/flashCardImages/tampons/tamponwith3.png') },
                { text: "Push in plunger", image: require('@/assets/images/flashCardImages/tampons/tamponwith4.png') },
                { text: "Rmove applicator and discard", image: require('@/assets/images/flashCardImages/tampons/tamponwith5.png') },
                { text: "Wear for 2-4 hours", image: require('@/assets/images/flashCardImages/tampons/tamponwith6.png') },
                { text: "Pull string to remove", image: require('@/assets/images/flashCardImages/tampons/tamponwith7.png') },
                { text: "Discard tampon in trash", image: require('@/assets/images/flashCardImages/tampons/tamponwith8.png') }
            ]
        }, {
            label: "Without applicator",
            // Last three steps are the same as above, so they reuse its images.
            steps: [
                { text: "Remove the wrappers", image: require('@/assets/images/flashCardImages/tampons/tamponwithout1.png') },
                { text: "Insert with your fingers", image: require('@/assets/images/flashCardImages/tampons/tamponwithout2.png') },
                { text: "Wear for 2-4 hours", image: require('@/assets/images/flashCardImages/tampons/tamponwith6.png') },
                { text: "Pull string to remove", image: require('@/assets/images/flashCardImages/tampons/tamponwith7.png') },
                { text: "Discard tampon in trash", image: require('@/assets/images/flashCardImages/tampons/tamponwith8.png') }
            ]
        }]
    },
    {
        id: "menstrual-disc",
        name: "Menstrual Disc",
        illustration: require('@/assets/images/flashCardImages/menstrual-disc/menstrual-disc.png'),
        summary: "Vibe check! (Because your period's almost here). Menstrual discs are gaining popularity very quickly and were created less than 30 years ago!\n\n" +
            "Unlike menstrual cups, discs don't use suction to stay in place. If you can feel it, try making sure that it is pushed all the way back before tucking it up behind your pubic bone. \n\n" +
            "Many menstrual discs are single use, but there are more companies coming on the market introducing reusable menstrual discs. They are made of non-porous medical grade silicone, and like a menstrual cup, should be changed up to every 12 hours. They only come in one size and one shape, so it fits everyone!",
        StepPaths: [{
            steps: [
                { text: "Fold in half", image: require('@/assets/images/flashCardImages/menstrual-disc/disc1.png') },
                { text: "Insert with your fingers", image: require('@/assets/images/flashCardImages/menstrual-disc/disc2.png') },
                { text: "Wear up to 12 hours", image: require('@/assets/images/flashCardImages/menstrual-disc/disc3.png') },
                { text: "Hook rim with fingers to remove", image: require('@/assets/images/flashCardImages/menstrual-disc/disc4.png') },
                { text: "Empty disc", image: require('@/assets/images/flashCardImages/menstrual-disc/disc5.png') },
                { text: "Wash disc", image: require('@/assets/images/flashCardImages/menstrual-disc/disc6.png') }
            ]
        }]
    }
]