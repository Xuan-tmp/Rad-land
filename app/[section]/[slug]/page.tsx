import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/article-page';
import { getAllDocs, getDoc } from '@/lib/content';

type Props = { params: Promise<{ section: string; slug: string }> };

export async function generateStaticParams() {
  return getAllDocs().map(({ section, slug }) => ({ section, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);
  return doc ? { title: doc.title, description: doc.summary } : {};
}

export default async function EntryPage({ params }: Props) {
  const { section, slug } = await params;
  const doc = getDoc(section, slug);
  if (!doc) notFound();
  return <ArticlePage doc={doc} />;
}
