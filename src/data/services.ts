/**
 * SERVICE LANDING-PAGE MODEL — content adapted (not copied verbatim) from the
 * AFAQ Systems Company Profile 2026 into concise, scannable web copy. Terminology
 * and positioning are preserved; no capability or standard is invented.
 *
 * Each of the four engineering divisions (survey · civil · its · av) becomes a
 * dedicated /services/[slug] page. Related work and the featured case study are
 * DERIVED from the case-study register (see helpers) so the site stays
 * interconnected — service → related projects → case study → contact.
 *
 * Free text carries both locales. Technology names render as Latin badges in
 * both locales (brand/standard marks).
 */

import type { Category } from "./projects";
import { CASE_STUDIES, type CaseStudy } from "./case-studies";
import { PROJECTS } from "./projects";
import { projectImage, imageSrc } from "@/lib/images";

interface B {
  en: string;
  ar: string;
}
const b = (en: string, ar: string): B => ({ en, ar });

export interface OverviewBlock {
  icon: string;
  title: B;
  body: B;
}
export interface Capability {
  icon: string;
  title: B;
  desc: B;
}
export interface TechGroup {
  label: B;
  items: string[];
}
export interface IndustryCard {
  icon: string;
  label: B;
}
export interface ProcessStep {
  icon: string;
  title: B;
  desc: B;
}
export interface Stat {
  value: string;
  label: B;
}
export interface Faq {
  q: B;
  a: B;
}

export interface Service {
  slug: string;
  category: Category;
  icon: string;
  name: B;
  tagline: B;
  intro: B;
  hero: string;
  overview: OverviewBlock[];
  capabilities: Capability[];
  techGroups: TechGroup[];
  industries: IndustryCard[];
  process: ProcessStep[];
  stats: Stat[];
  faqs: Faq[];
}

/** Shared delivery process — one connected chain from first contact to handover. */
const PROCESS: ProcessStep[] = [
  {
    icon: "consultation",
    title: b("Consultation", "الاستشارة"),
    desc: b("We scope objectives, constraints and success criteria with your team.", "نحدّد الأهداف والقيود ومعايير النجاح مع فريقكم."),
  },
  {
    icon: "assessment",
    title: b("Site Assessment", "تقييم الموقع"),
    desc: b("On-site evaluation of existing conditions and technical requirements.", "تقييم ميداني للظروف القائمة والمتطلبات الفنية."),
  },
  {
    icon: "planning",
    title: b("Planning", "التخطيط"),
    desc: b("A phased plan with milestones, standards and quality gates.", "خطة مرحلية بمحطات ومعايير وبوابات جودة."),
  },
  {
    icon: "engineering",
    title: b("Engineering", "الهندسة"),
    desc: b("Design and analysis verified against Saudi and global codes.", "تصميم وتحليل موثّق وفق الأكواد السعودية والعالمية."),
  },
  {
    icon: "execution",
    title: b("Execution", "التنفيذ"),
    desc: b("Self-performed delivery — no fragmented subcontractors.", "تنفيذ ذاتي — دون مقاولين من الباطن مجزّئين."),
  },
  {
    icon: "qa",
    title: b("Quality Assurance", "ضمان الجودة"),
    desc: b("Testing, verification and compliance sign-off at every stage.", "اختبار وتحقّق واعتماد امتثال في كل مرحلة."),
  },
  {
    icon: "delivery",
    title: b("Delivery", "التسليم"),
    desc: b("Commissioning, documentation and handover — ready to operate.", "تشغيل وتوثيق وتسليم — جاهز للعمل."),
  },
];

/** Company-wide credibility, reused across every service. */
const COMPANY_STATS: Stat[] = [
  { value: "17+", label: b("Years of Excellence", "عاماً من التميّز") },
  { value: "500+", label: b("Projects Delivered", "مشروع منجَز") },
  { value: "50+", label: b("Government Clients", "عميل حكومي") },
  { value: "200+", label: b("Private Clients", "عميل من القطاع الخاص") },
];

