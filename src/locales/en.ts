import { CircleDollarSign, ClipboardPenLine, Workflow } from "lucide-react"

export const enDic = {
  homePage: {
    heroSection: {
      title: "sketch luxury",
      titleBr: "interior design",
      subTitle: "Bring your dream home to life with one-on-one interior design services",
      mainButtonTitle: "get started",
      secondaryButtonTitle: "contact us"
    }
  },
  whatWeProvide: {
    title: "What We Provide",
    subTitle: "We provide a wide range of interior design services to meet your needs.",
    cards: [
      {
        title: "luxury",
        titleBr: "facilities",
        paragraph: "The advantage of hiring a workspace with us is that gives you comfortable services.",
        icon: ClipboardPenLine,
        latency: .4
      },
      {
        title: "affordable",
        titleBr: "price",
        paragraph: "You can get a workspace of the highest quality at an affordable price.",
        icon: CircleDollarSign,
        latency: .6
      },
      {
        title: "smooth",
        titleBr: "workflow",
        paragraph: "We provide the easiest, smoothest workflow of interior design.",
        icon: Workflow,
        latency: .8
      },
    ]
  },
  banner: {
    title: "simple way to make a stylish living room",
    subTitle: "	Bring your dream home to life with one-on-one interior design help & hand-picked products colored to your style, space, and budget.",
  },
  banner2: {
    title: "we believe that a team makes any project better",
    subTitle: "Bring your dream home to life with one-on-one interior design help & hand picked products colored to your style, space, and budget.",
    details: [
      {
        number: 15,
        text: "Year of",
        textBr: "Experience",
        latency: .5
      },
      {
        number: 38,
        text: "Projects",
        textBr: "Completed",
        latency: .7
      },
      {
        number: 19,
        text: "Different",
        textBr: "Cities",
        latency: .9
      },
    ]
  },
  testimonial: {
    title: "words from our customers",
    subTitle: "Bring your dream home to life with one-on-one interior design help & hand picked products colored to your style, and budget.",
    TestimonialData:
      [
        {
          id: 1,
          name: "Mohamed Ahmed",
          job: "Designer",
          img: "/images/man1.webp",
          text: "Honestly, it was an excellent experience. The sofa I bought has a wonderful material and the finishing is much cleaner than the pictures. The service was extremely polite .",
          delay: 0.2,
          backgroundColor: "black"
        },
        {
          id: 2,
          name: "Doaa Ahmed",
          job: "fashion designer",
          img: "/images/woman.webp",
          text: "I was hesitant to order online, but your products are truly impressive. The colors turned out exactly as I imagined, and the finishing really rivals international brands.",
          delay: 0.4,
          backgroundColor: "white"

        },
        {
          id: 3,
          name: "Mahmoud Ahmed",
          job: "business owner",
          img: "/images/man2.webp",
          text: "I bought a complete living room set, the material is excellent and very comfortable . The best thing is that they understand you and help you choose what suits your home's space.",
          delay: 0.6,
          backgroundColor: "black"

        },
      ]
  },
  subscribe: {
    title: "subscribe to our newsletter",
    subTitle: "Subscribe to our newsletter to receive all the latest updates.",
  },
}