import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenText, Compass, History, Orbit, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

const entries = [
  { eyebrow: '世界构型', title: '穹顶之下的四重世界', description: '从地下沉积层到不可触及的浮光边界，认识拉德兰的纵向构造。', href: '/world/world-structure', icon: Orbit },
  { eyebrow: '魔法体系', title: '辉质、光谱与施法', description: '魔法并非恩赐，而是生物对环境中辉质的吸收、编码与释放。', href: '/magic/overview#2-浮光光谱', icon: Sparkles },
  { eyebrow: '认知史', title: '从神迹走向结构', description: '四个时代，四种解释。人类如何一步步接近魔法运行的本质。', href: '/history/magic-cognition', icon: History },
];

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="aurora-field" aria-hidden="true">
          <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="sky-grain" /><div className="horizon-line" />
        </div>
        <div className="hero-copy">
          <p className="kicker">浮光历 · 结构时代</p>
          <h1 id="hero-title">在世界的边界之下，<br /><em>光</em>重写了一切。</h1>
          <p className="hero-intro">拉德兰是一座被浮光封闭的世界。魔法贵族、工业文明与新大陆的发现，正共同将它推向下一次裂变。</p>
          <div className="hero-actions">
            <Link href="/world/overview" className="primary-action">开始阅读 <ArrowRight size={17} /></Link>
            <Link href="/encyclopedia" className="secondary-action"><BookOpenText size={17} /> 浏览百科</Link>
          </div>
        </div>

        <aside className="atlas-card" aria-label="世界速览">
          <div className="atlas-heading"><span>双大陆档案</span><Compass size={18} /></div>
          <div className="world-orbit" aria-hidden="true">
            <span className="continent west">安瑟拉</span><span className="continent east">维吉亚</span>
            <span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /><span className="central-glow" />
          </div>
          <div className="atlas-meta"><span>旧大陆 · 文明核心</span><span>新大陆 · 开发前线</span></div>
        </aside>
      </section>

      <figure className="archive-cover">
        <Image src="/og.png" width={1672} height={941} alt="浮光笼罩下的拉德兰双大陆：安瑟拉与维吉亚" priority />
        <figcaption><span>档案封面 · 双大陆观测图</span><span>安瑟拉 / 中央海 / 维吉亚</span></figcaption>
      </figure>

      <section className="entry-section" aria-labelledby="entry-heading">
        <div className="section-heading">
          <div><p className="kicker">RECOMMENDED PATH</p><h2 id="entry-heading">从三个入口认识拉德兰</h2></div>
          <p>每篇设定都有独立、稳定的链接，方便收藏、分享与互相引用。</p>
        </div>
        <div className="entry-grid">
          {entries.map((entry, index) => {
            const Icon = entry.icon;
            return <Link href={entry.href} className="entry-card" key={entry.href}>
              <span className="entry-number">0{index + 1}</span><Icon className="entry-icon" size={22} />
              <p>{entry.eyebrow}</p><h3>{entry.title}</h3><span className="entry-description">{entry.description}</span>
              <span className="entry-more">阅读条目 <ArrowRight size={15} /></span>
            </Link>;
          })}
        </div>
      </section>
      <footer className="site-footer"><span>拉德兰世界观档案</span><span>公开知识 · 学术推测 · 世界真相</span></footer>
    </main>
  );
}
