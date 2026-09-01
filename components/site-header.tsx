import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

const nav = [['世界', '/world'], ['魔法', '/magic'], ['历史', '/history'], ['社会', '/society'], ['势力', '/factions'], ['百科', '/encyclopedia']];

export function SiteHeader() {
  return <header className="site-header archive-header">
    <Link href="/" className="brand" aria-label="拉德兰首页">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span><strong>拉德兰</strong><small>RADLAND ARCHIVE</small></span>
    </Link>
    <nav className="desktop-nav" aria-label="主导航">
      {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
    </nav>
    <div className="header-tools">
      <Link href="/search" className="icon-link" aria-label="搜索档案"><Search size={17} /></Link>
      <Link href="/secrets" className="truth-link">世界真相</Link>
      <details className="mobile-menu-wrap">
        <summary className="mobile-menu" aria-label="打开菜单"><Menu size={20} /></summary>
        <div className="mobile-sheet">
          <div className="mobile-sheet-heading"><strong>档案目录</strong><span>选择要浏览的世界观栏目</span></div>
          <nav className="mobile-nav" aria-label="移动端主导航">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/search">搜索档案</Link><Link href="/secrets">世界真相</Link>
          </nav>
        </div>
      </details>
    </div>
  </header>;
}
