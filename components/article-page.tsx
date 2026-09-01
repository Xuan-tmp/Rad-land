import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertTriangle, ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import { ContentDoc, getAllDocs, getRelatedDocs, headingId } from '@/lib/content';
import { SiteHeader } from '@/components/site-header';

const knowledgeClass: Record<string, string> = { public: 'knowledge-public', academic: 'knowledge-academic', secret: 'knowledge-secret', mixed: 'knowledge-mixed' };

export function ArticlePage({ doc }: { doc: ContentDoc }) {
  const siblings = getAllDocs().filter((item) => item.section === doc.section);
  const index = siblings.findIndex((item) => item.href === doc.href);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;
  const related = getRelatedDocs(doc);

  return <main className="archive-page">
    <SiteHeader />
    <div className="article-frame">
      <aside className="section-sidebar">
        <Link href={`/${doc.section}`} className="back-link"><ArrowLeft size={14} /> {doc.sectionLabel}目录</Link>
        <p className="sidebar-label">本栏条目</p>
        <nav>{siblings.map((item) => <Link key={item.href} href={item.href} className={item.href === doc.href ? 'active' : ''}>{item.title}</Link>)}</nav>
      </aside>

      <article className="article-main">
        <div className="breadcrumbs"><Link href="/">档案馆</Link><span>/</span><Link href={`/${doc.section}`}>{doc.sectionLabel}</Link><span>/</span><span>{doc.title}</span></div>
        <header className="article-title-block">
          <div className="article-badges"><span className={knowledgeClass[doc.knowledge]}>{doc.knowledgeLabel}</span>{doc.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h1>{doc.title}</h1><p>{doc.summary}</p>
          <div className="permalink"><Link2 size={13} /><span>{doc.href}</span></div>
        </header>

        {doc.spoiler && <div className="spoiler-notice"><AlertTriangle size={19} /><div><strong>世界真相 · 剧透警告</strong><p>本页包含世界内人物尚未知晓的真实机制。</p></div></div>}

        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            h1: ({ children }) => <h2 id={headingId(String(children))}>{children}<a className="heading-anchor" href={`#${headingId(String(children))}`}>#</a></h2>,
            h2: ({ children }) => <h2 id={headingId(String(children))}>{children}<a className="heading-anchor" href={`#${headingId(String(children))}`}>#</a></h2>,
            h3: ({ children }) => <h3 id={headingId(String(children))}>{children}<a className="heading-anchor" href={`#${headingId(String(children))}`}>#</a></h3>,
            a: ({ href, children }) => <a href={href}>{children}</a>,
          }}>{doc.body}</ReactMarkdown>
        </div>

        <nav className="article-pager" aria-label="相邻文章">
          {previous ? <Link href={previous.href}><ArrowLeft size={16} /><span><small>上一篇</small>{previous.title}</span></Link> : <span />}
          {next ? <Link href={next.href}><span><small>下一篇</small>{next.title}</span><ArrowRight size={16} /></Link> : <span />}
        </nav>
        {related.length > 0 && <section className="related-section"><p className="sidebar-label">相关条目</p><div>{related.map((item) => <Link key={item.href} href={item.href}><span>{item.sectionLabel}</span><strong>{item.title}</strong><small>{item.summary}</small></Link>)}</div></section>}
      </article>

      <aside className="toc-sidebar">
        <p className="sidebar-label">本页目录</p>
        <nav>{doc.headings.map((heading, i) => <a className={heading.level === 3 ? 'toc-sub' : ''} key={`${heading.id}-${i}`} href={`#${heading.id}`}>{heading.text}</a>)}</nav>
        <div className="toc-note"><span>固定链接</span><code>{doc.href}</code><p>修改标题不会改变此链接。</p></div>
      </aside>
    </div>
  </main>;
}
