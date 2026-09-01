import Link from 'next/link';
import { Search } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { getAllDocs } from '@/lib/content';

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const query = String((await searchParams).q ?? '').trim();
  const normalized = query.toLocaleLowerCase('zh-CN');
  const results = query ? getAllDocs().filter((doc) => [doc.title, doc.summary, doc.sectionLabel, ...doc.tags, doc.body].join(' ').toLocaleLowerCase('zh-CN').includes(normalized)) : getAllDocs();
  return <main className="archive-page search-page"><SiteHeader />
    <section className="search-shell"><p className="kicker">FULL-TEXT SEARCH</p><h1>搜索档案</h1>
      <form action="/search" className="search-form"><Search size={19} /><input name="q" defaultValue={query} placeholder="输入标题、标签或正文关键词" autoFocus aria-label="搜索世界观档案" /><button type="submit">搜索</button></form>
      <p className="search-count">{query ? `“${query}” 找到 ${results.length} 篇文本` : `当前共收录 ${results.length} 篇文本`}</p>
      <div className="search-results">{results.map((doc) => <Link href={doc.href} key={doc.href}><span>{doc.sectionLabel} · {doc.knowledgeLabel}</span><h2>{doc.title}</h2><p>{doc.summary}</p><small>{doc.href}</small></Link>)}</div>
    </section>
  </main>;
}
