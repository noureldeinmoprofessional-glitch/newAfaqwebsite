/**
 * Editorial articles for the Insights blog. Thought-leadership content authored
 * for AFAQ (no client/project claims). Bilingual — every reader-facing string
 * carries en + ar so articles read natively under /en and /ar. Category labels
 * live in messages `BlogPage.categories`; the org byline is `BlogPage.author`.
 *
 * To add a post: append an entry with a unique `slug` (used in the URL for both
 * locales) and the same shape.
 */

export type ArticleCategory =
  | "geospatial"
  | "digital"
  | "transport"
  | "infrastructure"
  | "vision2030";

interface Bi {
  en: string;
  ar: string;
}

interface Section {
  heading: Bi;
  body: Bi[];
}

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  texture: "survey" | "grid" | "terrain" | "topo";
  title: Bi;
  excerpt: Bi;
  quote: Bi;
  sections: Section[];
}

export const ARTICLE_CATEGORY_KEYS: ArticleCategory[] = [
  "geospatial",
  "digital",
  "transport",
  "infrastructure",
  "vision2030",
];

export const ARTICLES: Article[] = [
  {
    slug: "structures-born-as-data",
    category: "digital",
    date: "2026-06-18",
    readingMinutes: 6,
    texture: "grid",
    title: {
      en: "Why Every Structure Should Be Born as Data",
      ar: "لماذا ينبغي أن تُولد كل منشأة كبيانات",
    },
    excerpt: {
      en: "The most valuable thing a project produces isn't the structure — it's an accurate model of it. Capture should start on day one.",
      ar: "أثمن ما يُنتجه المشروع ليس المنشأة نفسها، بل نموذجًا دقيقًا لها. وينبغي أن يبدأ الالتقاط من اليوم الأول.",
    },
    quote: {
      en: "A building you can't query is a building you can only guess about.",
      ar: "المبنى الذي لا يمكنك الاستعلام عنه هو مبنى لا يمكنك سوى تخمينه.",
    },
    sections: [
      {
        heading: { en: "The asset and its shadow", ar: "الأصل وظلّه" },
        body: [
          {
            en: "Every physical asset now casts a digital shadow — a model that mirrors its geometry, condition, and behavior. The question is no longer whether that shadow exists, but how accurate it is and when it was created.",
            ar: "كل أصل مادي اليوم يُلقي ظلًّا رقميًا — نموذجًا يعكس هندسته وحالته وسلوكه. لم يعد السؤال هل يوجد هذا الظل، بل كم هو دقيق ومتى أُنشئ.",
          },
        ],
      },
      {
        heading: { en: "Capture is cheapest at the start", ar: "الالتقاط أرخص في البداية" },
        body: [
          {
            en: "Reality capture during construction costs a fraction of reconstructing a model years later from drawings that no longer match the field. What is measured once, precisely, never has to be guessed again.",
            ar: "التقاط الواقع أثناء الإنشاء يكلّف جزءًا يسيرًا مقارنةً بإعادة بناء نموذج بعد سنوات من مخططات لم تعد تطابق الميدان. وما يُقاس مرة واحدة بدقة لا يحتاج إلى تخمين مجددًا.",
          },
        ],
      },
      {
        heading: { en: "From record to operations", ar: "من السجلّ إلى التشغيل" },
        body: [
          {
            en: "A digital twin isn't a static archive; it's an operational instrument. When a structure is born as data, every later decision — maintenance, expansion, integration — starts from truth instead of assumption.",
            ar: "التوأم الرقمي ليس أرشيفًا جامدًا؛ بل أداة تشغيلية. وحين تُولد المنشأة كبيانات، فإن كل قرار لاحق — صيانة أو توسعة أو تكامل — ينطلق من الحقيقة لا من الافتراض.",
          },
        ],
      },
    ],
  },
  {
    slug: "ground-truth-accuracy",
    category: "geospatial",
    date: "2026-05-27",
    readingMinutes: 5,
    texture: "survey",
    title: {
      en: "Ground Truth: The Discipline of Survey-Grade Accuracy",
      ar: "الحقيقة الأرضية: انضباط الدقة المساحية",
    },
    excerpt: {
      en: "Every layer of infrastructure inherits the precision — or the error — of the survey beneath it.",
      ar: "كل طبقة من البنية التحتية ترث دقة — أو خطأ — المسح الذي تحتها.",
    },
    quote: {
      en: "You cannot build straighter than you can measure.",
      ar: "لا يمكنك أن تبني أكثر استقامةً مما تستطيع أن تقيس.",
    },
    sections: [
      {
        heading: { en: "The datum decides everything", ar: "المرجع يقرّر كل شيء" },
        body: [
          {
            en: "A project's coordinate datum is the silent assumption behind every drawing. Get it right and disciplines align effortlessly; get it wrong and the error surfaces late, expensively, and everywhere at once.",
            ar: "المرجع الإحداثي للمشروع هو الافتراض الصامت خلف كل مخطط. إن أصبته تحاذت التخصصات بلا عناء، وإن أخطأته ظهر الخطأ متأخرًا ومكلفًا وفي كل مكان دفعة واحدة.",
          },
        ],
      },
      {
        heading: { en: "Millimetres compound", ar: "الملّيمترات تتراكم" },
        body: [
          {
            en: "Small errors don't stay small. A few millimetres in a control network become centimetres across a site and metres across a corridor. Survey-grade accuracy is not perfectionism — it is risk management.",
            ar: "الأخطاء الصغيرة لا تبقى صغيرة. فبضعة ملّيمترات في شبكة تحكّم تصبح سنتيمترات عبر الموقع وأمتارًا عبر الممر. الدقة المساحية ليست مثالية زائدة، بل إدارة للمخاطر.",
          },
        ],
      },
      {
        heading: { en: "Control before construction", ar: "التحكّم قبل الإنشاء" },
        body: [
          {
            en: "The right sequence is always the same: establish verifiable control, then design, then build. Order the work that way and the ground never argues with the model.",
            ar: "التسلسل الصحيح واحد دائمًا: أرسِ تحكّمًا قابلًا للتحقق، ثم صمّم، ثم ابنِ. رتّب العمل هكذا فلن يجادل الميدان النموذج أبدًا.",
          },
        ],
      },
    ],
  },
  {
    slug: "vision-2030-integrated-engineering",
    category: "vision2030",
    date: "2026-05-09",
    readingMinutes: 7,
    texture: "topo",
    title: {
      en: "Integrated Engineering and the Vision 2030 Giga-Project Era",
      ar: "الهندسة المتكاملة وعصر المشاريع العملاقة لرؤية 2030",
    },
    excerpt: {
      en: "Giga-projects don't fail on ambition; they strain on coordination. Integration is the quiet advantage.",
      ar: "المشاريع العملاقة لا تُخفق بسبب الطموح؛ بل يجهدها التنسيق. والتكامل هو الميزة الهادئة.",
    },
    quote: {
      en: "The hard part of a giga-project isn't any single layer — it's the seams between them.",
      ar: "الجزء الصعب في المشروع العملاق ليس أي طبقة بمفردها، بل الوصلات بينها.",
    },
    sections: [
      {
        heading: { en: "Scale changes the problem", ar: "الحجم يغيّر المشكلة" },
        body: [
          {
            en: "At giga-scale, the engineering challenge shifts from any single discipline to the orchestration of all of them. Vision 2030's programs demand survey, civil, mobility, and digital systems to move as one.",
            ar: "على المقياس العملاق، ينتقل التحدي الهندسي من أي تخصص بمفرده إلى تنسيقها جميعًا. فبرامج رؤية 2030 تتطلّب أن تتحرك المساحة والأعمال المدنية والتنقّل والأنظمة الرقمية كوحدة واحدة.",
          },
        ],
      },
      {
        heading: { en: "The cost of the hand-off", ar: "كلفة التسليم" },
        body: [
          {
            en: "Every hand-off between vendors is a place where information is lost and time leaks away. Multiply those seams across a national program and coordination becomes the dominant cost.",
            ar: "كل تسليم بين الموردين هو موضع تُفقد فيه المعلومات ويتسرّب الوقت. اضرب تلك الوصلات عبر برنامج وطني يصبح التنسيق هو الكلفة المهيمنة.",
          },
        ],
      },
      {
        heading: { en: "One accountable chain", ar: "سلسلة مسؤولية واحدة" },
        body: [
          {
            en: "An integrated partner replaces those seams with a single chain of accountability — from the survey datum to the intelligent systems above it. Fewer interfaces, fewer surprises, faster delivery.",
            ar: "الشريك المتكامل يستبدل تلك الوصلات بسلسلة مسؤولية واحدة — من نقطة الإسناد المساحية إلى الأنظمة الذكية فوقها. واجهات أقل، ومفاجآت أقل، وتسليم أسرع.",
          },
        ],
      },
    ],
  },
  {
    slug: "roads-to-responsive-networks",
    category: "transport",
    date: "2026-04-15",
    readingMinutes: 5,
    texture: "grid",
    title: {
      en: "From Roads to Responsive Networks",
      ar: "من الطرق إلى الشبكات المتجاوبة",
    },
    excerpt: {
      en: "Modern mobility isn't built once and left alone. It's instrumented, measured, and continuously tuned.",
      ar: "التنقّل الحديث لا يُبنى مرة ويُترك. بل يُجهَّز بالأجهزة ويُقاس ويُضبط باستمرار.",
    },
    quote: {
      en: "A road that can't report on itself can't be managed — only maintained.",
      ar: "الطريق الذي لا يستطيع الإبلاغ عن نفسه لا يُدار، بل يُصان فقط.",
    },
    sections: [
      {
        heading: { en: "The instrumented corridor", ar: "الممر المُجهَّز" },
        body: [
          {
            en: "Sensors, cameras, and field controllers turn a corridor from a passive surface into a system that senses demand and responds to it. The asphalt is the same; what changed is the intelligence layered on top.",
            ar: "المستشعرات والكاميرات ووحدات التحكّم الميدانية تحوّل الممر من سطح سلبي إلى نظام يستشعر الطلب ويستجيب له. الأسفلت ذاته؛ ما تغيّر هو طبقة الذكاء فوقه.",
          },
        ],
      },
      {
        heading: { en: "Data closes the loop", ar: "البيانات تُغلق الحلقة" },
        body: [
          {
            en: "Measurement makes management possible. When a network reports flow, incidents, and condition in real time, operators can tune signals and clear incidents before they cascade.",
            ar: "القياس يجعل الإدارة ممكنة. فحين تُبلّغ الشبكة عن الانسياب والحوادث والحالة في الزمن الحقيقي، يستطيع المشغّلون ضبط الإشارات ومعالجة الحوادث قبل أن تتفاقم.",
          },
        ],
      },
      {
        heading: { en: "Interoperability is the real feature", ar: "التوافقية هي الميزة الحقيقية" },
        body: [
          {
            en: "Devices from many vendors only add up when they speak a common language. Open standards like NTCIP keep a network extensible for decades instead of locked to one supplier.",
            ar: "أجهزة موردين متعددين لا تتكامل إلا حين تتحدث لغة مشتركة. والمعايير المفتوحة مثل NTCIP تُبقي الشبكة قابلة للتوسّع لعقود بدل أن تُقيَّد بمورّد واحد.",
          },
        ],
      },
    ],
  },
  {
    slug: "steel-to-smart",
    category: "infrastructure",
    date: "2026-03-22",
    readingMinutes: 6,
    texture: "terrain",
    title: {
      en: "From Steel to Smart: Closing the Physical–Digital Gap",
      ar: "من الحديد إلى الذكاء: سدّ الفجوة بين المادي والرقمي",
    },
    excerpt: {
      en: "The gap between what's built and what's known is where projects lose time and money. Integration closes it.",
      ar: "الفجوة بين ما يُبنى وما هو معروف هي حيث تفقد المشاريع الوقت والمال. والتكامل يسدّها.",
    },
    quote: {
      en: "Every weld is also a data point — if you capture it.",
      ar: "كل لحام هو أيضًا نقطة بيانات — إن التقطته.",
    },
    sections: [
      {
        heading: { en: "Fabrication is data", ar: "التصنيع بيانات" },
        body: [
          {
            en: "A fabrication shop already produces precise digital information — cut lists, tolerances, weld maps. Treating that output as data, not paperwork, is the first step to a connected asset.",
            ar: "ورشة التصنيع تُنتج أصلًا معلومات رقمية دقيقة — قوائم القطع والسماحات وخرائط اللحام. والتعامل مع هذا الناتج كبيانات لا كأوراق هو أول خطوة نحو أصل مترابط.",
          },
        ],
      },
      {
        heading: { en: "The as-built truth", ar: "حقيقة ما نُفّذ" },
        body: [
          {
            en: "Designs drift during construction. An as-built model, captured from the field, reconciles intent with reality — so operators inherit what was actually built, not what was once drawn.",
            ar: "التصاميم تنحرف أثناء الإنشاء. ونموذج ما نُفّذ، المُلتقَط من الميدان، يوفّق بين النية والواقع — ليرث المشغّلون ما بُني فعلًا لا ما رُسم يومًا.",
          },
        ],
      },
      {
        heading: { en: "Handover as a beginning", ar: "التسليم كبداية" },
        body: [
          {
            en: "When physical delivery and digital record arrive together, handover stops being an ending and becomes the start of an asset's intelligent life.",
            ar: "حين يصل التسليم المادي والسجل الرقمي معًا، يتوقف التسليم عن كونه نهاية ويصبح بداية الحياة الذكية للأصل.",
          },
        ],
      },
    ],
  },
  {
    slug: "reality-capture-drones",
    category: "geospatial",
    date: "2026-02-28",
    readingMinutes: 5,
    texture: "topo",
    title: {
      en: "Reality Capture: How Drones Reset the Survey Baseline",
      ar: "التقاط الواقع: كيف أعادت الطائرات المسيّرة ضبط المرجع المساحي",
    },
    excerpt: {
      en: "UAV LiDAR and photogrammetry didn't just speed up surveying — they changed what a baseline can be.",
      ar: "الليدار الجوي والتصوير المساحي لم يُسرّعا المساحة فحسب، بل غيّرا ما يمكن أن يكون عليه المرجع.",
    },
    quote: {
      en: "The fastest way across difficult ground is often above it.",
      ar: "أسرع طريق عبر أرض صعبة غالبًا ما يكون فوقها.",
    },
    sections: [
      {
        heading: { en: "Coverage without compromise", ar: "تغطية بلا تنازل" },
        body: [
          {
            en: "A drone captures in hours what once took a field crew weeks, and at a density no ground survey could match. Coverage is no longer traded against schedule.",
            ar: "تلتقط الطائرة المسيّرة في ساعات ما كان يستغرق فريقًا ميدانيًا أسابيع، وبكثافة لا يضاهيها مسح أرضي. ولم تعُد التغطية تُقايَض بالجدول الزمني.",
          },
        ],
      },
      {
        heading: { en: "Safety by distance", ar: "أمان بالمسافة" },
        body: [
          {
            en: "Steep slopes, live sites, and hazardous ground can be surveyed without putting a person in harm's way. The safest survey is often the one no one has to walk.",
            ar: "المنحدرات الحادة والمواقع النشطة والأراضي الخطرة يمكن مسحها دون تعريض أحد للخطر. وأكثر المسوحات أمانًا غالبًا هو الذي لا يحتاج أحد أن يمشيه.",
          },
        ],
      },
      {
        heading: { en: "From points to decisions", ar: "من النقاط إلى القرارات" },
        body: [
          {
            en: "A point cloud is only raw material. The value comes from turning billions of points into clean surfaces, volumes, and models that a design team can actually decide from.",
            ar: "سحابة النقاط ليست سوى مادة خام. وتأتي القيمة من تحويل مليارات النقاط إلى أسطح وأحجام ونماذج نظيفة يمكن لفريق التصميم أن يقرّر منها فعلًا.",
          },
        ],
      },
    ],
  },
];