export const SERVICES: Service[] = [
  // ═══════════════════════════ SURVEY & GIS ════════════════════════════════
  {
    slug: "survey",
    category: "survey",
    icon: "survey",
    name: b("Survey, GIS & Geospatial Intelligence", "المساحة ونظم المعلومات والذكاء الجيومكاني"),
    tagline: b("Mapping the Kingdom with Millimeter Precision", "نرسم خارطة المملكة بدقّة الملّيمتر"),
    intro: b(
      "Since 2008, AFAQ has delivered topographic survey, drone mapping and enterprise GIS across the Kingdom — from remote desert terrain to dense urban corridors like KAFD and NEOM.",
      "منذ 2008، تُقدّم أفاق المسح الطبوغرافي والمسح بالطائرات المسيّرة ونظم المعلومات الجغرافية المؤسسية عبر المملكة — من الصحاري النائية إلى الممرات الحضرية الكثيفة كالميدان المالي ونيوم.",
    ),
    hero: "/images/survey.jpg",
    overview: [
      {
        icon: "what",
        title: b("What it is", "ما هي"),
        body: b(
          "End-to-end geospatial services — from field acquisition to design-ready terrain models and enterprise GIS platforms.",
          "خدمات جيومكانية شاملة — من الرصد الميداني إلى نماذج التضاريس الجاهزة للتصميم ومنصات نظم المعلومات المؤسسية.",
        ),
      },
      {
        icon: "why",
        title: b("Why it matters", "لماذا تهم"),
        body: b(
          "Every project starts with a verifiable coordinate base. Accurate spatial data prevents costly rework downstream.",
          "كل مشروع يبدأ بأساس إحداثي موثوق. البيانات المكانية الدقيقة تمنع إعادة العمل المكلفة لاحقاً.",
        ),
      },
      {
        icon: "solve",
        title: b("Problems it solves", "المشكلات التي تحلّها"),
        body: b(
          "GNSS-denied urban sites, fragmented land records, undocumented underground utilities and unreliable legacy data.",
          "المواقع الحضرية محجوبة الإشارة، وسجلات الأراضي المجزّأة، والمرافق المدفونة غير الموثّقة، والبيانات القديمة غير الموثوقة.",
        ),
      },
      {
        icon: "afaq",
        title: b("Why AFAQ", "لماذا أفاق"),
        body: b(
          "Sub-centimeter geodetic control, MOMRA-compliant deliverables and GIS platforms built to ESRI standards.",
          "تحكّم جيوديسي بدقّة أقل من سنتيمتر، ومخرجات متوافقة مع الوزارة، ومنصات نظم معلومات وفق معايير ESRI.",
        ),
      },
    ],
    capabilities: [
      { icon: "uav", title: b("UAV Surveying", "المسح بالطائرات المسيّرة"), desc: b("Aerial survey with RTK/PPK GPS.", "مسح جوي بنظام RTK/PPK.") },
      { icon: "lidar", title: b("LiDAR Survey", "المسح بالليدار"), desc: b("High-density point-cloud capture.", "التقاط سحابة نقاط عالية الكثافة.") },
      { icon: "topo", title: b("Topographic Survey", "مسح طبوغرافي"), desc: b("DTM, DSM and orthomosaics.", "نماذج تضاريس وأسطح وصور أرثو.") },
      { icon: "land", title: b("Land Survey", "مسح الأراضي"), desc: b("Cadastral and boundary survey.", "مسح مساحي وحدود الملكية.") },
      { icon: "gis", title: b("GIS Solutions", "حلول نظم المعلومات"), desc: b("Enterprise geospatial platforms.", "منصات جيومكانية مؤسسية.") },
      { icon: "gpr", title: b("Ground Penetrating Radar", "الرادار المخترق للأرض"), desc: b("Underground utility mapping.", "رسم المرافق تحت الأرض.") },
      { icon: "geodetic", title: b("Geodetic Control Networks", "شبكات التحكّم الجيوديسي"), desc: b("Sub-centimeter accuracy.", "دقّة أقل من سنتيمتر.") },
      { icon: "twin", title: b("Digital Twin Modeling", "نمذجة التوأم الرقمي"), desc: b("Reality-captured asset models.", "نماذج أصول ملتقطة من الواقع.") },
    ],
    techGroups: [
      { label: b("Positioning", "التموضع"), items: ["GNSS", "RTK", "PPK", "Total Station"] },
      { label: b("Capture", "الالتقاط"), items: ["LiDAR", "Drone Mapping", "GPR", "3D Laser Scanning"] },
      { label: b("Software & Standards", "البرمجيات والمعايير"), items: ["ESRI", "AutoCAD Civil 3D", "MOMRA", "GEOSA", "ASCE 38"] },
    ],
    industries: [
      { icon: "government", label: b("Government", "الحكومة") },
      { icon: "municipalities", label: b("Municipalities", "البلديات") },
      { icon: "utilities", label: b("Utilities", "المرافق") },
      { icon: "smartcities", label: b("Smart Cities", "المدن الذكية") },
      { icon: "mega", label: b("Mega Projects", "المشاريع العملاقة") },
      { icon: "transportation", label: b("Transportation", "النقل") },
    ],
    process: PROCESS,
    stats: [
      { value: "±2mm", label: b("GNSS Accuracy", "دقّة GNSS") },
      { value: "50K+", label: b("Km Mapped", "كيلومتر مُسِح") },
      { value: "300+", label: b("Survey Projects", "مشروع مساحة") },
      ...COMPANY_STATS.slice(0, 3),
    ],
    faqs: [
      {
        q: b("What industries benefit from survey & GIS?", "ما القطاعات المستفيدة من المساحة ونظم المعلومات؟"),
        a: b("Government, municipalities, utilities, transportation, smart cities and mega-projects — anywhere a verifiable spatial base is required.", "الحكومة والبلديات والمرافق والنقل والمدن الذكية والمشاريع العملاقة — أينما لزم أساس مكاني موثوق."),
      },
      {
        q: b("How accurate is your survey data?", "ما مدى دقّة بيانات المسح لديكم؟"),
        a: b("We establish sub-centimeter geodetic control and deliver ±2mm GNSS accuracy on controlled networks.", "نُنشئ تحكّماً جيوديسياً بدقّة أقل من سنتيمتر ونحقّق دقّة ±2مم على الشبكات المضبوطة."),
      },
      {
        q: b("Which standards do you follow?", "ما المعايير التي تتبعونها؟"),
        a: b("MOMRA specifications, GEOSA and ESRI GIS standards, with ASCE 38 for subsurface utility mapping.", "مواصفات الوزارة ومعايير الهيئة العامة للمساحة و ESRI، مع ASCE 38 لرسم المرافق تحت السطح."),
      },
      {
        q: b("Can you survey GNSS-denied urban sites?", "هل يمكنكم مسح المواقع الحضرية محجوبة الإشارة؟"),
        a: b("Yes — we combine total station and 3D laser scanning with local control networks where satellite signal is blocked.", "نعم — ندمج المحطة الشاملة والمسح الليزري ثلاثي الأبعاد مع شبكات تحكّم محلية حيث تُحجب إشارة الأقمار."),
      },
      {
        q: b("Do you map underground utilities?", "هل ترسمون المرافق تحت الأرض؟"),
        a: b("We use Ground Penetrating Radar (GPR) to locate and map buried utilities before excavation.", "نستخدم الرادار المخترق للأرض (GPR) لتحديد ورسم المرافق المدفونة قبل الحفر."),
      },
      {
        q: b("What deliverables do we receive?", "ما المخرجات التي نستلمها؟"),
        a: b("DTM/DSM, orthomosaics, point clouds, CAD/Civil 3D files and GIS-ready geodatabases.", "نماذج تضاريس وأسطح وصور أرثو وسحب نقاط وملفات كاد/سيفل 3D وقواعد بيانات جغرافية جاهزة."),
      },
    ],
  },

  // ═══════════════════════════ CIVIL & STEEL ═══════════════════════════════
  {
    slug: "civil",
    category: "civil",
    icon: "civil",
    name: b("Civil & Steel Engineering", "الهندسة المدنية والحديد"),
    tagline: b("The Physical Foundation for Digital Systems", "الأساس المادي للأنظمة الرقمية"),
    intro: b(
      "We provide the robust physical infrastructure that supports advanced digital systems — from FEA-certified steel fabrication to complex underground utilities, engineered for the toughest desert and coastal environments.",
      "نوفّر البنية التحتية المادية المتينة التي تدعم الأنظمة الرقمية المتقدمة — من تصنيع الحديد المعتمد بتحليل FEA إلى المرافق المدفونة المعقّدة، مهندَسة لأقسى بيئات الصحراء والسواحل.",
    ),
    hero: "/images/steel-fabrication.jpg",
    overview: [
      {
        icon: "what",
        title: b("What it is", "ما هي"),
        body: b("Structural steel, reinforced concrete, earthworks and underground utility construction under one contract.", "حديد إنشائي وخرسانة مسلّحة وأعمال ترابية وإنشاء مرافق مدفونة ضمن عقد واحد."),
      },
      {
        icon: "why",
        title: b("Why it matters", "لماذا تهم"),
        body: b("Digital systems are only as reliable as the steel and civil works that carry them.", "موثوقية الأنظمة الرقمية بقدر موثوقية الحديد والأعمال المدنية التي تحملها."),
      },
      {
        icon: "solve",
        title: b("Problems it solves", "المشكلات التي تحلّها"),
        body: b("Load-critical LED and ITS structures, harsh-environment corrosion, and buried duct-bank routing.", "منشآت LED والنقل الذكي حرجة الأحمال، والتآكل في البيئات القاسية، وتمديد مجاري الكابلات المدفونة."),
      },
      {
        icon: "afaq",
        title: b("Why AFAQ", "لماذا أفاق"),
        body: b("100% FEA-certified, digitally tested before build, and compliant with the Saudi Building Code.", "معتمد بتحليل FEA بنسبة 100%، ومختبَر رقمياً قبل التنفيذ، ومتوافق مع كود البناء السعودي."),
      },
    ],
    capabilities: [
      { icon: "steel", title: b("Structural Steel Fabrication", "تصنيع الحديد الإنشائي"), desc: b("LED brackets, ITS gantries & cantilevers.", "حوامل LED وبوابات النقل الذكي والكوابيل.") },
      { icon: "rcc", title: b("RCC Foundations", "أساسات خرسانية مسلّحة"), desc: b("Reinforced concrete foundations.", "أساسات خرسانية مسلّحة.") },
      { icon: "trench", title: b("Trenching & Duct Banks", "الحفر ومجاري الكابلات"), desc: b("Ducting & duct-bank construction.", "تمديد وإنشاء مجاري الكابلات.") },
      { icon: "utility", title: b("Underground Utilities", "المرافق المدفونة"), desc: b("Fiber & power installation.", "تمديد الألياف والطاقة.") },
      { icon: "earth", title: b("Site Preparation & Earthworks", "تجهيز الموقع والأعمال الترابية"), desc: b("Grading & earthworks.", "التسوية والأعمال الترابية.") },
      { icon: "corrosion", title: b("Corrosion Protection", "الحماية من التآكل"), desc: b("ISO 12944 C5-M marine grade.", "درجة بحرية ISO 12944 C5-M.") },
    ],
    techGroups: [
      { label: b("Engineering & Analysis", "الهندسة والتحليل"), items: ["FEA", "AISC 360", "SBC"] },
      { label: b("Fabrication & Welding", "التصنيع واللحام"), items: ["AWS D1.1", "EN 1090-2"] },
      { label: b("Protection", "الحماية"), items: ["ISO 1461", "Galvanizing", "ISO 12944 C5-M"] },
    ],
    industries: [
      { icon: "utilities", label: b("Utilities", "المرافق") },
      { icon: "mega", label: b("Mega Projects", "المشاريع العملاقة") },
      { icon: "transportation", label: b("Transportation", "النقل") },
      { icon: "entertainment", label: b("Entertainment", "الترفيه") },
      { icon: "government", label: b("Government", "الحكومة") },
      { icon: "defense", label: b("Defense", "الدفاع") },
    ],
    process: PROCESS,
    stats: [
      { value: "100%", label: b("FEA Certified", "معتمد بتحليل FEA") },
      { value: "200+", label: b("Structures", "منشأة") },
      { value: "20km+", label: b("Conduit", "مجارٍ") },
      ...COMPANY_STATS.slice(0, 3),
    ],
    faqs: [
      {
        q: b("Which welding and steel standards do you follow?", "ما معايير اللحام والحديد التي تتبعونها؟"),
        a: b("AWS D1.1 for welding, AISC 360 and EN 1090-2 for fabrication, and the Saudi Building Code (SBC) for design.", "AWS D1.1 للحام، و AISC 360 و EN 1090-2 للتصنيع، وكود البناء السعودي للتصميم."),
      },
      {
        q: b("How do you protect steel in harsh environments?", "كيف تحمون الحديد في البيئات القاسية؟"),
        a: b("Hot-dip galvanizing to ISO 1461 and ISO 12944 C5-M marine-grade corrosion protection.", "الجلفنة بالغمس الساخن وفق ISO 1461 وحماية بحرية من التآكل ISO 12944 C5-M."),
      },
      {
        q: b("Is your steel verified before fabrication?", "هل يُتحقّق من الحديد قبل التصنيع؟"),
        a: b("Yes — every load-critical structure is FEA-verified and digitally tested before build.", "نعم — كل منشأة حرجة الأحمال تُعتمد بتحليل FEA وتُختبر رقمياً قبل التنفيذ."),
      },
      {
        q: b("Can you deliver steel and digital systems together?", "هل يمكنكم تسليم الحديد والأنظمة الرقمية معاً؟"),
        a: b("Yes — we self-perform both the steel and the AV/ITS systems it carries, under one contract.", "نعم — ننفّذ ذاتياً الحديد وأنظمة الصوت والصورة والنقل الذكي التي يحملها، ضمن عقد واحد."),
      },
      {
        q: b("What civil works do you provide?", "ما الأعمال المدنية التي تقدّمونها؟"),
        a: b("RCC foundations, trenching, duct banks, underground fiber and power, grading and earthworks.", "أساسات خرسانية، وحفر، ومجاري كابلات، وألياف وطاقة مدفونة، وتسوية وأعمال ترابية."),
      },
      {
        q: b("What industries do you serve?", "ما القطاعات التي تخدمونها؟"),
        a: b("Utilities, transportation, entertainment, government and defense mega-projects across the Kingdom.", "المرافق والنقل والترفيه والحكومة ومشاريع الدفاع العملاقة عبر المملكة."),
      },
    ],
  },

  // ═════════════════════ INTELLIGENT TRANSPORTATION ════════════════════════
  {
    slug: "its",
    category: "its",
    icon: "its",
    name: b("Intelligent Transportation Systems", "أنظمة النقل الذكية"),
    tagline: b("Safer Roads. Smarter Traffic. Seamless Mobility", "طرق أأمن. مرور أذكى. تنقّل سلس"),
    intro: b(
      "We deliver complete ITS solutions for highways, urban corridors and border crossings — integrating enforcement cameras, variable message signs and traffic management centers into one operational platform.",
      "نُقدّم حلول نقل ذكي متكاملة للطرق السريعة والممرات الحضرية والمنافذ الحدودية — بدمج كاميرات الضبط ولوحات الرسائل المتغيّرة ومراكز إدارة الحركة في منصة تشغيلية واحدة.",
    ),
    hero: "/images/its.jpg",
    overview: [
      {
        icon: "what",
        title: b("What it is", "ما هي"),
        body: b("Field devices, gantries and control-center integration for enforcement, information and traffic management.", "أجهزة ميدانية وبوابات وتكامل مراكز تحكّم للضبط والإعلام وإدارة الحركة."),
      },
      {
        icon: "why",
        title: b("Why it matters", "لماذا تهم"),
        body: b("Smart mobility reduces congestion, improves safety and enables data-driven road operations.", "التنقّل الذكي يقلّل الازدحام ويحسّن السلامة ويتيح تشغيل الطرق المبني على البيانات."),
      },
      {
        icon: "solve",
        title: b("Problems it solves", "المشكلات التي تحلّها"),
        body: b("Incident response times, enforcement gaps, and disconnected roadside systems.", "أزمنة الاستجابة للحوادث، وثغرات الضبط، والأنظمة الطرقية غير المترابطة."),
      },
      {
        icon: "afaq",
        title: b("Why AFAQ", "لماذا أفاق"),
        body: b("NTCIP-certified integration, FEA-certified gantries and 24/7 operations & maintenance.", "تكامل معتمد NTCIP، وبوابات معتمدة بتحليل FEA، وتشغيل وصيانة على مدار الساعة."),
      },
    ],
    capabilities: [
      { icon: "anpr", title: b("ANPR Enforcement", "ضبط بتمييز اللوحات"), desc: b("Automatic number-plate recognition.", "تمييز آلي للوحات المركبات.") },
      { icon: "vms", title: b("Variable Message Signs", "لوحات الرسائل المتغيّرة"), desc: b("NTCIP-compliant VMS.", "لوحات متوافقة مع NTCIP.") },
      { icon: "radar", title: b("Traffic Radar & Incident Detection", "رادار المرور وكشف الحوادث"), desc: b("Speed radar & detection.", "رادار سرعة وكشف حوادث.") },
      { icon: "gantry", title: b("ITS Gantry Fabrication", "تصنيع بوابات النقل الذكي"), desc: b("FEA-certified gantries & erection.", "بوابات معتمدة وتركيبها.") },
      { icon: "tmc", title: b("Traffic Management Center", "مركز إدارة الحركة"), desc: b("TMC platform integration.", "تكامل منصة إدارة الحركة.") },
      { icon: "om", title: b("24/7 Operations & Maintenance", "تشغيل وصيانة على مدار الساعة"), desc: b("O&M with SLA.", "تشغيل وصيانة باتفاقية مستوى خدمة.") },
    ],
    techGroups: [
      { label: b("Detection & Enforcement", "الكشف والضبط"), items: ["ANPR", "Traffic Radar", "VMS"] },
      { label: b("Standards", "المعايير"), items: ["NTCIP", "AASHTO", "MOT", "GACA"] },
      { label: b("Operations", "التشغيل"), items: ["TMC Integration", "24/7 O&M"] },
    ],
    industries: [
      { icon: "transportation", label: b("Transportation", "النقل") },
      { icon: "smartcities", label: b("Smart Cities", "المدن الذكية") },
      { icon: "government", label: b("Government", "الحكومة") },
      { icon: "mega", label: b("Mega Projects", "المشاريع العملاقة") },
    ],
    process: PROCESS,
    stats: [
      { value: "24/7", label: b("O&M / SLA", "تشغيل وصيانة / SLA") },
      { value: "NTCIP", label: b("Certified", "معتمد") },
      { value: "MOT", label: b("Compliant", "متوافق") },
      ...COMPANY_STATS.slice(0, 3),
    ],
    faqs: [
      {
        q: b("Which ITS standards do you comply with?", "ما معايير النقل الذكي التي تلتزمون بها؟"),
        a: b("NTCIP for device communication, AASHTO, and MOT and GACA regulations.", "NTCIP لاتصال الأجهزة، و AASHTO، ولوائح وزارة النقل والطيران المدني."),
      },
      {
        q: b("Can ITS integrate with existing infrastructure?", "هل يتكامل النقل الذكي مع البنية القائمة؟"),
        a: b("Yes — we integrate enforcement, VMS and detection into a unified Traffic Management Center platform.", "نعم — ندمج الضبط ولوحات الرسائل والكشف في منصة مركز إدارة حركة موحّدة."),
      },
      {
        q: b("Do you fabricate the gantries too?", "هل تصنّعون البوابات أيضاً؟"),
        a: b("Yes — ITS gantries are FEA-certified, fabricated and erected in-house.", "نعم — بوابات النقل الذكي معتمدة بتحليل FEA وتُصنّع وتُركّب داخلياً."),
      },
      {
        q: b("Do you provide ongoing operations & maintenance?", "هل تقدّمون تشغيلاً وصيانة مستمرة؟"),
        a: b("We provide 24/7 operations and maintenance under service-level agreements.", "نقدّم تشغيلاً وصيانة على مدار الساعة وفق اتفاقيات مستوى الخدمة."),
      },
      {
        q: b("Where can ITS be deployed?", "أين يمكن نشر النقل الذكي؟"),
        a: b("Highways, urban corridors and border crossings — anywhere traffic needs monitoring and management.", "الطرق السريعة والممرات الحضرية والمنافذ الحدودية — أينما لزمت مراقبة الحركة وإدارتها."),
      },
    ],
  },

  // ═══════════════════ AV INTEGRATION & DIGITAL INFRA ══════════════════════
  {
    slug: "av",
    category: "av",
    icon: "av",
    name: b("AV Integration & Digital Infrastructure", "تكامل الصوت والصورة والبنية الرقمية"),
    tagline: b("Command Centers. Immersive Experiences. Connected Buildings", "مراكز قيادة. تجارب غامرة. مبانٍ متصلة"),
    intro: b(
      "We design and deploy enterprise-grade AV systems and digital infrastructure — from NOC/SOC command centers to dvLED immersive environments — using the world's leading AV-over-IP technologies.",
      "نصمّم وننفّذ أنظمة صوت وصورة وبنية رقمية بمستوى مؤسسي — من مراكز القيادة NOC/SOC إلى بيئات dvLED الغامرة — باستخدام أبرز تقنيات الصوت والصورة عبر الشبكة عالمياً.",
    ),
    hero: "/images/av-led.jpg",
    overview: [
      {
        icon: "what",
        title: b("What it is", "ما هي"),
        body: b("Command centers, video walls, AV-over-IP networks and structured cabling — designed, built and commissioned.", "مراكز قيادة وجدران عرض وشبكات صوت وصورة وكابلات مهيكلة — تصميماً وتنفيذاً وتشغيلاً."),
      },
      {
        icon: "why",
        title: b("Why it matters", "لماذا تهم"),
        body: b("Mission-critical operations depend on clear, reliable, always-on visualization and communication.", "العمليات حسّاسة المهام تعتمد على تصوّر وتواصل واضح وموثوق ودائم التشغيل."),
      },
      {
        icon: "solve",
        title: b("Problems it solves", "المشكلات التي تحلّها"),
        body: b("Fragmented control rooms, latency-sensitive distribution, and secure cabling in classified zones.", "غرف التحكّم المجزّأة، والتوزيع الحسّاس للكمون، والكابلات الآمنة في المناطق المصنّفة."),
      },
      {
        icon: "afaq",
        title: b("Why AFAQ", "لماذا أفاق"),
        body: b("SDVoE-certified, AVIXA-aligned, and delivered with the steel and civil works under one roof.", "معتمد SDVoE، ومتوائم مع AVIXA، ويُسلّم مع الحديد والأعمال المدنية تحت سقف واحد."),
      },
    ],
    capabilities: [
      { icon: "noc", title: b("NOC/SOC Command Centers", "مراكز القيادة NOC/SOC"), desc: b("Design & build of control centers.", "تصميم وبناء مراكز التحكّم.") },
      { icon: "dvled", title: b("dvLED Video Walls", "جدران عرض dvLED"), desc: b("Video walls & projection mapping.", "جدران عرض وإسقاط ضوئي.") },
      { icon: "avip", title: b("AV-over-IP", "الصوت والصورة عبر الشبكة"), desc: b("SDVoE & Dante networks.", "شبكات SDVoE و Dante.") },
      { icon: "cabling", title: b("Structured Cabling", "الكابلات المهيكلة"), desc: b("Cat6A / fiber & rack integration.", "Cat6A / ألياف وتكامل الخزائن.") },
      { icon: "videowall", title: b("Video-Wall Control", "التحكّم بجدار العرض"), desc: b("Controllers & display management.", "متحكّمات وإدارة العرض.") },
      { icon: "uc", title: b("Unified Communications", "الاتصالات الموحّدة"), desc: b("Collaboration & UC systems.", "أنظمة تعاون واتصالات موحّدة.") },
    ],
    techGroups: [
      { label: b("AV-over-IP", "الصوت والصورة عبر الشبكة"), items: ["SDVoE", "Dante"] },
      { label: b("Display", "العرض"), items: ["dvLED", "Projection Mapping"] },
      { label: b("Network & Cabling", "الشبكة والكابلات"), items: ["Cat6A", "Fiber Optics"] },
      { label: b("Standards & Brands", "المعايير والعلامات"), items: ["AVIXA", "Crestron"] },
    ],
    industries: [
      { icon: "defense", label: b("Defense", "الدفاع") },
      { icon: "government", label: b("Government", "الحكومة") },
      { icon: "entertainment", label: b("Entertainment", "الترفيه") },
      { icon: "utilities", label: b("Utilities", "المرافق") },
      { icon: "smartcities", label: b("Smart Cities", "المدن الذكية") },
      { icon: "mega", label: b("Mega Projects", "المشاريع العملاقة") },
    ],
    process: PROCESS,
    stats: [
      { value: "70+", label: b("Control Rooms", "غرفة تحكّم") },
      { value: "0.7mm", label: b("Fine Pitch", "دقّة البكسل") },
      { value: "SDVoE", label: b("Certified", "معتمد") },
      ...COMPANY_STATS.slice(0, 3),
    ],
    faqs: [
      {
        q: b("Which AV standards and protocols do you use?", "ما معايير وبروتوكولات الصوت والصورة لديكم؟"),
        a: b("AV-over-IP via SDVoE and Dante, aligned to AVIXA standards, with Crestron control.", "الصوت والصورة عبر الشبكة بـ SDVoE و Dante، متوائم مع معايير AVIXA، مع تحكّم Crestron."),
      },
      {
        q: b("Can you build secure command centers?", "هل يمكنكم بناء مراكز قيادة آمنة؟"),
        a: b("Yes — NOC/SOC centers with secure Cat6A and fiber cabling, including classified-zone installations.", "نعم — مراكز NOC/SOC بكابلات Cat6A وألياف آمنة، تشمل التركيب في المناطق المصنّفة."),
      },
      {
        q: b("Do you supply the steel for video walls too?", "هل توفّرون الحديد لجدران العرض أيضاً؟"),
        a: b("Yes — we deliver the FEA-certified steel sub-frames and the dvLED systems together, under one contract.", "نعم — نسلّم الهياكل الحديدية المعتمدة وأنظمة dvLED معاً، ضمن عقد واحد."),
      },
      {
        q: b("How fine is your LED pixel pitch?", "ما دقّة بكسل شاشات LED لديكم؟"),
        a: b("Down to 0.7mm fine-pitch for high-resolution control-room and immersive displays.", "حتى دقّة 0.7مم للشاشات عالية الوضوح في غرف التحكّم والبيئات الغامرة."),
      },
      {
        q: b("Can AV integrate with existing infrastructure?", "هل يتكامل الصوت والصورة مع البنية القائمة؟"),
        a: b("Yes — AV-over-IP distributes over standard IP networks and integrates with existing displays and rooms.", "نعم — الصوت والصورة عبر الشبكة يوزَّع على شبكات IP القياسية ويتكامل مع الشاشات والغرف القائمة."),
      },
    ],
  },
];

