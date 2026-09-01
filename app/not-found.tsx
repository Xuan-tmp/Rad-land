import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="not-found"><span>404 · ARCHIVE MISSING</span><h1>这份档案尚不存在</h1><p>链接可能已经失效，或者这篇文本仍处于草稿状态。</p><Link href="/"><ArrowLeft size={16} /> 返回档案馆</Link></main>;
}
