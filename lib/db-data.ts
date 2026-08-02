// Reformed Books House Central Database Simulation File
// This file acts as our local lightweight relational database.

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
  coverColor?: string;
  accentColor?: string;
  emblemType?: string;
  paperPageNum?: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'special-sale' | 'book-release' | 'symposium';
  categoryLabel: string;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  date: string;
  time: string;
  location: string;
  badge: string;
  discountRate?: string;
  description: string;
  highlights: string[];
  image: string;
  registrationUrl?: string;
}

export interface Thought {
  id: string;
  title: string;
  category: 'christ-culture' | 'reformed-worldview' | 'doctrine';
  excerpt: string;
  content: string;
  author: string;
  date: string;
}

export const booksData: Book[] = [
  {
    id: "1",
    title: "Sovereignty of Grace",
    subtitle: "A Deep Journey into Historic Reformed Theology",
    description: "Reformed theology is not merely a set of historical theories, but a living, breathing perspective that captures the absolute majesty of God and His redemptive plan for humanity. In this foundational work, Dr. James Mitchell unpacks the majestic doctrines of grace, the covenants of Scripture, and the profound implications of God's sovereignty in a broken world. This volume serves as an essential companion for those who seek to anchor their faith in the immovable truths of historic reformed confessions.",
    author: "Dr. James Mitchell",
    category: "Sovereign Grace",
    coverColor: "bg-emerald-950 border-emerald-500/20",
    accentColor: "text-amber-500/90",
    emblemType: "shield",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    paperPageNum: 312
  },
  {
    id: "2",
    title: "The Covenant Path",
    subtitle: "Tracing Redemption Through the Scriptures",
    description: "God's redemptive dealings with mankind have always been structured through covenants. From the beautiful garden of Eden to the glorious cross of Calvary, each covenant reveals another brilliant facet of God's eternal devotion to His chosen people. Follow this step-by-step tracing of biblical covenants to discover how the entire narrative of Scripture fits together in one beautiful, cohesive tapestry of redeeming love.",
    author: "Rev. Thomas Vance",
    category: "Covenant Theology",
    coverColor: "bg-amber-950 border-amber-500/20",
    accentColor: "text-amber-400/90",
    emblemType: "anchor",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    paperPageNum: 245
  },
  {
    id: "3",
    title: "Solitude & Prayer",
    subtitle: "Nurturing the Inner Life of the Soul",
    description: "In an age characterized by ceaseless noise, digital distraction, and overwhelming anxiety, true spiritual communion requires intentional solitude. Drawing upon the rich spiritual heritage of the puritan masters and monastic reformers, this gentle book guides you into the quiet sanctuary of the heart where the whisper of the Holy Spirit can finally be heard, bringing deep healing and lasting strength.",
    author: "Alethea Sterling",
    category: "Christian Living",
    coverColor: "bg-slate-900 border-slate-500/20",
    accentColor: "text-slate-300",
    emblemType: "leaf",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1543002588-d83ceddc8055?w=400&h=600&fit=crop",
    paperPageNum: 180
  },
  {
    id: "4",
    title: "Little Hearts, Big Grace",
    subtitle: "A Lyrical Storybook of Covenants & Creation",
    description: "Designed specifically to introduce toddlers and young children to the beautiful covenants of Scripture. Through lyrical storytelling and beautiful interactive visuals, little hearts will discover how much God loves them, from the starry skies of creation to the comforting promises of redemption. This modern classic serves as a treasured keepsake for family devotionals and cozy bedtime reading, making ultimate questions accessible and heartwarming to little ones.",
    author: "Sarah Mitchell & David Chen",
    category: "Children & Family",
    coverColor: "bg-indigo-900 border-indigo-400/20",
    accentColor: "text-amber-300",
    emblemType: "star",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    paperPageNum: 20
  },
  {
    id: "5",
    title: "Doctrine & Practice",
    subtitle: "Bridging Theological Truth with Daily Life",
    description: "Theology was never meant to be confined to the dusty shelves of academic library alcoves. It of right belongs in the prayer closet, the marketplace, and the family table. Rev. Elizabeth Turner offers a beautifully practical and encouraging guide that translates orthodox Christian doctrines into active orthopraxy. Learn how the profound reality of justification, sanctification, and union with Christ transforms daily anxiety into perfect peace and fills life with purpose.",
    author: "Rev. Elizabeth Turner",
    category: "Practical Theology",
    coverColor: "bg-violet-950 border-violet-500/20",
    accentColor: "text-cyan-400",
    emblemType: "lamp",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop",
    paperPageNum: 182
  },
  {
    id: "6",
    title: "Echoes of the Reformation",
    subtitle: "Lives of Courage and Absolute Truth",
    description: "Discover the breathtaking biographies of men and women who risked everything to return the church to the pure light of the Gospel. From John Wycliffe to Elizabeth Dunlap, explore how courageous faith and unwavering conviction shaped the modern world. Beautifully illustrated and designed for both scholars and families.",
    author: "Historical Biographies",
    category: "History & Biography",
    coverColor: "bg-rose-950 border-rose-500/20",
    accentColor: "text-rose-300",
    emblemType: "scroll",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    paperPageNum: 280
  }
];

