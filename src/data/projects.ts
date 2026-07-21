/**
 * REPRESENTATIVE PROJECT REGISTER — sample data.
 *
 * These records are illustrative of AFAQ's scope across categories, regions,
 * owning entities, and years so the Projects archive (search / filter / sort)
 * is fully functional. They are NOT a claim of specific awarded contracts —
 * per the content-accuracy rules, no fabricated results or dates are presented
 * as verified. Replace this array with the client's real project register; the
 * UI keys (category / region / entity) map to labels in messages `ProjectsPage`.
 *
 * Localized free-text (name / scope / technical / city) carries both locales so
 * the archive reads natively under /en and /ar.
 */

export type Category = "survey" | "civil" | "its" | "av" | "integrated";

export type RegionKey =
  | "riyadh"
  | "makkah"
  | "madinah"
  | "eastern"
  | "qassim"
  | "asir"
  | "tabuk"
  | "hail"
  | "northern"
  | "jazan"
  | "najran"
  | "bahah"
  | "jawf";

export type EntityKey =
  | "rcrc"
  | "swcc"
  | "sec"
  | "mewa"
  | "mot"
  | "mod"
  | "pif"
  | "neom"
  | "qiddiya"
  | "diriyah"
  | "kafd"
  | "municipality";

interface Bilingual {
  en: string;
  ar: string;
}

export interface Project {
  id: string;
  name: Bilingual;
  scope: Bilingual;
  technical: Bilingual;
  category: Category;
  region: RegionKey;
  city: Bilingual;
  entity: EntityKey;
  year: number;
}

/** Facet order for dropdowns. */
export const CATEGORY_KEYS: Category[] = ["survey", "civil", "its", "av", "integrated"];
export const REGION_KEYS: RegionKey[] = [
  "riyadh",
  "makkah",
  "madinah",
  "eastern",
  "qassim",
  "asir",
  "tabuk",
  "hail",
  "northern",
  "jazan",
  "najran",
  "bahah",
  "jawf",
];
export const ENTITY_KEYS: EntityKey[] = [
  "rcrc",
  "swcc",
  "sec",
  "mewa",
  "mot",
  "mod",
  "pif",
  "neom",
  "qiddiya",
  "diriyah",
  "kafd",
  "municipality",
];

const city = (en: string, ar: string): Bilingual => ({ en, ar });

