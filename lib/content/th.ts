/**
 * Thai content — a key-for-key mirror of `en.ts`.
 *
 * Written without a first-person pronoun throughout. Thai drops the subject
 * naturally and a CV reads fine that way, which avoids committing the page to
 * ผม or ดิฉัน. Add whichever you use if you would rather it were explicit.
 *
 * Dates use Thai month abbreviations with Gregorian years. Buddhist-era years
 * would also be idiomatic; the mix is what confuses people, so pick one and
 * keep it across the file.
 */

import type { Content } from "./types";

export const th: Content = {
  profile: {
    name: "ปวริศ ว่อง",
    role: "นักพัฒนา Full-stack และโมบาย",
    headline:
      "พัฒนาเว็บแอปด้วย React และแอปมือถือด้วย Flutter แล้วทดสอบงานด้วยวิธีที่ได้เรียนรู้จากการฝึกงานด้าน test automation",
    relocation: "พร้อมย้ายไปทำงานที่กรุงเทพฯ",
    availability: "เปิดรับงานสายพัฒนา",
    summary:
      "บัณฑิตจบใหม่สาขาวิทยาการและเทคโนโลยีดิจิทัล มหาวิทยาลัยมหิดล กำลังมองหางานสาย Full-stack",
  },

  targetRoles: [
    { label: "นักพัฒนา Full-stack", short: "Full-stack" },
    { label: "นักพัฒนา Frontend", short: "Frontend" },
    { label: "นักพัฒนาโมบาย (Flutter)", short: "โมบาย (Flutter)" },
    { label: "วิศวกร QA / Test Automation", short: "QA Automation" },
  ],

  experience: [
    {
      role: "นักพัฒนา Frontend (ฝึกงาน)",
      company: "กระทรวงสาธารณสุข",
      period: "มิ.ย. 2025 – พ.ย. 2025",
      stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Zod", "Figma"],
      highlights: [
        "ร่วมพัฒนาหน้าจอ 22 หน้า (เป็นผู้เขียนหลัก 14 หน้า) ด้วย React, Next.js และ Tailwind CSS รวมถึงวิซาร์ดลงทะเบียนครุภัณฑ์ 5 ขั้นตอน",
      ],
    },
    {
      role: "นักพัฒนา Test Automation (ฝึกงาน)",
      company: "Celestica (Thailand) Limited",
      period: "พ.ค. 2024 – ก.ค. 2024",
      stack: ["Java", "Appium", "Android", "Extent Reports"],
      highlights: [
        "เขียนแผนการทดสอบให้แอป Android ที่ควบคุมมอเตอร์ผ่าน Bluetooth และทำ automation ทั้งชุดด้วย Java ร่วมกับ Appium ทั้งบน emulator และเครื่องจริง",
        "รายงานผลทุกรอบผ่าน Extent Reports ให้ทีมเห็นผ่าน/ไม่ผ่านแยกรายเคส",
      ],
    },
  ],

  projects: [
    {
      slug: "fyt-sme-platform",
      title: "FYT ระบบ ERP สำหรับธุรกิจเทรดดิ้ง",
      kind: "โปรเจกต์ส่วนตัว · ใช้งานจริง และยังพัฒนาต่อ",
      period: "มิ.ย. 2026 – ปัจจุบัน",
      tagline:
        "ระบบ ERP สำหรับบริษัทเทรดดิ้งที่พัฒนาคนเดียวทั้งระบบ ด้วย React และ TypeScript โดยให้ PostgreSQL บังคับกฎทางธุรกิจ",
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query", "React Hook Form", "Zod", "Vite", "Vitest"],
      screens: [
        { src: "/projects/fyt-sme-platform/client-rfq-form.webp", alt: "ฟอร์มสร้าง RFQ ใหม่ มีวันที่ ลำดับ ช่องทาง ลูกค้า ผู้ติดต่อ ผู้ติดตาม และไฟล์แนบ ตามด้วยรายการสินค้าที่มี SKU ชื่อสินค้าของลูกค้า แบรนด์ รุ่น จำนวน และหน่วย และแถวใบเสนอราคาจากผู้ขาย ประวัติราคา และราคาที่เราเสนอ", aspect: "screen" },
        { src: "/projects/fyt-sme-platform/client-rfq-list.webp", alt: "รายการ Client RFQ ในระบบ FYT แสดงคำขอใบเสนอราคา 20 รายการ พร้อมวันที่ ช่องทาง ลูกค้า ผู้ติดตาม สินค้า ขั้นตอน และจำนวนวัน", aspect: "screen" },
        { src: "/projects/fyt-sme-platform/wi-settings.webp", alt: "หน้า WI Settings แสดงการตั้งค่า 27 หมวด เช่น แบรนด์ ช่องทาง สกุลเงิน เงื่อนไขการชำระเงิน ชื่อ SKU ขั้นตอนงาน หน่วย และอัตรา VAT", aspect: "screen" },
      ],
      highlight: { value: "Live", label: "ใช้งานบน Production ตั้งแต่ ส.ค. 2026" },
    },
    {
      slug: "asset-management-system",
      title: "ระบบบริหารจัดการครุภัณฑ์",
      kind: "ฝึกงาน · กระทรวงสาธารณสุข",
      period: "มิ.ย. 2025 – พ.ย. 2025",
      tagline:
        "ระบบภาครัฐที่ติดตามครุภัณฑ์ตั้งแต่จัดซื้อจนถึงจำหน่าย ทีม 6 คน ร่วมพัฒนาหน้าจอ 22 หน้า โดยเป็นผู้เขียนหลัก 14 หน้า",
      stack: [
        "Next.js",
        "React",
        "JavaScript",
        "Tailwind CSS",
        "shadcn/ui",
        "React Hook Form",
        "Zod",
        "Figma",
      ],
      screens: [
        { src: "/projects/asset-management-system/registration-wizard.webp", alt: "ขั้นตอนแรกของวิซาร์ดลงทะเบียนครุภัณฑ์ แถบความคืบหน้าแสดงครบทั้งห้าขั้นตอน เหนือฟอร์มสัญญาที่กรอกเลขที่โครงการ งบประมาณ เลขที่สัญญา และวันที่รูปแบบไทยไว้แล้ว", aspect: "screen" },
        { src: "/projects/asset-management-system/inspection.webp", alt: "หน้าจอตรวจสอบครุภัณฑ์ประจำปี กรองด้วยปีงบประมาณ พ.ศ. 2568 แสดงรายการครุภัณฑ์พร้อมเลขครุภัณฑ์ รหัส GFMIS ยี่ห้อ รุ่น และสถานที่ตั้ง แต่ละแถวมีป้ายสถานะและช่องติ๊กสำหรับการตรวจสอบ", aspect: "screen" },
        { src: "/projects/asset-management-system/add-supplier.webp", alt: "ฟอร์มเพิ่มผู้ขายที่กรอกข้อมูลแล้ว ทั้งเลขประจำตัวผู้เสียภาษีและรหัส GFMIS ชื่อผู้ขายและชื่อบริษัท ตามด้วยที่อยู่แบบไทยที่แยกเป็นอาคาร ห้อง ชั้น บ้านเลขที่ ซอย ถนน อำเภอ และรหัสไปรษณีย์", aspect: "screen" },
      ],
      highlight: { value: "22", label: "หน้าจอที่ร่วมพัฒนา" },
      links: [
        {
          label: "ซอร์สโค้ดบน GitHub",
          href: "https://github.com/pawarit-ming/asset-management-system",
        },
      ],
    },
    {
      slug: "thai-cattle-passport",
      title: "Thai Cattle Passport",
      kind: "โครงงานปริญญานิพนธ์ · มหาวิทยาลัยมหิดล",
      period: "ก.ย. 2025 – พ.ค. 2026",
      tagline:
        "แอปที่ให้โคแต่ละตัวมีอัตลักษณ์ที่ตรวจสอบได้ และประวัติสุขภาพที่ติดตามไปกับเจ้าของคนถัดไป รับผิดชอบตลาดซื้อขาย ระบบเข้าสู่ระบบ และสมุดประจำตัวแบบ QR",
      stack: [
        "Flutter",
        "Dart",
        "Riverpod",
        "go_router",
        "Supabase",
        "PostgreSQL",
        "Google Maps",
        "QR & Camera",
      ],
      screens: [
        { src: "/projects/thai-cattle-passport/herd-list-screen.webp", alt: "รายการโคของเจ้าของ แต่ละแถวแสดงรูปย่อ หมายเลขประจำตัว ชื่อ สายพันธุ์ เพศ อายุ และป้ายสถานะ เช่น ฝากเลี้ยง หรือ ตายแล้ว", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/cow-profile-screen.webp", alt: "หน้าโปรไฟล์ของโคหนึ่งตัว แสดงรูปโค หมายเลขประจำตัว ชื่อ สายพันธุ์ ป้ายสถานะสุขภาพดี และแท็บข้อมูลทั่วไปกับกิจกรรม", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/activity-log-screen.webp", alt: "ไทม์ไลน์แนวตั้งของกิจกรรมประจำตัวโค ทั้งการตรวจการตั้งท้องด้วยอัลตราซาวด์ บันทึกการผสมพันธุ์ที่ระบุพ่อพันธุ์ และประวัติการแก้ไขที่แสดงการแก้หมายเลขประจำตัว", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/qr-passport-screen.webp", alt: "กล่องโต้ตอบแสดงหมายเลขประจำตัวโคเหนือ QR code พร้อมปุ่มปิดหรือบันทึกรหัสลงคลังภาพของเครื่อง", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/marketplace-screen.webp", alt: "ตลาดซื้อขายโค มีช่องค้นหา จำนวนผลลัพธ์ และการ์ดประกาศที่แสดงรูปโค สายพันธุ์ เพศ น้ำหนัก และจังหวัด โดยชื่อผู้ขายถูกเบลอไว้ เหนือปุ่มยื่นข้อเสนอ", aspect: "phone" },
        { src: "/projects/thai-cattle-passport/seller-location-screen.webp", alt: "แผงด้านล่างหัวข้อผู้ขายและที่ตั้ง แสดงตำแหน่งฟาร์มบนแผนที่ เหนือชื่อฟาร์มที่เบลอไว้และเบอร์โทรที่ปิดบางส่วน พร้อมปุ่มยกเลิกและยืนยันข้อเสนอ", aspect: "phone" },
      ],
      highlight: { value: "25+", label: "หน้าจอในแอป" },
      links: [
        {
          label: "ซอร์สโค้ดบน GitHub",
          href: "https://github.com/pawarit-ming/thai-cattle-passport",
        },
      ],
    },
  ],

  /** ถ้าเพิ่มโปรเจกต์ที่นี่ อย่าลืมเพิ่มรายการเดียวกันใน `en.ts` ด้วย */
  otherProjects: [
    {
      title: "แดชบอร์ดวิเคราะห์ข้อมูลอีคอมเมิร์ซ",
      description: "แดชบอร์ด Power BI จากข้อมูล Kaggle 1.4 ล้านแถว เตรียมข้อมูลด้วย Alteryx",
      period: "พ.ย. 2024",
      stack: ["Alteryx", "Power BI", "ETL", "Data Visualisation"],
    },
    {
      title: "Go Healthy",
      description: "แอปออกกำลังกายด้วย Flutter ทำหน้าเข้าสู่ระบบ โปรไฟล์ และตัวจับเวลา",
      period: "2024",
      stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    },
    {
      title: "ออกแบบฐานข้อมูลธุรกิจค้าปลีก",
      description: "สคีมา MySQL 13 ตารางสำหรับร้านเสื้อผ้า ตั้งแต่ ER Diagram ถึง DDL",
      period: "ก.ค. 2023",
      stack: ["MySQL", "SQL", "ER Modelling", "Normalisation"],
    },
    {
      title: "เว็บไซต์ร้านขายเกม",
      description: "เว็บร้านขายเกม มี REST API ด้วย Express บน MySQL",
      period: "2023",
      stack: ["Node.js", "Express", "MySQL", "REST API", "JavaScript", "HTML", "CSS"],
    },
  ],

  skillGroups: [
    {
      title: "ภาษาโปรแกรม",
      items: ["JavaScript", "TypeScript", "Java", "Python", "Dart", "SQL", "HTML", "CSS"],
    },
    {
      title: "หน้าบ้านและโมบาย",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
        "TanStack Query",
        "Flutter",
        "Riverpod",
      ],
    },
    {
      title: "ฐานข้อมูล",
      items: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
    },
    {
      title: "หลังบ้าน",
      items: ["Node.js", "Express", "REST APIs"],
    },
    {
      title: "การทดสอบ",
      items: ["Selenium", "Appium", "Katalon Studio"],
    },
    {
      title: "เครื่องมือ",
      items: ["Git", "GitHub", "Vite", "Figma", "Postman"],
    },
  ],

  education: {
    degree: "วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการและเทคโนโลยีดิจิทัล",
    faculty: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร",
    school: "มหาวิทยาลัยมหิดล",
    graduated: "จบการศึกษา มิ.ย. 2026",
  },

  /** ชื่อหลักสูตรและผู้ออกคงไว้ตามต้นฉบับ มีแต่วันที่ที่เขียนแบบไทย ไฟล์ PDF เป็นไฟล์เดียวกับ `en.ts` */
  certifications: [
    {
      // ออกโดยศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร สำนักงานปลัดฯ — ย่อเหลือ
      // แค่ชื่อกระทรวง ให้ตรงกับชื่อที่หัวข้อประสบการณ์ใช้ และเพราะการ์ดนี้แคบ
      name: "หนังสือรับรองการฝึกงาน",
      issuer: "กระทรวงสาธารณสุข",
      date: "พ.ย. 2025",
      file: "/certificates/internship-ministry-of-public-health.pdf",
    },
    {
      name: "IoT Fundamentals: Connecting Things",
      issuer: "Cisco Networking Academy",
      date: "พ.ค. 2024",
      file: "/certificates/iot-fundamentals-connecting-things.pdf",
    },
    {
      name: "CCNAv7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "ธ.ค. 2023",
      file: "/certificates/ccna-introduction-to-networks.pdf",
    },
    {
      name: "Furukawa Cabling System (FCS)",
      issuer: "Furukawa Electric",
      date: "ต.ค. 2023",
      file: "/certificates/furukawa-cabling-system.pdf",
    },
  ],

  languages: [
    { name: "ไทย", level: "ภาษาแม่" },
    { name: "อังกฤษ", level: "ระดับกลาง (TOEIC 660, CEFR B1)" },
  ],

  navigation: [
    { label: "ผลงาน", hash: "#projects" },
    { label: "เกี่ยวกับ", hash: "#about" },
    { label: "ประสบการณ์", hash: "#experience" },
    { label: "ทักษะ", hash: "#skills" },
  ],

  ui: {
    skipToContent: "ข้ามไปยังเนื้อหา",
    mainNavLabel: "เมนูหลัก",
    footerNavLabel: "เมนูส่วนท้าย",
    getInTouch: "ติดต่อ",
    openMenu: "เปิดเมนู",
    closeMenu: "ปิดเมนู",
    themeToggle: "สลับธีมสีสว่างและมืด",
    languageLabel: "ภาษา",

    hero: {
      viewProjects: "ดูผลงาน",
      // เรซูเม่เป็นฉบับภาษาอังกฤษฉบับเดียว ปุ่มจึงบอกไว้ตรงนี้ ผู้อ่านจะได้รู้ก่อนกด
      resume: "เรซูเม่ (PDF ภาษาอังกฤษ)",
      resumeLinkLabel: "เปิดเรซูเม่ฉบับภาษาอังกฤษ (PDF เปิดในแท็บใหม่)",
    },

    about: {
      title: "รู้จักกันสักนิด",
      educationHeading: "การศึกษา",
      certificationsHeading: "ใบรับรอง",
      certificateLinkLabel: "เปิดใบรับรอง {name} (PDF)",
      transcript: "ใบแสดงผลการเรียน (PDF)",
      transcriptLinkLabel: "เปิดใบแสดงผลการเรียน (PDF เปิดในแท็บใหม่)",
      languagesHeading: "ภาษา",
    },

    experience: {
      title: "ที่ที่เคยทำงาน",
      description:
        "ฝึกงานสองที่ ที่หนึ่งพัฒนา frontend อีกที่ทำ test automation",
    },

    projects: {
      title: "สิ่งที่เคยสร้าง",
      description:
        "สามโปรเจกต์ พร้อมส่วนที่รับผิดชอบเอง",
      otherHeading: "ผลงานอื่น ๆ",
      screens: {
        previous: "ภาพก่อนหน้า",
        next: "ภาพถัดไป",
        close: "ปิดภาพ",
        counter: "{current} จาก {total}",
      },
    },

    skills: {
      title: "เครื่องมือที่ใช้ทำงาน",
      description:
        "ถนัดที่สุดฝั่ง React และ Next.js และคุ้นกับงานหลังบ้านกับโมบายมากพอที่จะทำฟีเจอร์ได้ครบตั้งแต่ต้นจนจบ",
    },

    contact: {
      title: "คุยกันได้เลย",
      description:
        "เปิดรับงานสายพัฒนาในกรุงเทพฯ หรือทำงานทางไกล ทักมาได้เลยแล้วจะรีบตอบกลับ",
      emailLabel: "อีเมล",
      phoneLabel: "โทรศัพท์",
    },

    form: {
      nameLabel: "ชื่อ",
      namePlaceholder: "ชื่อของคุณ",
      emailLabel: "อีเมล",
      emailPlaceholder: "you@company.com",
      messageLabel: "ข้อความ",
      messagePlaceholder: "เล่าเรื่องตำแหน่งงานหรือโปรเจกต์ให้ฟังได้เลย",
      companyLabel: "บริษัท",
      submit: "ส่งข้อความ",
      submitting: "กำลังส่ง…",
      successTitle: "ส่งข้อความแล้ว",
      successBody: "ขอบคุณที่ติดต่อเข้ามา จะรีบตอบกลับให้เร็วที่สุด",
      sendAnother: "ส่งข้อความอีกครั้ง",
      orEmailDirectly: "หรือส่งอีเมลหาโดยตรงที่",
      fallbackBody:
        "ข้อความยังไม่หายไปไหน ยังอยู่ในช่องด้านบน ส่งตรงเข้าอีเมลแทนได้เลย:",
      openInMailApp: "เปิดในแอปอีเมล",
      copyAddress: "คัดลอกอีเมล",
      addressCopied: "คัดลอกแล้ว",
      mailtoSubject: "ติดต่อจากเว็บพอร์ตโฟลิโอ",
      mailtoSubjectFrom: "ติดต่อจากเว็บพอร์ตโฟลิโอ โดย {name}",
      errors: {
        invalid_body: "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง",
        missing_fields: "ต้องกรอกทั้งชื่อ อีเมล และข้อความ",
        too_long: "ข้อความยาวเกินไป",
        invalid_email: "รูปแบบอีเมลดูไม่ถูกต้อง",
        rate_limited: "ส่งถี่เกินไป กรุณาลองใหม่ในอีกสักครู่",
        not_configured: "ระบบส่งอีเมลยังไม่ได้ตั้งค่าไว้บนเซิร์ฟเวอร์นี้",
        provider_rejected: "บริการอีเมลปฏิเสธข้อความนี้",
        delivery_failed: "ส่งข้อความไม่สำเร็จ",
        unknown: "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง",
      },
    },

    footer: {
      navigationHeading: "สำรวจเว็บไซต์",
      socialsHeading: "ช่องทางอื่น",
      builtWith: "สร้างด้วย Next.js, TypeScript และ Tailwind CSS",
    },

    notFound: {
      title: "ไม่พบหน้านี้",
      description:
        "ลิงก์อาจเก่าเกินไป หรือหน้านี้อาจถูกย้ายไปแล้ว ส่วนอื่นยังอยู่ที่เดิมทุกอย่าง",
      back: "กลับไปหน้าแรก",
    },


    metadata: {
      descriptionTemplate: "{role} · {headline}",
      keywords: [
        "นักพัฒนาเว็บ",
        "รับสมัครงาน โปรแกรมเมอร์",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Flutter",
        "Dart",
        "ประเทศไทย",
      ],
    },
  },
};
