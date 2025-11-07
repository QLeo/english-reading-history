import BookShelf from '@/components/BookShelf';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BookShelf posts={posts} />
    </div>
  );
}
