import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenText } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { getSectionDocs, sectionDescriptions, sectionNames } from '@/lib/content';

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return { title: sectionNames[section] ?? '档案目录', description: sectionDescriptions[section] };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!sectionNames[section]) notFound();
  const docs = getSectionDocs(section);
  return <main className="archive-page section-page">
    <SiteHeader />
    <section className="section-hero">
      <p className="kicker">RADLAND ARCHIVE · SECTION</p><h1>{sectionNames[section]}</h1><p>{sectionDescriptions[section]}</p>
    </section>
    <section className="section-list">
      <div className="section-list-heading"><span>{String(docs.length).padStart(2, '0')} 篇已公开文本</span><Link href="/search">搜索全部档案</Link></div>
      {docs.length ? <div className="document-grid">{docs.map((doc, index) => <Link href={doc.href} className="document-card" key={doc.href}>
        <span className="document-index">{String(index + 1).padStart(2, '0')}</span><div><p>{doc.knowledgeLabel}</p><h2>{doc.title}</h2><span>{doc.summary}</span><div className="tag-row">{doc.tags.slice(0, 4).map((tag) => <small key={tag}>{tag}</small>)}</div></div><ArrowRight size={18} />
      </Link>)}</div> : <div className="empty-archive"><BookOpenText size={28} /><h2>这个栏目还在等待第一篇档案</h2><p>复制内容模板并设定栏目后，新文本会自动出现在这里。</p></div>}
    </section>
  </main>;
}
