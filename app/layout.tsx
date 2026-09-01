import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '拉德兰世界观档案', template: '%s｜拉德兰世界观档案' },
  description: '浮光笼罩之下，关于拉德兰世界、魔法、历史与文明的完整档案。',
  openGraph: {
    title: '拉德兰世界观档案',
    description: '浮光笼罩之下，世界以新的规则继续运转。',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: '拉德兰世界观档案' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '拉德兰世界观档案',
    description: '浮光笼罩之下，世界以新的规则继续运转。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
