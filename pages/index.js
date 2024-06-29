import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStaticProps() {
  const books = await prisma.book.findMany();
  return { props: { books } };
}

export default function Home({ books }) {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <a href={`/book/${book.id}`}>{book.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
