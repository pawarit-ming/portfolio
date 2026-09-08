/**
 * Role variants — the same portfolio, re-aimed at the top.
 *
 * Both languages of a variant live in one file rather than being split across
 * `en.ts` and `th.ts` the way the main content is. The override is small, and
 * keeping the pair side by side is what stops one being rewritten and the other
 * left behind.
 *
 * Nothing here may claim work that is not already on the default page. The
 * framing moves, and `skillGroups` is regrouped to read the way the CV this
 * variant is sent with does — but only over tools the projects underneath
 * already evidence. Those projects and the experience above them stay exactly
 * as they are, and a claim that cannot survive being read next to them does not
 * belong in this file.
 */

import type { Locale } from "@/lib/i18n";
import type { Variant, VariantOverride } from "./types";

export type VariantDefinition = {
  /**
   * The chips under the hero headline, replacing `primaryStack`.
   *
   * One list for the whole variant rather than one per language: these are
   * product names, which is the same reason `primaryStack` lives in
   * `shared.ts` instead of in each language file.
   */
  stack: string[];
  /**
   * The PDF behind the hero's CV button, replacing `documents.resume`.
   *
   * Outside `copy` for the same reason `stack` is: both CVs are written in
   * English, so there is nothing per-language to say here. Required rather
   * than optional, because a variant is the link that goes on an application
   * and the CV that application carries is the one document a reader holds
   * beside this page — a variant happy with the default names
   * `documents.resume` here instead, rather than letting a database
   * application quietly arrive with a frontend CV.
   */
  resume: string;
  copy: Record<Locale, VariantOverride>;
};

/**
 * Database roles.
 *
 * The honest shape of this: schema design, ER modelling and normalisation, plus
 * SQL from the application side. No administration — no backups, replication,
 * permissions, monitoring or query tuning — so nothing here mentions any, and
 * neither should anything added later. An interview is where that would come
 * apart.
 */
const dba: VariantDefinition = {
  stack: [
    "MySQL",
    "PostgreSQL",
    "Supabase",
    "SQL",
    "ER Modelling",
    "Normalisation",
  ],

  // The data CV, not the development one: the schema work below is what this
  // page leads with, and it is what the CV sent with the application leads
  // with too.
  resume: "/documents/pawarit-wang-data-resume.pdf",

  copy: {
    en: {
      role: "Database Administrator",
      headline:
        "I design relational schemas — ER modelling, normalisation, and the SQL to build and query them.",
      availability: "Open to database roles",
      summary:
        "Recent Digital Science and Technology graduate from Mahidol University. I design relational schemas: the Postgres model behind a cross-platform Flutter app — owners, animals, listings, offers and ownership transfers — and a 13-table retail schema taken from business rules through ER diagrams, normalisation and DDL. My internship was on the frontend of a MySQL-backed asset management system, so I have also seen a schema from the side that has to query it.",
      targetRoles: [
        { label: "Database Administrator", short: "Database Admin" },
        { label: "Database Developer", short: "Database Dev" },
        { label: "Full-stack Developer", short: "Full-stack" },
        { label: "Frontend Developer", short: "Frontend" },
      ],
      stats: [
        {
          value: "13",
          label:
            "Tables, 14 foreign keys, in a schema modelled from business rules",
        },
        {
          value: "Postgres",
          label: "Data model I designed behind a cross-platform Flutter app",
        },
        {
          value: "MySQL",
          label: "Behind the asset management system I built 22 screens for",
        },
      ],
      skillGroups: [
        {
          title: "Databases",
          items: ["SQL", "MySQL", "PostgreSQL (Supabase)", "Firebase"],
        },
        {
          title: "Database Skills",
          items: [
            "ER/EER Modelling (Chen and Crow's Foot)",
            "Relational Schema Design",
            "Data Dictionaries",
            "DDL",
            "Foreign Key Constraints",
            "Join and Aggregate Queries",
          ],
        },
        {
          title: "Data & BI",
          items: ["Alteryx", "Power BI"],
        },
        {
          title: "Tools",
          items: ["Git", "GitHub", "Postman"],
        },
        {
          title: "Other Technical",
          items: [
            "Python",
            "Java",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "REST APIs",
            "React",
            "Next.js",
            "Flutter",
            "Appium",
            "Selenium",
          ],
        },
      ],
    },

    th: {
      role: "ผู้ดูแลฐานข้อมูล",
      headline:
        "ออกแบบโครงสร้างฐานข้อมูลเชิงสัมพันธ์ ทั้ง ER Diagram การทำ normalization และ SQL ที่ใช้สร้างและค้นข้อมูล",
      availability: "เปิดรับงานสายฐานข้อมูล",
      summary:
        "บัณฑิตจบใหม่สาขาวิทยาการและเทคโนโลยีดิจิทัล มหาวิทยาลัยมหิดล ถนัดออกแบบโครงสร้างฐานข้อมูลเชิงสัมพันธ์ ทั้งโครงสร้างข้อมูล Postgres ที่รองรับแอป Flutter ข้ามแพลตฟอร์ม ครอบคลุมเจ้าของ โค ประกาศขาย ข้อเสนอ และการโอนกรรมสิทธิ์ และสคีมาธุรกิจค้าปลีก 13 ตารางที่ออกแบบจากกฎเกณฑ์ทางธุรกิจ ผ่าน ER Diagram การทำ normalization จนถึง DDL ส่วนงานฝึกงานอยู่ฝั่งหน้าบ้านของระบบครุภัณฑ์ที่ใช้ MySQL จึงเห็นสคีมาจากมุมของคนที่ต้องเรียกใช้ข้อมูลด้วย",
      targetRoles: [
        { label: "ผู้ดูแลฐานข้อมูล", short: "ฐานข้อมูล" },
        { label: "นักพัฒนาฐานข้อมูล", short: "Database Dev" },
        { label: "นักพัฒนา Full-stack", short: "Full-stack" },
        { label: "นักพัฒนา Frontend", short: "Frontend" },
      ],
      stats: [
        {
          value: "13",
          label: "ตาราง 14 foreign key ในสคีมาที่ออกแบบจากกฎเกณฑ์ทางธุรกิจ",
        },
        {
          value: "Postgres",
          label: "โครงสร้างข้อมูลที่ออกแบบให้แอป Flutter ข้ามแพลตฟอร์ม",
        },
        {
          value: "MySQL",
          label: "เบื้องหลังระบบครุภัณฑ์ที่พัฒนาหน้าจอให้ 22 หน้า",
        },
      ],
      skillGroups: [
        {
          title: "ฐานข้อมูล",
          items: ["SQL", "MySQL", "PostgreSQL (Supabase)", "Firebase"],
        },
        {
          title: "ทักษะฐานข้อมูล",
          items: [
            "ER/EER Modelling (Chen and Crow's Foot)",
            "Relational Schema Design",
            "Data Dictionaries",
            "DDL",
            "Foreign Key Constraints",
            "Join and Aggregate Queries",
          ],
        },
        {
          title: "ข้อมูลและ BI",
          items: ["Alteryx", "Power BI"],
        },
        {
          title: "เครื่องมือ",
          items: ["Git", "GitHub", "Postman"],
        },
        {
          title: "ทักษะเทคนิคอื่น ๆ",
          items: [
            "Python",
            "Java",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "REST APIs",
            "React",
            "Next.js",
            "Flutter",
            "Appium",
            "Selenium",
          ],
        },
      ],
    },
  },
};

export const variantDefinitions: Record<Variant, VariantDefinition> = { dba };