export const PROJECTS: Project[] = [
  // ---- Survey & GIS -------------------------------------------------------
  {
    id: "sv-01",
    name: { en: "Regional Geodetic Control Network", ar: "شبكة تحكّم جيوديسي إقليمية" },
    scope: {
      en: "Establishment of a survey-grade GNSS control framework and monumentation as the coordinate base for regional development.",
      ar: "إنشاء إطار تحكّم ملاحي بدقة مساحية مع نقاط إسناد كأساس إحداثي للتطوير الإقليمي.",
    },
    technical: { en: "Static GNSS network · ±2mm control · unified datum.", ar: "شبكة GNSS ثابتة · تحكّم ±2مم · مرجع موحّد." },
    category: "survey",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "rcrc",
    year: 2012,
  },
  {
    id: "sv-02",
    name: { en: "Water Transmission Corridor Survey", ar: "مسح ممر نقل المياه" },
    scope: {
      en: "Topographic and route survey along a major water transmission corridor, delivered as GIS-ready deliverables.",
      ar: "مسح طبوغرافي ومسح مسار على امتداد ممر رئيسي لنقل المياه، بمخرجات جاهزة لنظم المعلومات الجغرافية.",
    },
    technical: { en: "Corridor survey · route alignment · GIS deliverables.", ar: "مسح ممر · محاذاة مسار · مخرجات نظم معلومات." },
    category: "survey",
    region: "eastern",
    city: city("Dammam", "الدمام"),
    entity: "swcc",
    year: 2015,
  },
  {
    id: "sv-03",
    name: { en: "Urban Cadastral GIS Mapping", ar: "رسم مساحي حضري بنظم المعلومات" },
    scope: {
      en: "Cadastral and utility GIS mapping program supporting municipal planning and asset management.",
      ar: "برنامج رسم مساحي ومرافق بنظم المعلومات لدعم التخطيط البلدي وإدارة الأصول.",
    },
    technical: { en: "Cadastral GIS · utility layers · asset registry.", ar: "نظم معلومات مساحية · طبقات مرافق · سجل أصول." },
    category: "survey",
    region: "makkah",
    city: city("Jeddah", "جدة"),
    entity: "municipality",
    year: 2017,
  },
  {
    id: "sv-04",
    name: { en: "Greenfield Reality Capture", ar: "التقاط واقع لموقع جديد" },
    scope: {
      en: "UAV LiDAR and photogrammetric reality capture across a greenfield development to seed the design baseline.",
      ar: "التقاط واقع بالليدار الجوي والتصوير المساحي عبر موقع تطوير جديد لتأسيس المرجع التصميمي.",
    },
    technical: { en: "UAV LiDAR · photogrammetry · point cloud.", ar: "ليدار جوي · تصوير مساحي · سحابة نقاط." },
    category: "survey",
    region: "tabuk",
    city: city("NEOM", "نيوم"),
    entity: "neom",
    year: 2021,
  },
  {
    id: "sv-05",
    name: { en: "Agricultural Land GIS Inventory", ar: "جرد أراضٍ زراعية بنظم المعلومات" },
    scope: {
      en: "Regional GIS inventory of agricultural parcels and water resources for planning and monitoring.",
      ar: "جرد إقليمي بنظم المعلومات للأراضي الزراعية وموارد المياه لأغراض التخطيط والمتابعة.",
    },
    technical: { en: "Remote sensing · parcel GIS · resource mapping.", ar: "استشعار عن بُعد · نظم معلومات قطع · رسم موارد." },
    category: "survey",
    region: "qassim",
    city: city("Buraydah", "بريدة"),
    entity: "mewa",
    year: 2018,
  },

  // ---- Civil & Steel ------------------------------------------------------
  {
    id: "cv-01",
    name: { en: "Entertainment District Steel Package", ar: "حزمة حديد لمنطقة ترفيهية" },
    scope: {
      en: "Structural steel design, fabrication, and erection for large-span venue structures.",
      ar: "تصميم وتصنيع وتركيب حديد إنشائي لمنشآت واسعة البحور في صرح ترفيهي.",
    },
    technical: { en: "Long-span steel · shop fabrication · erection.", ar: "حديد واسع البحور · تصنيع ورشي · تركيب." },
    category: "civil",
    region: "riyadh",
    city: city("Qiddiya", "القدية"),
    entity: "qiddiya",
    year: 2020,
  },
  {
    id: "cv-02",
    name: { en: "Substation Civil Works", ar: "أعمال مدنية لمحطة تحويل" },
    scope: {
      en: "Civil and structural works for power substations, including foundations and equipment supports.",
      ar: "أعمال مدنية وإنشائية لمحطات تحويل كهربائية، تشمل الأساسات وقواعد المعدات.",
    },
    technical: { en: "RC foundations · equipment supports · earthworks.", ar: "أساسات خرسانية · قواعد معدات · أعمال ترابية." },
    category: "civil",
    region: "eastern",
    city: city("Dammam", "الدمام"),
    entity: "sec",
    year: 2016,
  },
  {
    id: "cv-03",
    name: { en: "Urban Road Infrastructure", ar: "بنية تحتية للطرق الحضرية" },
    scope: {
      en: "Roadworks, drainage, and utility infrastructure for an expanding urban district.",
      ar: "أعمال طرق وتصريف وبنية مرافق لحي حضري متوسّع.",
    },
    technical: { en: "Roadworks · drainage · utility ducting.", ar: "أعمال طرق · تصريف · مجاري مرافق." },
    category: "civil",
    region: "madinah",
    city: city("Madinah", "المدينة المنورة"),
    entity: "municipality",
    year: 2014,
  },
  {
    id: "cv-04",
    name: { en: "Heritage District Civil Works", ar: "أعمال مدنية لحي تراثي" },
    scope: {
      en: "Sensitive civil and infrastructure works within a heritage development, coordinated with conservation requirements.",
      ar: "أعمال مدنية وبنية تحتية دقيقة ضمن تطوير تراثي بالتنسيق مع متطلبات الحفاظ.",
    },
    technical: { en: "Phased civil works · buried utilities · site coordination.", ar: "أعمال مدنية مرحلية · مرافق مدفونة · تنسيق موقعي." },
    category: "civil",
    region: "riyadh",
    city: city("Diriyah", "الدرعية"),
    entity: "diriyah",
    year: 2022,
  },
  {
    id: "cv-05",
    name: { en: "Desalination Plant Steel Structures", ar: "منشآت حديدية لمحطة تحلية" },
    scope: {
      en: "Fabrication and installation of steel structures and platforms for a coastal desalination facility.",
      ar: "تصنيع وتركيب منشآت ومنصّات حديدية لمحطة تحلية ساحلية.",
    },
    technical: { en: "Coastal steel · corrosion protection · platforms.", ar: "حديد ساحلي · حماية من التآكل · منصّات." },
    category: "civil",
    region: "makkah",
    city: city("Jeddah", "جدة"),
    entity: "swcc",
    year: 2017,
  },

  // ---- Intelligent Transportation Systems --------------------------------
  {
    id: "it-01",
    name: { en: "Urban Traffic Management Corridor", ar: "ممر إدارة حركة مرورية حضري" },
    scope: {
      en: "Deployment of ITS field devices and a traffic management corridor with central monitoring.",
      ar: "نشر أجهزة نقل ذكي ميدانية وممر إدارة حركة مرورية مع مراقبة مركزية.",
    },
    technical: { en: "ITS field devices · NTCIP · central control.", ar: "أجهزة نقل ذكي ميدانية · NTCIP · تحكّم مركزي." },
    category: "its",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "rcrc",
    year: 2019,
  },
  {
    id: "it-02",
    name: { en: "Intercity Highway ITS", ar: "أنظمة نقل ذكي لطريق سريع بين المدن" },
    scope: {
      en: "Highway ITS instrumentation for incident detection, variable messaging, and traffic data.",
      ar: "تجهيز طريق سريع بأنظمة نقل ذكي لكشف الحوادث ولوحات الرسائل المتغيّرة وبيانات المرور.",
    },
    technical: { en: "Incident detection · VMS · traffic sensors.", ar: "كشف حوادث · لوحات رسائل · حساسات مرور." },
    category: "its",
    region: "eastern",
    city: city("Dammam", "الدمام"),
    entity: "mot",
    year: 2018,
  },
  {
    id: "it-03",
    name: { en: "Adaptive Signal Control Network", ar: "شبكة تحكّم إشاري متكيّف" },
    scope: {
      en: "Adaptive traffic signal control across a network of urban intersections to reduce delay.",
      ar: "تحكّم إشاري مروري متكيّف عبر شبكة تقاطعات حضرية لتقليل زمن التأخير.",
    },
    technical: { en: "Adaptive control · detection · signal optimization.", ar: "تحكّم متكيّف · كشف · تحسين إشارات." },
    category: "its",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "rcrc",
    year: 2021,
  },
  {
    id: "it-04",
    name: { en: "Pilgrimage Route Traffic Systems", ar: "أنظمة مرور لمسارات الحج" },
    scope: {
      en: "Traffic management and crowd-flow monitoring systems along high-demand pilgrimage routes.",
      ar: "أنظمة إدارة حركة ومراقبة انسياب الحشود على مسارات الحج عالية الطلب.",
    },
    technical: { en: "Crowd-flow monitoring · CCTV · traffic control.", ar: "مراقبة انسياب حشود · كاميرات · تحكّم مروري." },
    category: "its",
    region: "makkah",
    city: city("Makkah", "مكة المكرمة"),
    entity: "mot",
    year: 2015,
  },
  {
    id: "it-05",
    name: { en: "Tolling & Enforcement Gantries", ar: "بوابات تحصيل وضبط" },
    scope: {
      en: "Roadside tolling and enforcement gantry systems with back-office integration.",
      ar: "أنظمة بوابات تحصيل وضبط على جانب الطريق مع تكامل مع الأنظمة الخلفية.",
    },
    technical: { en: "Gantry systems · ANPR · back-office integration.", ar: "أنظمة بوابات · تمييز لوحات · تكامل خلفي." },
    category: "its",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "mot",
    year: 2023,
  },

  // ---- AV & Smart Systems -------------------------------------------------
  {
    id: "av-01",
    name: { en: "Operations Command Video Wall", ar: "جدار عرض لغرفة عمليات" },
    scope: {
      en: "Design and integration of a command-center video wall and control systems.",
      ar: "تصميم وتكامل جدار عرض وأنظمة تحكّم لمركز عمليات.",
    },
    technical: { en: "Video wall · KVM · control-room integration.", ar: "جدار عرض · KVM · تكامل غرفة تحكّم." },
    category: "av",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "pif",
    year: 2022,
  },
  {
    id: "av-02",
    name: { en: "Entertainment Venue AV Integration", ar: "تكامل صوت وصورة لصرح ترفيهي" },
    scope: {
      en: "Audio-visual systems integration for a large entertainment venue, including displays and audio.",
      ar: "تكامل أنظمة سمعية وبصرية لصرح ترفيهي كبير، يشمل الشاشات والصوت.",
    },
    technical: { en: "Large-format display · audio · AVIXA design.", ar: "عرض كبير الحجم · صوت · تصميم AVIXA." },
    category: "av",
    region: "riyadh",
    city: city("Qiddiya", "القدية"),
    entity: "qiddiya",
    year: 2023,
  },
  {
    id: "av-03",
    name: { en: "Architectural LED Media Façade", ar: "واجهة إعلامية LED معمارية" },
    scope: {
      en: "Building-scale LED media façade with content and control infrastructure.",
      ar: "واجهة إعلامية LED بحجم مبنى مع بنية محتوى وتحكّم.",
    },
    technical: { en: "LED façade · pixel mapping · content system.", ar: "واجهة LED · خرائط بكسل · نظام محتوى." },
    category: "av",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "kafd",
    year: 2020,
  },
  {
    id: "av-04",
    name: { en: "Utility Control Room Systems", ar: "أنظمة غرفة تحكّم مرافق" },
    scope: {
      en: "Control-room AV and display systems for a utility operations center.",
      ar: "أنظمة صوت وصورة وشاشات لغرفة تحكّم في مركز عمليات مرافق.",
    },
    technical: { en: "Operator displays · video wall · integration.", ar: "شاشات مشغّلين · جدار عرض · تكامل." },
    category: "av",
    region: "eastern",
    city: city("Dammam", "الدمام"),
    entity: "sec",
    year: 2019,
  },

  // ---- Integrated Engineering --------------------------------------------
  {
    id: "in-01",
    name: { en: "Smart Corridor Integrated Delivery", ar: "تسليم متكامل لممر ذكي" },
    scope: {
      en: "End-to-end delivery of a smart mobility corridor spanning survey, civil, ITS, and control systems.",
      ar: "تسليم شامل لممر تنقّل ذكي يمتد عبر المساحة والأعمال المدنية والنقل الذكي وأنظمة التحكّم.",
    },
    technical: { en: "Survey → civil → ITS → control · one delivery.", ar: "مساحة ← مدني ← نقل ذكي ← تحكّم · تسليم واحد." },
    category: "integrated",
    region: "tabuk",
    city: city("NEOM", "نيوم"),
    entity: "neom",
    year: 2023,
  },
  {
    id: "in-02",
    name: { en: "Smart City Sensor & GIS Program", ar: "برنامج استشعار ونظم معلومات لمدينة ذكية" },
    scope: {
      en: "Instrumentation and GIS program connecting urban assets into a unified digital platform.",
      ar: "برنامج تجهيز ونظم معلومات يربط الأصول الحضرية في منصة رقمية موحّدة.",
    },
    technical: { en: "Sensor network · enterprise GIS · dashboards.", ar: "شبكة استشعار · نظم معلومات مؤسسية · لوحات معلومات." },
    category: "integrated",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "rcrc",
    year: 2024,
  },
  {
    id: "in-03",
    name: { en: "District Digital Twin", ar: "توأم رقمي لحي" },
    scope: {
      en: "Reality-captured digital twin of a district for planning, operations, and asset management.",
      ar: "توأم رقمي ملتقَط من الواقع لحي لأغراض التخطيط والتشغيل وإدارة الأصول.",
    },
    technical: { en: "Reality capture · digital twin · asset model.", ar: "التقاط واقع · توأم رقمي · نموذج أصول." },
    category: "integrated",
    region: "riyadh",
    city: city("Diriyah", "الدرعية"),
    entity: "diriyah",
    year: 2023,
  },
  {
    id: "in-04",
    name: { en: "Utility Digital Infrastructure", ar: "بنية تحتية رقمية للمرافق" },
    scope: {
      en: "Digital infrastructure connecting utility assets with monitoring and GIS integration.",
      ar: "بنية تحتية رقمية تربط أصول المرافق مع المراقبة والتكامل مع نظم المعلومات.",
    },
    technical: { en: "SCADA-ready · GIS integration · monitoring.", ar: "جاهزية SCADA · تكامل نظم معلومات · مراقبة." },
    category: "integrated",
    region: "makkah",
    city: city("Jeddah", "جدة"),
    entity: "swcc",
    year: 2020,
  },
  {
    id: "in-05",
    name: { en: "Secure Facility Systems Integration", ar: "تكامل أنظمة لمنشأة آمنة" },
    scope: {
      en: "Integrated infrastructure and systems delivery for a secure, mission-critical facility.",
      ar: "تسليم متكامل للبنية التحتية والأنظمة لمنشأة آمنة وحسّاسة المهام.",
    },
    technical: { en: "Secure infrastructure · systems integration.", ar: "بنية تحتية آمنة · تكامل أنظمة." },
    category: "integrated",
    region: "riyadh",
    city: city("Riyadh", "الرياض"),
    entity: "mod",
    year: 2021,
  },
];
