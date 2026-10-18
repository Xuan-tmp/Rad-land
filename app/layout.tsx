import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '拉德兰世界观档案', template: '%s｜拉德兰世界观档案' },
  description: '浮光笼罩之下，关于拉德兰世界、魔法、历史与文明的完整档案。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
