import BookShelf from '@/components/BookShelf';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <BookShelf posts={posts} />
    </div>
  );
}
