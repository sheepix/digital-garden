// src/lib/garden-notes.ts
// 首页手账卡片的数据源：直接从 Starlight docs 集合里读取 garden/ 下的真实笔记。
// 若花园里还没有笔记，则回退到一组「样式示例」占位数据，保持数据驱动、模板不写死。
import { getCollection } from 'astro:content';

export interface GardenNote {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  url: string;
  placeholder: boolean;
}

/** 没有真实笔记时展示的示例卡片（结构与真实笔记完全一致） */
const PLACEHOLDER_NOTES: GardenNote[] = [
  {
    id: 'placeholder/1',
    title: '第二大脑的最小可行结构',
    description: '不先设计系统，先记录三周。结构应该从习惯里长出来，而不是反过来。',
    tags: ['方法论', 'PKM'],
    date: '2026.11.18',
    url: '/garden/',
    placeholder: true,
  },
  {
    id: 'placeholder/2',
    title: '为什么我停止写长文',
    description: '长文逼我先搭结论，而多数时候我还没有结论。短笔记允许我停在半路。',
    tags: ['写作'],
    date: '2026.11.12',
    url: '/garden/',
    placeholder: true,
  },
  {
    id: 'placeholder/3',
    title: 'wikilink 的使用习惯',
    description: '写到一半卡住的地方，就是该插链接的地方——那里通常缺着一篇笔记。',
    tags: ['工具', 'obsidian'],
    date: '2026.11.05',
    url: '/garden/',
    placeholder: true,
  },
  {
    id: 'placeholder/4',
    title: '笔记的原子化，到底要多原子',
    description: '一个标题答不上「它是什么」，就该拆；能一句话答完，就该合。',
    tags: ['方法论'],
    date: '2026.10.28',
    url: '/garden/',
    placeholder: true,
  },
  {
    id: 'placeholder/5',
    title: '用每日笔记做输入缓冲',
    description: '所有没想清楚的东西先落进当天，每周日再决定谁有资格成为笔记。',
    tags: ['习惯', '工作流'],
    date: '2026.10.20',
    url: '/garden/',
    placeholder: true,
  },
  {
    id: 'placeholder/6',
    title: '图谱不是装饰',
    description: '好看的图不代表想法连上了。看孤岛，比看那团毛线更有用。',
    tags: ['可视化'],
    date: '2026.10.11',
    url: '/garden/',
    placeholder: true,
  },
];

/** 把 frontmatter 里的日期格式化成手账式 2026.11.18 */
export function formatJournalDate(value?: string | Date): string {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/** 取 garden 目录下的真实笔记，按时间倒序 */
export async function getGardenNotes(limit = 24): Promise<GardenNote[]> {
  let entries: Awaited<ReturnType<typeof getCollection>> = [];
  try {
    entries = await getCollection('docs', ({ id }) => {
      const clean = id.replace(/\.(md|mdx)$/i, '');
      return clean.startsWith('garden/') && clean !== 'garden/index';
    });
  } catch {
    entries = [];
  }

  const notes: GardenNote[] = entries.map((entry) => {
    const cleanId = entry.id.replace(/\.(md|mdx)$/i, '');
    const url = `/${cleanId.replace(/\/index$/, '')}/`;
    const data = entry.data as {
      title?: string;
      description?: string;
      tags?: string[];
      created?: string | Date;
      updated?: string | Date;
    };
    return {
      id: cleanId,
      title: data.title || cleanId.split('/').pop() || '未命名笔记',
      description: data.description || '',
      tags: (data.tags || []).filter(Boolean).slice(0, 2),
      date: formatJournalDate(data.updated || data.created),
      url,
      placeholder: false,
    };
  });

  notes.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  if (notes.length === 0) return PLACEHOLDER_NOTES.slice(0, limit);
  return notes.slice(0, limit);
}