export const articlesData: Article[] = [
  {
    id: "a1",
    title: "The Beauty of Grace in Everyday Distractions",
    excerpt: "How the Reformed worldview helps us find God's sovereign hand in our busiest and most chaotic days.",
    content: "We live in an era of constant connection and digital notification. Yet, the historic Christian faith reminds us that our primary anchor is not in the virtual realm, but in the eternal decree of our loving Father. By resting in His absolute sovereignty, we can view every daily disruption as a divinely appointed opportunity to practice patience, express charity, and witness the unfolding of His grace in the small moments of life.",
    author: "Rev. Elizabeth Turner",
    date: "June 24, 2026",
    readTime: "5 min read",
    category: "Practical Faith",
    image: "https://images.unsplash.com/photo-1491841573190-7111a62d00f4?w=600&h=400&fit=crop"
  },
  {
    id: "a2",
    title: "Rediscovering the Puritans on Solitude",
    excerpt: "What 17th-century pastoral wisdom can teach our 21st-century anxious hearts about resting in Christ.",
    content: "The Puritans are often misunderstood as cold, academic legalists. In reality, their journals and prayer guides reveal deep, passionate, and vibrant spiritual lives. They cherished 'secret prayer' and meditation above public activity. By carving out sacred moments of silent communion, they anchored their souls against the storms of political turmoil and personal trials. Today, we can find modern healing in their ancient footsteps.",
    author: "Dr. James Mitchell",
    date: "May 18, 2026",
    readTime: "8 min read",
    category: "Church History",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop"
  },
  {
    id: "a3",
    title: "Teaching Big Truths to Little Hearts",
    excerpt: "Practical guide for parents wishing to introduce covenant theology and theological concepts to children.",
    content: "The complex ideas of covenants, grace, and redemption may seem too grand for young children to comprehend. However, the Bible shows that God's covenant extends deeply to our families. By using lyrical stories, rich metaphors (like God's promise as an unbreakable golden cord), and daily habits of bedtime devotional reading, we can sow seeds of deep theology that will grow into robust, lifetime convictions.",
    author: "Sarah Mitchell",
    date: "April 12, 2026",
    readTime: "6 min read",
    category: "Family Devotional",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=400&fit=crop"
  }
];

export const eventsData: EventItem[] = [
  {
    id: "e1",
    title: "2026 Grand Autumn Theological Book Fair & Special Sale",
    subtitle: "Up to 35% Off Hardcovers & Free Global Shipping on Bundles",
    category: "special-sale",
    categoryLabel: "Special Promotion",
    status: "ONGOING",
    date: "August 15 – September 15, 2026",
    time: "All Day Online & In-Store",
    location: "Reformed Books House Main Gallery & Online Store",
    badge: "🔥 Hot Publisher Sale",
    discountRate: "35% OFF",
    description: "Reformed Books House is excited to announce our flagship Autumn Special Sale Event! Celebrate the release of our landmark 6-Volume Theology Collection with exclusive limited edition clothbound hardcovers, companion study guides, and instant EPUB bundle packs.",
    highlights: [
      "Special 35% discount on complete 6-volume hardcover box sets",
      "Free custom embossed leather bookmarks with every order over $50",
      "Instant digital PDF/EPUB download link emailed immediately upon purchase",
      "Live author Q&A session broadcasted on August 20th"
    ],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop",
    registrationUrl: "/books/all"
  },
  {
    id: "e2",
    title: "Book Launch & Symposium: 'The Doctrine of God' Special Edition",
    subtitle: "Meet Dr. James Mitchell & The Editorial Board",
    category: "book-release",
    categoryLabel: "Release Ceremony",
    status: "UPCOMING",
    date: "September 05, 2026",
    time: "14:00 - 17:00 EST",
    location: "Grand Auditorium & Live High-Definition Stream",
    badge: "✨ Author Launch Event",
    description: "Join us for an inspiring afternoon as Reformed Books House unveils the newly revised, expanded hardback edition of 'The Doctrine of God'. Includes keynote lectures, live chamber classical music performance, author signings, and a reception.",
    highlights: [
      "Keynote address by chief editor Dr. James Mitchell",
      "Signed hardback copies reserved for the first 100 registered attendees",
      "Commemorative linen notebook included for all in-person guests",
      "Interactive Q&A session with the editorial scholars panel"
    ],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop",
    registrationUrl: "#register"
  },
  {
    id: "e3",
    title: "Reformed Worldview Conference & Historical Confessions Exhibition",
    subtitle: "Exploring 16th Century Catechisms in Modern Typography",
    category: "symposium",
    categoryLabel: "Academic Exhibition",
    status: "UPCOMING",
    date: "October 10 – October 12, 2026",
    time: "09:00 - 18:00 EST Daily",
    location: "Reformed Books House Exhibition Hall, New York",
    badge: "🏛️ Academic Exhibition",
    description: "A three-day symposium bringing together seminary professors, graphic designers, historians, and readers. Discover rare archival manuscripts alongside Reformed Books House's modern high-craft press editions.",
    highlights: [
      "View 17th-century original leatherbound printings alongside modern press editions",
      "Masterclass on typography and historic bookbinding craft",
      "Special 20% discount voucher for all conference attendees"
    ],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop",
    registrationUrl: "#register"
  }
];

