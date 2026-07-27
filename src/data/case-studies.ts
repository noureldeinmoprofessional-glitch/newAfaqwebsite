/**
 * CASE STUDY REGISTER — extracted from the AFAQ Systems Company Profile 2026.
 *
 * Every project the profile presents becomes an individual case study. The five
 * labelled case-study pages (KAFD, SWCC, VOV Riyadh Front, SEC control rooms,
 * Al Shabab Stadium) carry the full narrative — challenge, phased solution,
 * metrics, gallery. The remaining flagship engagements from the "Landmark
 * Projects" and "Project Portfolio" pages are lighter records: everything the
 * document actually states, and nothing it does not.
 *
 * Content-accuracy rules (see brief): project names are preserved as written,
 * no metrics or years are invented, and sections with no source data are simply
 * omitted so the detail template hides them gracefully.
 *
 * Free text carries both locales so the archive reads natively under /en and /ar.
 * Hero photography for the five labelled studies is lifted from the profile
 * pages (public/images/case-studies/*); portfolio records reuse the on-brand
 * engineering image set.
 */

import type { Category } from "./projects";

interface B {
  en: string;
  ar: string;
}
const b = (en: string, ar: string): B => ({ en, ar });

/** A measurable figure. `value` renders dir="ltr" (numerals/units). */
export interface Metric {
  value: string;
  label: B;
}

/** One step on the solution timeline. */
export interface Phase {
  title: B;
  body: B;
}

/** One scope-of-work entry (elegant spec card). */
export interface ScopeItem {
  title: B;
  body: B;
}

export interface Highlight {
  title: B;
  body?: B;
}

