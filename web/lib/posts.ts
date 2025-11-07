import fs from 'fs';
import path from 'path';
import { parseFrontMatter, separateEnglishKorean } from './markdown';
import type { Post, PostMetadata } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllPosts(): PostMetadata[] {
  const posts: PostMetadata[] = [];

  function traverseDirectory(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (item.endsWith('.md') && item !== 'README.md') {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data } = parseFrontMatter(fileContent);

        if (data.title) {
          const relativePath = path.relative(contentDirectory, fullPath);
          const slug = relativePath
            .replace(/\.md$/, '')
            .replace(/\\/g, '/');

          posts.push({
            slug,
            title: data.title,
            date: data.date,
            category: data.category,
            tags: data.tags || [],
            difficulty: data.difficulty,
            level: data.level,
            readingTime: data.readingTime
          });
        }
      }
    }
  }

  if (fs.existsSync(contentDirectory)) {
    traverseDirectory(contentDirectory);
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // Decode URL-encoded slug
    const decodedSlug = decodeURIComponent(slug);
    const filePath = path.join(contentDirectory, `${decodedSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseFrontMatter(fileContent);

    const { englishContent, koreanContent, questions, vocabulary } = separateEnglishKorean(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      difficulty: data.difficulty,
      level: data.level,
      readingTime: data.readingTime,
      content,
      englishContent,
      koreanContent,
      questions,
      vocabulary
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getPostsByCategory(category: string): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function getAdjacentPosts(slug: string): { prev: PostMetadata | null; next: PostMetadata | null } {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === slug);

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  };
}
