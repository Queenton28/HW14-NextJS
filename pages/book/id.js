import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps({ params }) {
  const book = await prisma.book.findUnique({ where: { id: parseInt(params.id) } });
  return { props: { book } };
}

export default function Book({ book }) {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.publisher}</p>
      <p>{book.year}</p>
      <p>{book.pages}</p>
      <img src={book.image} alt={book.title} />
    </div>
  );
}