export interface CaseStudy {
  slug: string;
  /** Labelled, fully-documented case study vs. portfolio-level engagement. */
  featured: boolean;
  name: B;
  /** Optional headline/kicker shown under the name in the hero. */
  tagline?: B;
  teaser: B;
  category: Category;
  location: B;
  /** Owning entity / client. */
  client: B;
  projectType?: B;
  industry?: B;
  /** Engineering services delivered (chips). */
  services: B[];
  /** Which service disciplines this touched — links to /services. */
  relatedServiceKeys: Category[];
  hero: string;
  overview: B;
  challenge?: B[];
  solutionPhases?: Phase[];
  scope?: ScopeItem[];
  highlights?: Highlight[];
  metrics?: Metric[];
  technologies?: B[];
  deliverables?: B[];
  gallery?: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  // ═══════════════════════ FEATURED CASE STUDIES ═══════════════════════════
  {
    slug: "kafd",
    featured: true,
    name: b("KAFD", "الميدان المالي (كافد)"),
    tagline: b("Precision Under Pressure", "دقّة تحت الضغط"),
    teaser: b(
      "High-precision topographic survey across 20+ sites in one of Riyadh's most challenging urban environments — delivered in under three months.",
      "مسح طبوغرافي عالي الدقة عبر أكثر من 20 موقعاً في واحدة من أصعب البيئات الحضرية في الرياض — منجَز في أقل من ثلاثة أشهر.",
    ),
    category: "survey",
    location: b("King Abdullah Financial District, Riyadh", "الميدان المالي للملك عبدالله، الرياض"),
    client: b("King Abdullah Financial District (KAFD)", "الميدان المالي للملك عبدالله (كافد)"),
    projectType: b("Survey & Topographic", "مساحة وطبوغرافيا"),
    industry: b("Mega-Infrastructure", "بنية تحتية كبرى"),
    services: [
      b("Topographic Survey", "مسح طبوغرافي"),
      b("3D Laser Scanning", "مسح ليزري ثلاثي الأبعاد"),
      b("Geodetic Control", "تحكّم جيوديسي"),
      b("GIS", "نظم معلومات جغرافية"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/case-studies/kafd.jpg",
    overview: b(
      "In one of Riyadh's most challenging urban environments, AFAQ delivered a high-precision topographic survey across 20+ sites in under three months. With high-rise structures blocking GNSS signals and a compressed schedule, we deployed total station and 3D laser scanning as primary methods, established a local control network, and fused multi-source data into design-ready terrain models — delivered on time, with zero delays to the design phase.",
      "في واحدة من أصعب البيئات الحضرية في الرياض، نفّذت أفاق مسحاً طبوغرافياً عالي الدقة عبر أكثر من 20 موقعاً في أقل من ثلاثة أشهر. ومع حجب الأبراج المرتفعة لإشارات الأقمار وضيق الجدول الزمني، اعتمدنا المحطة الشاملة والمسح الليزري ثلاثي الأبعاد كوسائل رئيسية، وأنشأنا شبكة تحكّم محلية، ودمجنا بيانات متعددة المصادر في نماذج تضاريس جاهزة للتصميم — سُلّمت في موعدها ودون أي تأخير على مرحلة التصميم.",
    ),
    challenge: [
      b(
        "Dense high-rise development blocked GNSS satellite signals across the district, ruling out conventional GPS-only survey methods.",
        "حجبت الأبراج المرتفعة الكثيفة إشارات الأقمار عبر الحي، ما استبعد أساليب المسح المعتمدة على نظام تحديد المواقع وحده.",
      ),
      b(
        "A compressed schedule required more than 20 sites to be surveyed and delivered without delaying the design phase.",
        "تطلّب الجدول الزمني الضاغط مسح أكثر من 20 موقعاً وتسليمها دون تأخير مرحلة التصميم.",
      ),
    ],
    solutionPhases: [
      {
        title: b("Local Control Network", "شبكة تحكّم محلية"),
        body: b(
          "Established a local geodetic control network to overcome GNSS signal obstruction between the towers.",
          "أنشأنا شبكة تحكّم جيوديسي محلية لتجاوز حجب إشارات الأقمار بين الأبراج.",
        ),
      },
      {
        title: b("Survey & Data Collection", "المسح وجمع البيانات"),
        body: b(
          "Deployed total station (1″) and 3D laser scanning as primary methods across all 20+ sites.",
          "استخدمنا المحطة الشاملة (1″) والمسح الليزري ثلاثي الأبعاد كوسائل رئيسية عبر جميع المواقع الـ20+.",
        ),
      },
      {
        title: b("Data Fusion & Modelling", "دمج البيانات والنمذجة"),
        body: b(
          "Fused multi-source measurements into design-ready terrain models in AutoCAD Civil 3D and GIS.",
          "دمجنا القياسات متعددة المصادر في نماذج تضاريس جاهزة للتصميم عبر أوتوكاد سيفل 3D ونظم المعلومات الجغرافية.",
        ),
      },
      {
        title: b("On-Time Delivery", "تسليم في الموعد"),
        body: b(
          "Handed over on schedule with zero delays to the client's design phase.",
          "سُلّم في موعده المحدد دون أي تأخير على مرحلة تصميم العميل.",
        ),
      },
    ],
    scope: [
      {
        title: b("Topographic Survey", "مسح طبوغرافي"),
        body: b("Full topographic survey across 20+ urban sites.", "مسح طبوغرافي كامل عبر أكثر من 20 موقعاً حضرياً."),
      },
      {
        title: b("3D Laser Scanning", "مسح ليزري ثلاثي الأبعاد"),
        body: b("High-density point-cloud capture in GNSS-denied conditions.", "التقاط سحابة نقاط عالية الكثافة في ظروف انعدام إشارة الأقمار."),
      },
      {
        title: b("Geodetic Control Network", "شبكة تحكّم جيوديسي"),
        body: b("Local control framework as the coordinate base for the district.", "إطار تحكّم محلي كأساس إحداثي للحي."),
      },
      {
        title: b("Design-Ready Terrain Models", "نماذج تضاريس جاهزة للتصميم"),
        body: b("Multi-source data fused into models for the design teams.", "بيانات متعددة المصادر مدمجة في نماذج لفِرق التصميم."),
      },
    ],
    highlights: [
      { title: b("Precision under GNSS-denial", "دقّة رغم انعدام إشارة الأقمار") },
      { title: b("Fast-track delivery", "تسليم على المسار السريع") },
      { title: b("Zero delays to design", "صفر تأخير على التصميم") },
      { title: b("Multi-source data fusion", "دمج بيانات متعددة المصادر") },
    ],
    metrics: [
      { value: "20+", label: b("Sites Surveyed", "موقعاً مُسِح") },
      { value: "3 Months", label: b("Time-Frame", "الإطار الزمني") },
      { value: "Sub-cm", label: b("Survey Accuracy", "دقّة المسح") },
    ],
    technologies: [
      b("Total Station (1″)", "محطة شاملة (1″)"),
      b("3D Laser Scanning", "مسح ليزري ثلاثي الأبعاد"),
      b("GPS/GNSS", "GPS/GNSS"),
      b("AutoCAD Civil 3D", "أوتوكاد سيفل 3D"),
      b("GIS", "نظم معلومات جغرافية"),
    ],
    deliverables: [
      b("Design-ready terrain models", "نماذج تضاريس جاهزة للتصميم"),
      b("AutoCAD Civil 3D deliverables", "مخرجات أوتوكاد سيفل 3D"),
      b("GIS dataset", "مجموعة بيانات نظم المعلومات الجغرافية"),
    ],
    gallery: [
      "/images/case-studies/kafd.jpg",
      "/images/riyadh-skyline.jpg",
      "/images/drone-survey.jpg",
      "/images/gis-mapping.jpg",
    ],
  },

  {
    slug: "swcc",
    featured: true,
    name: b("SWCC Asset Intelligence Program", "برنامج ذكاء الأصول لهيئة تحلية المياه"),
    teaser: b(
      "Turning fragmented land records and disconnected asset data into one centralized, reliable GIS platform for SWCC.",
      "تحويل سجلات الأراضي المجزّأة وبيانات الأصول المتفرّقة إلى منصة نظم معلومات جغرافية مركزية وموثوقة لهيئة تحلية المياه.",
    ),
    category: "survey",
    location: b("Kingdom of Saudi Arabia", "المملكة العربية السعودية"),
    client: b("Saline Water Conversion Corporation (SWCC)", "المؤسسة العامة لتحلية المياه المالحة"),
    projectType: b("Surveying & GIS", "مساحة ونظم معلومات جغرافية"),
    industry: b("Energy & Utilities", "الطاقة والمرافق"),
    services: [
      b("Field Survey", "مسح ميداني"),
      b("GIS Inventory", "جرد بنظم المعلومات"),
      b("Document Digitization", "رقمنة الوثائق"),
      b("Ownership Verification", "توثيق الملكية"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/case-studies/swcc.jpg",
    overview: b(
      "AFAQ transformed fragmented land records and disconnected asset data into a centralized GIS-based platform for SWCC. Through field surveys, spatial analysis, document digitization, and ownership verification, the team validated land information, reconstructed missing coordinates, and established a reliable geospatial database that improved accessibility, accuracy, and decision-making across the organization.",
      "حوّلت أفاق سجلات الأراضي المجزّأة وبيانات الأصول المتفرّقة إلى منصة مركزية قائمة على نظم المعلومات الجغرافية لهيئة تحلية المياه. ومن خلال المسوحات الميدانية والتحليل المكاني ورقمنة الوثائق وتوثيق الملكية، تحقّق الفريق من معلومات الأراضي، وأعاد بناء الإحداثيات المفقودة، وأسّس قاعدة بيانات جغرافية موثوقة حسّنت إمكانية الوصول والدقّة واتخاذ القرار عبر المؤسسة.",
    ),
    challenge: [
      b(
        "Land records were fragmented and asset data disconnected, with missing coordinates undermining reliable decision-making.",
        "كانت سجلات الأراضي مجزّأة وبيانات الأصول متفرّقة، مع إحداثيات مفقودة أضعفت موثوقية اتخاذ القرار.",
      ),
    ],
    solutionPhases: [
      {
        title: b("Field Survey", "المسح الميداني"),
        body: b("Field surveys to validate land information on the ground.", "مسوحات ميدانية للتحقق من معلومات الأراضي على الأرض."),
      },
      {
        title: b("Spatial Analysis", "التحليل المكاني"),
        body: b("Reconstructed missing coordinates through spatial analysis.", "إعادة بناء الإحداثيات المفقودة عبر التحليل المكاني."),
      },
      {
        title: b("Document Digitization", "رقمنة الوثائق"),
        body: b("Digitized 120,000 documents into a searchable archive.", "رقمنة 120,000 وثيقة في أرشيف قابل للبحث."),
      },
      {
        title: b("Ownership Verification", "توثيق الملكية"),
        body: b("Verified ownership and organized records into the geodatabase.", "توثيق الملكية وتنظيم السجلات في قاعدة البيانات الجغرافية."),
      },
    ],
    scope: [
      {
        title: b("Field Surveys", "المسوحات الميدانية"),
        body: b("Ground validation of land and asset information.", "التحقق الميداني من معلومات الأراضي والأصول."),
      },
      {
        title: b("Spatial Analysis", "التحليل المكاني"),
        body: b("Reconstruction of missing coordinates and geometry.", "إعادة بناء الإحداثيات والأشكال الهندسية المفقودة."),
      },
      {
        title: b("Document Digitization", "رقمنة الوثائق"),
        body: b("Large-scale digitization of legacy records.", "رقمنة واسعة النطاق للسجلات القديمة."),
      },
      {
        title: b("Geospatial Database", "قاعدة بيانات جغرافية"),
        body: b("Centralized, reliable GIS platform for the organization.", "منصة نظم معلومات جغرافية مركزية وموثوقة للمؤسسة."),
      },
    ],
    highlights: [
      { title: b("Centralized GIS platform", "منصة نظم معلومات مركزية") },
      { title: b("Validated land information", "معلومات أراضٍ موثّقة") },
      { title: b("Reconstructed missing coordinates", "إحداثيات مفقودة أُعيد بناؤها") },
      { title: b("Improved decision-making", "تحسين اتخاذ القرار") },
    ],
    metrics: [
      { value: "1,000", label: b("Assets Managed", "أصل تمّت إدارته") },
      { value: "120,000", label: b("Documents Digitized", "وثيقة مرقمنة") },
      { value: "1,500+", label: b("Records Organized", "سجل مُنظّم") },
      { value: "1,080+", label: b("Land Parcels Surveyed", "قطعة أرض مُسِحت") },
    ],
    technologies: [
      b("Total Station (1″)", "محطة شاملة (1″)"),
      b("Digital Level", "ميزان رقمي"),
      b("GPS/GNSS", "GPS/GNSS"),
      b("AutoCAD Civil 3D", "أوتوكاد سيفل 3D"),
      b("GIS", "نظم معلومات جغرافية"),
    ],
    deliverables: [
      b("Centralized geospatial database", "قاعدة بيانات جغرافية مركزية"),
      b("Digitized document archive", "أرشيف وثائق مرقمن"),
      b("Verified ownership records", "سجلات ملكية موثّقة"),
    ],
    gallery: [
      "/images/case-studies/swcc.jpg",
      "/images/water-infrastructure.jpg",
      "/images/gis-mapping.jpg",
      "/images/engineers-site.jpg",
    ],
  },

  {
    slug: "vov-riyadh-front",
    featured: true,
    name: b("PIF VOV E-Gaming — Riyadh Front", "منصة VOV للألعاب الإلكترونية — واجهة الرياض"),
    tagline: b("550m² turnkey media façade · single-source EPC", "واجهة إعلامية متكاملة 550م² · عقد هندسة وتوريد وتنفيذ من مصدر واحد"),
    teaser: b(
      "A complete turnkey LED media façade for one of the Kingdom's most dynamic e-gaming venues — engineered, fabricated and integrated under a single EPC contract.",
      "واجهة إعلامية LED متكاملة لواحدة من أبرز وجهات الألعاب الإلكترونية في المملكة — هندسة وتصنيع وتكامل ضمن عقد EPC واحد.",
    ),
    category: "av",
    location: b("Riyadh Front Mall, Riyadh", "واجهة الرياض مول، الرياض"),
    client: b("PIF / SAVVY", "صندوق الاستثمارات العامة / سافي"),
    projectType: b("AV Integration & Steel", "تكامل صوتي بصري وحديد إنشائي"),
    industry: b("Entertainment & Mega Events", "الترفيه والفعاليات الكبرى"),
    services: [
      b("dvLED Media Façade", "واجهة إعلامية dvLED"),
      b("Structural Steel Sub-frames", "هياكل حديدية داعمة"),
      b("Data & Power Distribution", "توزيع البيانات والطاقة"),
      b("Content Control", "التحكّم بالمحتوى"),
    ],
    relatedServiceKeys: ["av", "civil"],
    hero: "/images/case-studies/vov-riyadh-front.jpg",
    overview: b(
      "At Riyadh Front Mall, AFAQ delivered a complete turnkey media façade for VOV Gaming — one of the Kingdom's most dynamic e-gaming venues. Under a single-source EPC contract we engineered, fabricated and integrated 550m² of high-resolution LED panels across the building façade, with custom structural steel sub-frames designed to the Saudi Building Code, certified load analysis, and full data/power distribution — from pixel to steel, to client handover.",
      "في واجهة الرياض مول، نفّذت أفاق واجهة إعلامية متكاملة لمنصة VOV للألعاب — واحدة من أبرز وجهات الألعاب الإلكترونية في المملكة. وضمن عقد EPC من مصدر واحد، قمنا بهندسة وتصنيع وتكامل 550م² من ألواح LED عالية الدقة عبر واجهة المبنى، مع هياكل حديدية داعمة مصمّمة وفق كود البناء السعودي وتحليل أحمال معتمد وتوزيع كامل للبيانات والطاقة — من البكسل إلى الحديد وحتى التسليم للعميل.",
    ),
    challenge: [
      b(
        "A building-scale media façade demanded custom structural steel sub-frames designed to the Saudi Building Code with certified load analysis.",
        "تطلّبت واجهة إعلامية بحجم المبنى هياكل حديدية داعمة مصمّمة وفق كود البناء السعودي مع تحليل أحمال معتمد.",
      ),
      b(
        "A single-source EPC contract placed engineering, fabrication, integration and handover under one line of accountability.",
        "وضع عقد EPC من مصدر واحد الهندسة والتصنيع والتكامل والتسليم تحت خط مسؤولية واحد.",
      ),
    ],
    solutionPhases: [
      {
        title: b("Engineering & Load Analysis", "الهندسة وتحليل الأحمال"),
        body: b("Certified load analysis and steel design to the Saudi Building Code.", "تحليل أحمال معتمد وتصميم حديد وفق كود البناء السعودي."),
      },
      {
        title: b("Steel Fabrication", "تصنيع الحديد"),
        body: b("Custom structural steel sub-frames fabricated to tolerance.", "هياكل حديدية داعمة مصنّعة ضمن حدود التفاوت."),
      },
      {
        title: b("LED Integration", "تكامل شاشات LED"),
        body: b("550m² of high-resolution LED panels integrated across the façade.", "تكامل 550م² من ألواح LED عالية الدقة عبر الواجهة."),
      },
      {
        title: b("Distribution & Handover", "التوزيع والتسليم"),
        body: b("Full data and power distribution, commissioned to client handover.", "توزيع كامل للبيانات والطاقة، وتشغيل حتى التسليم للعميل."),
      },
    ],
    scope: [
      {
        title: b("Media Façade Engineering", "هندسة الواجهة الإعلامية"),
        body: b("End-to-end engineering of the LED façade system.", "هندسة شاملة لنظام واجهة LED."),
      },
      {
        title: b("Steel Sub-frame Fabrication", "تصنيع الهياكل الحديدية"),
        body: b("Custom sub-frames to the Saudi Building Code.", "هياكل داعمة مخصّصة وفق كود البناء السعودي."),
      },
      {
        title: b("LED Panel Integration", "تكامل ألواح LED"),
        body: b("550m² of high-resolution panels across the building.", "550م² من الألواح عالية الدقة عبر المبنى."),
      },
      {
        title: b("Data & Power Distribution", "توزيع البيانات والطاقة"),
        body: b("Full distribution with content control.", "توزيع كامل مع التحكّم بالمحتوى."),
      },
    ],
    highlights: [
      { title: b("Single-source EPC", "عقد EPC من مصدر واحد") },
      { title: b("SBC-certified steel", "حديد معتمد وفق كود البناء") },
      { title: b("High-resolution façade", "واجهة عالية الدقة") },
      { title: b("Pixel-to-steel integration", "تكامل من البكسل إلى الحديد") },
    ],
    metrics: [
      { value: "550m²", label: b("LED Façade", "واجهة LED") },
      { value: ">2mm", label: b("Steel Tolerance", "حدّ تفاوت الحديد") },
      { value: "1", label: b("EPC Contract", "عقد EPC") },
      { value: "SBC", label: b("Certified Steel", "حديد معتمد") },
    ],
    technologies: [
      b("dvLED", "dvLED"),
      b("Structural steel sub-frames", "هياكل حديدية داعمة"),
      b("Data & power distribution", "توزيع البيانات والطاقة"),
      b("Content control system", "نظام التحكّم بالمحتوى"),
    ],
    deliverables: [
      b("Turnkey media façade", "واجهة إعلامية متكاملة"),
      b("Certified steel structure", "هيكل حديدي معتمد"),
      b("Content & control system", "نظام محتوى وتحكّم"),
    ],
    gallery: [
      "/images/case-studies/vov-riyadh-front.jpg",
      "/images/av-led.jpg",
      "/images/steel-fabrication.jpg",
      "/images/integrated-smartcity.jpg",
    ],
  },

  {
    slug: "sec-control-rooms",
    featured: true,
    name: b("Saudi Energy — 30+ NOC/SOC Centers", "السعودية للكهرباء — أكثر من 30 مركز تحكّم"),
    tagline: b("Where pixels meet steel — engineered as one", "حيث يلتقي البكسل بالحديد — بهندسة واحدة"),
    teaser: b(
      "Across 30+ SEC main control rooms nationwide, AFAQ delivered the video walls and the steel that holds them — as one mission-critical system.",
      "عبر أكثر من 30 غرفة تحكّم رئيسية للسعودية للكهرباء على مستوى المملكة، سلّمت أفاق جدران العرض والحديد الحامل لها — كنظام واحد حسّاس المهام.",
    ),
    category: "av",
    location: b("Nationwide (SEC control rooms)", "على مستوى المملكة (غرف تحكّم السعودية للكهرباء)"),
    client: b("Saudi Electricity Company (SEC)", "الشركة السعودية للكهرباء"),
    projectType: b("Steel Structures & AV", "هياكل حديدية وأنظمة صوتية بصرية"),
    industry: b("Energy & Utilities", "الطاقة والمرافق"),
    services: [
      b("NOC/SOC Steel & Civil", "حديد ومدني لمراكز NOC/SOC"),
      b("dvLED Video Walls", "جدران عرض dvLED"),
      b("SDVoE AV-over-IP", "SDVoE عبر الشبكة"),
      b("Secure Structured Cabling", "كابلات مهيكلة آمنة"),
    ],
    relatedServiceKeys: ["av", "civil"],
    hero: "/images/case-studies/sec-control-rooms.jpg",
    overview: b(
      "For mission-critical control rooms, the display is only half the story; the other half is the steel that holds it. AFAQ delivers both under one roof. Across 30+ SEC main control rooms nationwide we engineered FEA-certified, micro-adjustable steel sub-frames, integrated large-format dvLED video walls with SDVoE AV-over-IP distribution and installed secure Cat6A & fiber cabling in classified zones — fully commissioned and security-handover ready.",
      "في غرف التحكّم حسّاسة المهام، تمثّل الشاشة نصف القصة فقط؛ والنصف الآخر هو الحديد الذي يحملها. وتسلّم أفاق كليهما تحت سقف واحد. عبر أكثر من 30 غرفة تحكّم رئيسية للسعودية للكهرباء على مستوى المملكة، صمّمنا هياكل حديدية معتمدة بتحليل FEA قابلة للضبط الدقيق، ودمجنا جدران عرض dvLED كبيرة الحجم مع توزيع SDVoE عبر الشبكة، وركّبنا كابلات Cat6A وألياف آمنة في مناطق مصنّفة — بتشغيل كامل وجاهزية للتسليم الأمني.",
    ),
    challenge: [
      b(
        "Mission-critical control rooms needed both the dvLED display and its supporting steel delivered as one accountable system.",
        "احتاجت غرف التحكّم حسّاسة المهام إلى تسليم شاشة dvLED والحديد الحامل لها كنظام واحد ذي مسؤولية موحّدة.",
      ),
      b(
        "Secure cabling had to be installed within classified zones with zero downtime tolerance.",
        "تعيّن تركيب الكابلات الآمنة داخل مناطق مصنّفة مع عدم السماح بأي توقّف.",
      ),
    ],
    solutionPhases: [
      {
        title: b("FEA-Certified Steel", "حديد معتمد بتحليل FEA"),
        body: b("Micro-adjustable steel sub-frames, FEA-verified before build.", "هياكل حديدية قابلة للضبط الدقيق، معتمدة بتحليل FEA قبل التنفيذ."),
      },
      {
        title: b("dvLED Video Walls", "جدران عرض dvLED"),
        body: b("Large-format dvLED video walls integrated into each room.", "جدران عرض dvLED كبيرة الحجم مدمجة في كل غرفة."),
      },
      {
        title: b("AV-over-IP Distribution", "التوزيع عبر الشبكة"),
        body: b("SDVoE AV-over-IP distribution across the control estate.", "توزيع SDVoE عبر الشبكة على منظومة غرف التحكّم."),
      },
      {
        title: b("Secure Cabling & Handover", "الكابلات الآمنة والتسليم"),
        body: b("Cat6A & fiber in classified zones, commissioned and security-handover ready.", "كابلات Cat6A وألياف في مناطق مصنّفة، بتشغيل وجاهزية للتسليم الأمني."),
      },
    ],
    scope: [
      {
        title: b("NOC/SOC Steel & Civil", "حديد ومدني لمراكز NOC/SOC"),
        body: b("Micro-adjustable, FEA-certified steel sub-frames.", "هياكل حديدية معتمدة بتحليل FEA وقابلة للضبط الدقيق."),
      },
      {
        title: b("dvLED Video Walls", "جدران عرض dvLED"),
        body: b("Large-format video walls integrated per room.", "جدران عرض كبيرة الحجم مدمجة لكل غرفة."),
      },
      {
        title: b("SDVoE AV-over-IP", "SDVoE عبر الشبكة"),
        body: b("Distribution backbone across all centers.", "شبكة توزيع أساسية عبر جميع المراكز."),
      },
      {
        title: b("Secure Structured Cabling", "كابلات مهيكلة آمنة"),
        body: b("Cat6A & fiber cabling in classified zones.", "كابلات Cat6A وألياف في مناطق مصنّفة."),
      },
    ],
    highlights: [
      { title: b("Single-source steel + AV", "حديد وأنظمة صوتية بصرية من مصدر واحد") },
      { title: b("FEA-certified sub-frames", "هياكل معتمدة بتحليل FEA") },
      { title: b("Classified-zone cabling", "كابلات في مناطق مصنّفة") },
      { title: b("Security-handover ready", "جاهزية للتسليم الأمني") },
    ],
    metrics: [
      { value: "30+", label: b("Control Rooms", "غرفة تحكّم") },
      { value: "dvLED", label: b("Video Walls", "جدران عرض") },
      { value: "Zero", label: b("Downtime Tolerance", "تحمّل التوقّف") },
    ],
    technologies: [
      b("dvLED", "dvLED"),
      b("SDVoE AV-over-IP", "SDVoE عبر الشبكة"),
      b("NOC/SOC steel & civil", "حديد ومدني لمراكز NOC/SOC"),
      b("Cat6A & fiber cabling", "كابلات Cat6A وألياف"),
    ],
    deliverables: [
      b("Commissioned control rooms", "غرف تحكّم مشغّلة"),
      b("Integrated video walls", "جدران عرض مدمجة"),
      b("Secure cabling infrastructure", "بنية كابلات آمنة"),
    ],
    gallery: [
      "/images/case-studies/sec-control-rooms.jpg",
      "/images/control-room.jpg",
      "/images/av-led.jpg",
      "/images/steel-fabrication.jpg",
    ],
  },

  {
    slug: "al-shabab-stadium",
    featured: true,
    name: b("Al Shabab Stadium — Scoreboard Structure", "استاد الشباب — هيكل لوحة النتائج"),
    teaser: b(
      "A complete structural solution for a stadium LED scoreboard — precision steelwork and insulated cladding engineered for demanding stadium conditions.",
      "حلّ إنشائي متكامل للوحة نتائج LED في الاستاد — حديد دقيق وكسوة عازلة مهندَسة لظروف الملاعب القاسية.",
    ),
    category: "civil",
    location: b("Al Shabab Club, Riyadh", "نادي الشباب، الرياض"),
    client: b("Al Shabab Club", "نادي الشباب"),
    projectType: b("Steel Structures", "هياكل حديدية"),
    industry: b("Sports & Entertainment", "الرياضة والترفيه"),
    services: [
      b("Structural Analysis", "تحليل إنشائي"),
      b("Steel Fabrication", "تصنيع حديد"),
      b("Powder Coating", "طلاء بودرة"),
      b("Crane Installation", "تركيب برافعة"),
    ],
    relatedServiceKeys: ["civil"],
    hero: "/images/case-studies/al-shabab-stadium.jpg",
    overview: b(
      "AFAQ delivered a complete structural solution for a stadium LED scoreboard, combining precision-engineered steelwork with insulated sandwich panels for enhanced thermal performance. The project included structural analysis, fabrication, coating, crane-assisted installation, and testing, resulting in a durable, high-performance structure capable of withstanding demanding stadium conditions.",
      "سلّمت أفاق حلّاً إنشائياً متكاملاً للوحة نتائج LED في الاستاد، جامعةً بين حديد دقيق الهندسة وألواح ساندويتش عازلة لأداء حراري محسّن. وشمل المشروع التحليل الإنشائي والتصنيع والطلاء والتركيب بمساعدة الرافعات والاختبار، ما أثمر هيكلاً متيناً عالي الأداء قادراً على تحمّل ظروف الملاعب القاسية.",
    ),
    challenge: [
      b(
        "The scoreboard structure had to withstand demanding stadium conditions while maintaining thermal performance and durability.",
        "تعيّن أن يتحمّل هيكل لوحة النتائج ظروف الملاعب القاسية مع الحفاظ على الأداء الحراري والمتانة.",
      ),
    ],
    solutionPhases: [
      {
        title: b("Structural Analysis", "التحليل الإنشائي"),
        body: b("Analysed loads and wind resistance for the scoreboard.", "تحليل الأحمال ومقاومة الرياح للوحة النتائج."),
      },
      {
        title: b("Steel Fabrication", "تصنيع الحديد"),
        body: b("Precision-engineered steelwork fabricated to specification.", "حديد دقيق الهندسة مصنّع وفق المواصفات."),
      },
      {
        title: b("Coating & Cladding", "الطلاء والكسوة"),
        body: b("Powder coating and insulated sandwich panels for thermal performance.", "طلاء بودرة وألواح ساندويتش عازلة للأداء الحراري."),
      },
      {
        title: b("Crane Installation & Testing", "التركيب بالرافعة والاختبار"),
        body: b("Crane-assisted installation followed by testing.", "تركيب بمساعدة الرافعات يليه الاختبار."),
      },
    ],
    scope: [
      {
        title: b("Structural Analysis", "تحليل إنشائي"),
        body: b("Load and wind-resistance analysis.", "تحليل الأحمال ومقاومة الرياح."),
      },
      {
        title: b("Steel Fabrication & Welding", "تصنيع حديد ولحام"),
        body: b("Precision steelwork and welding.", "حديد دقيق ولحام."),
      },
      {
        title: b("Powder Coating", "طلاء بودرة"),
        body: b("Protective coating for durability.", "طلاء واقٍ للمتانة."),
      },
      {
        title: b("Sandwich Panels", "ألواح ساندويتش"),
        body: b("Insulated panels for thermal performance.", "ألواح عازلة للأداء الحراري."),
      },
      {
        title: b("Crane Installation", "تركيب بالرافعة"),
        body: b("Crane-assisted erection and testing.", "نصب بمساعدة الرافعات واختبار."),
      },
    ],
    highlights: [
      { title: b("Precision steelwork", "حديد دقيق الهندسة") },
      { title: b("Thermal-performance cladding", "كسوة بأداء حراري") },
      { title: b("Crane-assisted installation", "تركيب بمساعدة الرافعات") },
      { title: b("Durable under stadium conditions", "متانة في ظروف الملاعب") },
    ],
    metrics: [
      { value: "46 m²", label: b("Structure Area", "مساحة الهيكل") },
      { value: "8.0 mm", label: b("Steel Thickness", "سماكة الحديد") },
      { value: "High", label: b("Wind Resistance", "مقاومة الرياح") },
    ],
    technologies: [
      b("Structural Analysis", "تحليل إنشائي"),
      b("Steel Fabrication", "تصنيع حديد"),
      b("Welding", "لحام"),
      b("Powder Coating", "طلاء بودرة"),
      b("Sandwich Panels", "ألواح ساندويتش"),
      b("Crane Installation", "تركيب بالرافعة"),
    ],
    deliverables: [
      b("LED scoreboard support structure", "هيكل داعم للوحة نتائج LED"),
      b("Coated & tested steel assembly", "تجميعة حديد مطليّة ومختبَرة"),
    ],
    gallery: [
      "/images/case-studies/al-shabab-stadium.jpg",
      "/images/steel-fabrication.jpg",
      "/images/engineers-site.jpg",
    ],
  },

  // ═══════════════════════ PORTFOLIO ENGAGEMENTS ═══════════════════════════
  {
    slug: "riyadh-metro",
    featured: false,
    name: b("Riyadh Metro Lines 1 & 2", "مترو الرياض — المساران 1 و2"),
    teaser: b(
      "A reference coordinate control network underpinning the survey datum for Riyadh Metro Lines 1 & 2.",
      "شبكة تحكّم إحداثي مرجعية تشكّل الأساس المساحي لمساري مترو الرياض 1 و2.",
    ),
    category: "survey",
    location: b("Riyadh", "الرياض"),
    client: b("Riyadh Metro / RCRC", "مترو الرياض / الهيئة الملكية لمدينة الرياض"),
    projectType: b("Survey & Geodetic Control", "مساحة وتحكّم جيوديسي"),
    industry: b("Mega-Infrastructure", "بنية تحتية كبرى"),
    services: [
      b("Geodetic Control", "تحكّم جيوديسي"),
      b("Reference Coordinate Network", "شبكة إحداثيات مرجعية"),
      b("Topographic Survey", "مسح طبوغرافي"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/survey.jpg",
    overview: b(
      "AFAQ established the reference coordinate control network for Riyadh Metro Lines 1 & 2 — the geodetic datum that anchors survey and construction along the corridors.",
      "أنشأت أفاق شبكة التحكّم الإحداثي المرجعية لمساري مترو الرياض 1 و2 — المرجع الجيوديسي الذي ترتكز عليه أعمال المساحة والإنشاء على امتداد الممرين.",
    ),
    scope: [
      {
        title: b("Reference Coordinate Control Network", "شبكة تحكّم إحداثي مرجعية"),
        body: b("Geodetic control network for the metro corridors.", "شبكة تحكّم جيوديسي لممرات المترو."),
      },
    ],
  },

  {
    slug: "mod-air-bases",
    featured: false,
    name: b("Ministry of Defense Air Bases", "قواعد جوية لوزارة الدفاع"),
    teaser: b(
      "Multi-zone AV, LED displays and NOC/SOC integration across Ministry of Defense air bases, including King Salman and Dirab.",
      "أنظمة صوتية بصرية متعددة المناطق وشاشات LED وتكامل مراكز NOC/SOC عبر قواعد جوية لوزارة الدفاع، منها الملك سلمان وديراب.",
    ),
    category: "av",
    location: b("Kingdom of Saudi Arabia", "المملكة العربية السعودية"),
    client: b("Ministry of Defense", "وزارة الدفاع"),
    projectType: b("AV Integration & SOC", "تكامل صوتي بصري ومراكز تحكّم"),
    industry: b("Defense & Security", "الدفاع والأمن"),
    services: [
      b("Multi-zone AV", "أنظمة صوتية بصرية متعددة المناطق"),
      b("LED Displays", "شاشات LED"),
      b("NOC/SOC Integration", "تكامل مراكز NOC/SOC"),
    ],
    relatedServiceKeys: ["av"],
    hero: "/images/control-room.jpg",
    overview: b(
      "AFAQ delivered multi-zone AV, LED displays and NOC/SOC integration across Ministry of Defense air bases, including King Salman and Dirab.",
      "سلّمت أفاق أنظمة صوتية بصرية متعددة المناطق وشاشات LED وتكامل مراكز NOC/SOC عبر قواعد جوية لوزارة الدفاع، منها الملك سلمان وديراب.",
    ),
    scope: [
      {
        title: b("Multi-zone AV", "أنظمة صوتية بصرية متعددة المناطق"),
        body: b("AV systems across multiple operational zones.", "أنظمة صوتية بصرية عبر مناطق تشغيلية متعددة."),
      },
      {
        title: b("LED Displays & NOC/SOC", "شاشات LED ومراكز NOC/SOC"),
        body: b("LED displays integrated with command-center operations.", "شاشات LED مدمجة مع عمليات مراكز القيادة."),
      },
    ],
  },

  {
    slug: "royal-palaces",
    featured: false,
    name: b("Royal Palaces — Mina & Al-Salam", "القصور الملكية — منى والسلام"),
    teaser: b(
      "Fine-pitch LED video walls with IPTV and live-streaming for the Mina and Al-Salam royal palaces.",
      "جدران عرض LED دقيقة البكسل مع IPTV وبث مباشر لقصري منى والسلام الملكيين.",
    ),
    category: "av",
    location: b("Makkah & Riyadh", "مكة المكرمة والرياض"),
    client: b("Royal Palaces", "القصور الملكية"),
    projectType: b("AV Integration", "تكامل صوتي بصري"),
    industry: b("Royal Palaces", "القصور الملكية"),
    services: [
      b("Fine-pitch LED Video Walls", "جدران عرض LED دقيقة البكسل"),
      b("IPTV", "IPTV"),
      b("Live-streaming", "بث مباشر"),
      b("AV Programming", "برمجة صوتية بصرية"),
    ],
    relatedServiceKeys: ["av"],
    hero: "/images/av-led.jpg",
    overview: b(
      "AFAQ supplied and integrated 0.9mm and 0.7mm fine-pitch LED video walls with IPTV and live-streaming, along with AV programming, for the Mina and Al-Salam royal palaces.",
      "وفّرت أفاق ودمجت جدران عرض LED دقيقة البكسل 0.9مم و0.7مم مع IPTV وبث مباشر، إلى جانب البرمجة الصوتية البصرية، لقصري منى والسلام الملكيين.",
    ),
    scope: [
      {
        title: b("Fine-pitch LED Video Walls", "جدران عرض LED دقيقة البكسل"),
        body: b("0.9mm and 0.7mm fine-pitch video walls.", "جدران عرض دقيقة البكسل 0.9مم و0.7مم."),
      },
      {
        title: b("IPTV & Live-streaming", "IPTV والبث المباشر"),
        body: b("IPTV distribution and live-streaming with AV programming.", "توزيع IPTV وبث مباشر مع برمجة صوتية بصرية."),
      },
    ],
    metrics: [
      { value: "0.9 / 0.7mm", label: b("Fine Pitch", "دقّة البكسل") },
    ],
  },

  {
    slug: "municipal-gis-centers",
    featured: false,
    name: b("Municipal GIS Centers Program", "برنامج مراكز نظم المعلومات البلدية"),
    teaser: b(
      "20+ municipal GIS centers with land digitization, smart-city asset management and geodatabase development.",
      "أكثر من 20 مركز نظم معلومات جغرافية بلدي مع رقمنة الأراضي وإدارة أصول المدن الذكية وتطوير قواعد البيانات الجغرافية.",
    ),
    category: "survey",
    location: b("Kingdom of Saudi Arabia", "المملكة العربية السعودية"),
    client: b("Municipalities (MOMRAH)", "الأمانات والبلديات (وزارة الشؤون البلدية)"),
    projectType: b("GIS & Geospatial", "نظم معلومات جغرافية وجيومكانية"),
    industry: b("Government & Municipalities", "الحكومة والبلديات"),
    services: [
      b("Municipal GIS Centers", "مراكز نظم معلومات بلدية"),
      b("Land Digitization", "رقمنة الأراضي"),
      b("Smart-city Asset Management", "إدارة أصول المدن الذكية"),
      b("Geodatabase Development", "تطوير قواعد بيانات جغرافية"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/gis-mapping.jpg",
    overview: b(
      "AFAQ built 20+ municipal GIS centers, delivering land digitization, smart-city asset management and geodatabase development for government and municipalities.",
      "أنشأت أفاق أكثر من 20 مركز نظم معلومات جغرافية بلدي، وسلّمت رقمنة الأراضي وإدارة أصول المدن الذكية وتطوير قواعد البيانات الجغرافية للجهات الحكومية والبلديات.",
    ),
    scope: [
      {
        title: b("Municipal GIS Centers", "مراكز نظم معلومات بلدية"),
        body: b("20+ centers established across municipalities.", "أكثر من 20 مركزاً عبر الأمانات والبلديات."),
      },
      {
        title: b("Land Digitization & Asset Management", "رقمنة الأراضي وإدارة الأصول"),
        body: b("Smart-city asset management and geodatabase development.", "إدارة أصول المدن الذكية وتطوير قواعد البيانات الجغرافية."),
      },
    ],
    metrics: [
      { value: "20+", label: b("GIS Centers", "مركز نظم معلومات") },
    ],
  },

  {
    slug: "malls-the-zone-riyadh-front",
    featured: false,
    name: b("The Zone & Riyadh Front Malls", "مولات ذا زون وواجهة الرياض"),
    teaser: b(
      "LED, 4K projection, immersive audio and media façades with steel structure design, fabrication and installation.",
      "شاشات LED وعرض 4K وصوت غامر وواجهات إعلامية مع تصميم وتصنيع وتركيب هياكل حديدية.",
    ),
    category: "av",
    location: b("Riyadh", "الرياض"),
    client: b("PIF", "صندوق الاستثمارات العامة"),
    projectType: b("AV Integration & Steel", "تكامل صوتي بصري وحديد"),
    industry: b("Entertainment & Mega Events", "الترفيه والفعاليات الكبرى"),
    services: [
      b("Media Façades", "واجهات إعلامية"),
      b("4K Projection", "عرض 4K"),
      b("Immersive Audio", "صوت غامر"),
      b("LED Displays", "شاشات LED"),
      b("Steel Structures", "هياكل حديدية"),
    ],
    relatedServiceKeys: ["av", "civil"],
    hero: "/images/av-led.jpg",
    overview: b(
      "Across The Zone and Riyadh Front malls, AFAQ delivered LED, 4K projection, immersive audio and media façades, together with steel structure design, fabrication and installation, and the setting-out of structural plans.",
      "عبر مولي ذا زون وواجهة الرياض، سلّمت أفاق شاشات LED وعرض 4K وصوتاً غامراً وواجهات إعلامية، إلى جانب تصميم وتصنيع وتركيب الهياكل الحديدية وتوقيع المخططات الإنشائية.",
    ),
    scope: [
      {
        title: b("Media Façades & Displays", "واجهات إعلامية وشاشات"),
        body: b("LED, 4K projection and immersive audio.", "شاشات LED وعرض 4K وصوت غامر."),
      },
      {
        title: b("Steel Structures", "هياكل حديدية"),
        body: b("Structural steel design, fabrication and installation.", "تصميم وتصنيع وتركيب الحديد الإنشائي."),
      },
    ],
  },

  {
    slug: "diriyah-gate",
    featured: false,
    name: b("Diriyah Gate Development", "تطوير بوابة الدرعية"),
    teaser: b(
      "Topographic survey and geodetic control for the Diriyah Gate development.",
      "مسح طبوغرافي وتحكّم جيوديسي لتطوير بوابة الدرعية.",
    ),
    category: "survey",
    location: b("Diriyah, Riyadh", "الدرعية، الرياض"),
    client: b("PIF / Diriyah Company", "صندوق الاستثمارات العامة / شركة الدرعية"),
    projectType: b("Survey & Geodetic Control", "مساحة وتحكّم جيوديسي"),
    industry: b("Mega-Infrastructure", "بنية تحتية كبرى"),
    services: [
      b("Topographic Survey", "مسح طبوغرافي"),
      b("Geodetic Control", "تحكّم جيوديسي"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/drone-survey.jpg",
    overview: b(
      "AFAQ delivered topographic survey and geodetic control for the Diriyah Gate Development Authority — establishing the spatial foundation for one of the Kingdom's flagship giga-projects.",
      "سلّمت أفاق مسحاً طبوغرافياً وتحكّماً جيوديسياً لهيئة تطوير بوابة الدرعية — مؤسِّسةً الأساس المكاني لأحد المشاريع العملاقة الرائدة في المملكة.",
    ),
    scope: [
      {
        title: b("Topographic Survey & Geodetic Control", "مسح طبوغرافي وتحكّم جيوديسي"),
        body: b("Spatial baseline for the development.", "المرجع المكاني للمشروع التطويري."),
      },
    ],
  },

  {
    slug: "qiddiya-water-park",
    featured: false,
    name: b("Qiddiya Water Park & Cooling", "مدينة القدية المائية والتبريد"),
    teaser: b(
      "Steel structures and topographic survey for the Qiddiya water park and cooling works.",
      "هياكل حديدية ومسح طبوغرافي لمدينة القدية المائية وأعمال التبريد.",
    ),
    category: "civil",
    location: b("Qiddiya, Riyadh", "القدية، الرياض"),
    client: b("Qiddiya", "القدية"),
    projectType: b("Steel Structures & Survey", "هياكل حديدية ومساحة"),
    industry: b("Entertainment & Mega Events", "الترفيه والفعاليات الكبرى"),
    services: [
      b("Steel Structures", "هياكل حديدية"),
      b("Topographic Survey", "مسح طبوغرافي"),
    ],
    relatedServiceKeys: ["civil", "survey"],
    hero: "/images/steel-fabrication.jpg",
    overview: b(
      "AFAQ delivered steel structures and topographic survey for the Qiddiya Water Park & Cooling works — combining fabrication with spatial control on a flagship entertainment giga-project.",
      "سلّمت أفاق هياكل حديدية ومسحاً طبوغرافياً لأعمال مدينة القدية المائية والتبريد — جامعةً بين التصنيع والتحكّم المكاني في مشروع ترفيهي عملاق رائد.",
    ),
    scope: [
      {
        title: b("Steel Structures", "هياكل حديدية"),
        body: b("Structural steel for the water park works.", "حديد إنشائي لأعمال المدينة المائية."),
      },
      {
        title: b("Topographic Survey", "مسح طبوغرافي"),
        body: b("Spatial control for the development.", "تحكّم مكاني للمشروع."),
      },
    ],
  },

  {
    slug: "mewa-networks",
    featured: false,
    name: b("MEWA Water & Wastewater Networks", "شبكات المياه والصرف — وزارة البيئة والمياه"),
    teaser: b(
      "200+ geodetic control points with water and wastewater network surveys, asset inventories and geodatabase development.",
      "أكثر من 200 نقطة تحكّم جيوديسي مع مسوحات شبكات المياه والصرف وجرد الأصول وتطوير قواعد البيانات الجغرافية.",
    ),
    category: "survey",
    location: b("Kingdom of Saudi Arabia", "المملكة العربية السعودية"),
    client: b("Ministry of Environment, Water & Agriculture (MEWA)", "وزارة البيئة والمياه والزراعة"),
    projectType: b("Surveying & GIS", "مساحة ونظم معلومات جغرافية"),
    industry: b("Energy & Utilities", "الطاقة والمرافق"),
    services: [
      b("Network Surveys", "مسوحات الشبكات"),
      b("Geodetic Control", "تحكّم جيوديسي"),
      b("Asset Inventory", "جرد الأصول"),
      b("Geodatabase Development", "تطوير قواعد بيانات جغرافية"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/water-infrastructure.jpg",
    overview: b(
      "For MEWA and SWCC, AFAQ delivered 200+ geodetic control points alongside water and wastewater network surveys, asset inventories and geodatabase development.",
      "لوزارة البيئة والمياه والزراعة ومؤسسة تحلية المياه، سلّمت أفاق أكثر من 200 نقطة تحكّم جيوديسي إلى جانب مسوحات شبكات المياه والصرف وجرد الأصول وتطوير قواعد البيانات الجغرافية.",
    ),
    scope: [
      {
        title: b("Geodetic Control & Network Surveys", "تحكّم جيوديسي ومسوحات شبكات"),
        body: b("Water and wastewater network surveys.", "مسوحات شبكات المياه والصرف."),
      },
      {
        title: b("Asset Inventory & Geodatabase", "جرد أصول وقاعدة بيانات جغرافية"),
        body: b("Asset inventories and geodatabase development.", "جرد الأصول وتطوير قواعد البيانات الجغرافية."),
      },
    ],
    metrics: [
      { value: "200+", label: b("Geodetic Control Points", "نقطة تحكّم جيوديسي") },
    ],
  },

  {
    slug: "boulevard-roshn-geodetic",
    featured: false,
    name: b("Boulevard & Riyadh Front — Geodetic Control", "البوليفارد وواجهة الرياض — تحكّم جيوديسي"),
    teaser: b(
      "Topographic survey and geodetic control across the Boulevard and Riyadh Front developments.",
      "مسح طبوغرافي وتحكّم جيوديسي عبر مشروعي البوليفارد وواجهة الرياض.",
    ),
    category: "survey",
    location: b("Riyadh", "الرياض"),
    client: b("PIF / ROSHN Group", "صندوق الاستثمارات العامة / مجموعة روشن"),
    projectType: b("Survey & Geodetic Control", "مساحة وتحكّم جيوديسي"),
    industry: b("Entertainment & Mega Events", "الترفيه والفعاليات الكبرى"),
    services: [
      b("Topographic Survey", "مسح طبوغرافي"),
      b("Geodetic Control", "تحكّم جيوديسي"),
      b("Setting Out", "توقيع إحداثي"),
    ],
    relatedServiceKeys: ["survey"],
    hero: "/images/riyadh-skyline.jpg",
    overview: b(
      "AFAQ provided topographic survey and geodetic control for the Boulevard and Riyadh Front developments, delivering the spatial baseline and setting-out for construction.",
      "قدّمت أفاق مسحاً طبوغرافياً وتحكّماً جيوديسياً لمشروعي البوليفارد وواجهة الرياض، مسلّمةً المرجع المكاني والتوقيع الإحداثي لأعمال الإنشاء.",
    ),
    scope: [
      {
        title: b("Topographic Survey & Geodetic Control", "مسح طبوغرافي وتحكّم جيوديسي"),
        body: b("Spatial baseline and setting-out for the developments.", "المرجع المكاني والتوقيع الإحداثي للمشروعين."),
      },
    ],
  },
];

/** Facet order for the listing filter. */
export const CASE_CATEGORY_KEYS: Category[] = ["survey", "civil", "its", "av", "integrated"];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Up to `count` related studies — same category first, then others. */
export function relatedCaseStudies(slug: string, count = 3): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return [];
  const others = CASE_STUDIES.filter((c) => c.slug !== slug);
  const sameCat = others.filter((c) => c.category === current.category);
  const rest = others.filter((c) => c.category !== current.category);
  return [...sameCat, ...rest].slice(0, count);
}
