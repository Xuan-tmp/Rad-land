export type KnowledgeLevel = 'public' | 'academic' | 'secret' | 'mixed';

export type ContentMeta = {
  title: string;
  slug: string;
  section: string;
  sectionLabel: string;
  summary: string;
  status: 'published' | 'draft';
  knowledge: KnowledgeLevel;
  knowledgeLabel: string;
  tags: string[];
  order: number;
  featured: boolean;
  spoiler: boolean;
  href: string;
};

export type ContentDoc = ContentMeta & {
  body: string;
  headings: { level: number; text: string; id: string }[];
};

export const sectionNames: Record<string, string> = {
  world: '世界', magic: '魔法', history: '历史', society: '社会',
  factions: '势力', encyclopedia: '百科', secrets: '世界真相',
};

export const sectionDescriptions: Record<string, string> = {
  world: '大陆、世界构型、边界与浮光之下可被观测的自然。',
  magic: '辉质、光谱、辉核以及魔法释放的完整结构。',
  history: '人类认知的演进，以及改变世界格局的重大事件。',
  society: '阶级、制度、经济、教育与日常生活。',
  factions: '信仰、政治派系、帝国机关与半官方组织。',
  encyclopedia: '人物、地点、生物、材料、法术与名词的索引。',
  secrets: '作者与读者层面的真实机制。包含重要剧透。',
};

export function headingId(text: string) {
  return text.trim().toLowerCase().replace(/[\s/]+/g, '-').replace(/[，。；：！？、“”‘’（）()【】《》]/g, '');
}

function toBoolean(value: unknown) {
  return value === true || value === 'true';
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  return String(value ?? '').split(',').map((tag) => tag.trim()).filter(Boolean);
}

const rawModules = import.meta.glob<string>('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw: string) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {} as Record<string, string>, content: normalized };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) data[key] = value;
  }
  return { data, content: normalized.slice(match[0].length) };
}

const docs: ContentDoc[] = Object.entries(rawModules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  const match = path.match(/content\/([^/]+)\/([^/]+)\.md$/);
  const section = String(data.section ?? match?.[1] ?? 'encyclopedia');
  const slug = String(data.slug ?? match?.[2] ?? 'untitled');
  const headings = [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((item) => ({
    level: item[1].length,
    text: item[2].replace(/[*_`]/g, '').trim(),
    id: headingId(item[2].replace(/[*_`]/g, '')),
  }));

  return {
    title: String(data.title ?? slug), slug, section,
    sectionLabel: String(data.sectionLabel ?? sectionNames[section] ?? section),
    summary: String(data.summary ?? ''), status: data.status === 'draft' ? 'draft' : 'published',
    knowledge: (data.knowledge ?? 'public') as KnowledgeLevel,
    knowledgeLabel: String(data.knowledgeLabel ?? '公众常识'),
    tags: parseTags(data.tags), order: Number(data.order ?? 999),
    featured: toBoolean(data.featured), spoiler: toBoolean(data.spoiler),
    href: `/${section}/${slug}`, body: content.trim(), headings,
  };
});

export function getAllDocs(options?: { includeDrafts?: boolean }) {
  return docs.filter((doc) => options?.includeDrafts || doc.status === 'published')
    .sort((a, b) => a.section.localeCompare(b.section) || a.order - b.order || a.title.localeCompare(b.title, 'zh-CN'));
}

export function getDoc(section: string, slug: string) {
  return getAllDocs().find((doc) => doc.section === section && doc.slug === slug);
}

export function getSectionDocs(section: string) {
  if (section === 'secrets') return getAllDocs().filter((doc) => doc.knowledge === 'secret' || doc.spoiler);
  if (section === 'encyclopedia') return getAllDocs();
  return getAllDocs().filter((doc) => doc.section === section && doc.knowledge !== 'secret');
}

export function getRelatedDocs(current: ContentDoc, limit = 3) {
  return getAllDocs().filter((doc) => doc.href !== current.href)
    .map((doc) => ({ doc, score: doc.tags.filter((tag) => current.tags.includes(tag)).length + (doc.section === current.section ? 1 : 0) }))
    .filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map(({ doc }) => doc);
}