/* ── Lookups + derived relationships ─────────────────────────────────────── */

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Case studies related to a service — by primary category or related-service tag. */
export function caseStudiesForService(cat: Category): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.category === cat || c.relatedServiceKeys.includes(cat));
}

/** The single highlighted case study for a service (prefer a featured one). */
export function featuredCaseStudyForService(cat: Category): CaseStudy | undefined {
  const list = caseStudiesForService(cat);
  return list.find((c) => c.featured) ?? list[0];
}

/** A normalized card for the Related Projects grid. */
export interface WorkCard {
  title: B;
  industry: B;
  location: B;
  teaser: B;
  tech: string[];
  image: string;
  href: string;
  category: Category;
}

/**
 * Related work for a service — real case studies first (they have detail pages),
 * then representative projects of the same discipline to fill out the grid so
 * every service (including ITS) shows proof of expertise.
 */
export function relatedWorkForService(cat: Category, excludeSlug?: string): WorkCard[] {
  const fromCases: WorkCard[] = caseStudiesForService(cat)
    .filter((c) => c.slug !== excludeSlug)
    .map((c) => ({
      title: c.name,
      industry: c.industry ?? { en: "", ar: "" },
      location: c.location,
      teaser: c.teaser,
      tech: (c.technologies ?? c.services).slice(0, 4).map((x) => x.en),
      image: c.hero,
      href: `/case-studies/${c.slug}`,
      category: c.category,
    }));

  if (fromCases.length >= 3) return fromCases.slice(0, 6);

  // Fill from the representative project register (links to the archive).
  const fill: WorkCard[] = PROJECTS.filter((p) => p.category === cat)
    .slice(0, 6 - fromCases.length)
    .map((p) => ({
      title: p.name,
      industry: { en: "", ar: "" },
      location: p.city,
      teaser: p.scope,
      tech: p.technical.en.replace(/·/g, ",").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4),
      image: imageSrc(projectImage(p.category, p.id)),
      href: "/projects",
      category: p.category,
    }));

  return [...fromCases, ...fill].slice(0, 6);
}
