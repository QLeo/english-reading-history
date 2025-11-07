import { notFound } from 'next/navigation';
import Reader from '@/components/Reader';
import Navigation from '@/components/Navigation';
import TableOfContents from '@/components/TableOfContents';
import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import { parseMarkdown, extractHeadings, addHeadingIds } from '@/lib/markdown';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug.split('/')
  }));
}

export default async function ReadPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse markdown to HTML
  const englishHtml = addHeadingIds(await parseMarkdown(post.englishContent));
  const koreanHtml = post.koreanContent ? addHeadingIds(await parseMarkdown(post.koreanContent)) : '';
  const questionsHtml = post.questions ? await parseMarkdown(post.questions) : '';
  const vocabularyHtml = post.vocabulary ? await parseMarkdown(post.vocabulary) : '';

  // Extract headings for TOC
  const headings = extractHeadings(post.englishContent);

  // Get adjacent posts for navigation
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          {/* Main content */}
          <div>
            <Reader
              post={post}
              englishHtml={englishHtml}
              koreanHtml={koreanHtml}
              questionsHtml={questionsHtml}
              vocabularyHtml={vocabularyHtml}
            />
            <Navigation prev={prev} next={next} />
          </div>

          {/* Sidebar with TOC */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </div>
  );
}