export const thoughtsData: Thought[] = [
  {
    id: "t1",
    title: "Christ & Culture: The Sovereign Lordship Over All Spheres",
    category: "christ-culture",
    excerpt: "Abraham Kuyper famously declared that there is not a single square inch of the universe over which Christ does not cry, 'Mine!'",
    content: "How do Christians engage with a rapidly secularizing society? Instead of complete isolation or total assimilation, historic Reformed thought proposes active, redemptive engagement. Because Christ is sovereign over art, science, education, family, and politics, we perform our vocations as acts of worship. We seek to bring biblical truth and restoration to every sphere of human cultural endeavor, looking forward to the ultimate consummation of His Kingdom.",
    author: "Dr. James Mitchell",
    date: "June 15, 2026"
  },
  {
    id: "t2",
    title: "A Unified Reformed Worldview in a Fragmented Era",
    category: "reformed-worldview",
    excerpt: "The power of a comprehensive, biblical framework that answers life's ultimate questions with perfect coherence.",
    content: "Modern life feels increasingly fragmented, divided into secular and sacred, logical and emotional. The Reformed worldview offers a beautifully unified framework: Creation, Fall, Redemption, and Restoration. This grand narrative provides a clear lens through which we can understand our origin, our current moral struggles, the hope of the Cross, and the certain promise of a renewed creation. It anchors the mind and comforts the heart.",
    author: "Rev. Thomas Vance",
    date: "May 29, 2026"
  },
  {
    id: "t3",
    title: "The Solas of the Reformation: The Five Pillars of Grace",
    category: "doctrine",
    excerpt: "Exploring Scripture Alone, Faith Alone, Grace Alone, Christ Alone, and Glory to God Alone.",
    content: "At the heart of Reformed identity are the five Solas of the 16th-century Protestant Reformation. These are not archaic dogmas, but vibrant, life-giving truths: Sola Scriptura asserts the final authority of God's Word; Sola Fide and Sola Gratia declare that salvation is an unearned gift received through faith alone; Solus Christus reminds us that Christ is our sole mediator; and Soli Deo Gloria calls us to live every breath for His praise alone.",
    author: "Rev. Elizabeth Turner",
    date: "April 05, 2026"
  }
];

export const aboutData = {
  vision: "To publish, curate, and distribute high-quality, intellectually rigorous, and visually stunning books that bridge the depth of historical Reformed theology with the warmth of everyday life.",
  mission: "We strive to be a light in the publishing world, offering beautiful, thoughtfully designed books and articles for scholars, families, and little hearts alike. We believe that true theology should be both intellectually satisfying and visually beautiful.",
  values: [
    { title: "Theological Integrity", desc: "Rooted in historic, orthodox Reformed confessions and scriptural truth." },
    { title: "Aesthetic Excellence", desc: "Every cover, font, and layout is crafted with meticulous care to honor the content." },
    { title: "All of Life", desc: "From high-level academic dogmatics to lyrical storybooks for children, Christ is Lord over all." }
  ],
  story: "Founded by a group of pastors, designers, and educators, Reformed Books House began with a simple observation: beautiful books inspire beautiful thoughts. We set out to create a publishing house where historic truths meet contemporary aesthetic design. Today, we serve thousands of readers around the globe with books that feed the mind and delight the eyes."
};

