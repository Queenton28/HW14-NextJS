import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    res.status(200).json(book);
  } else if (req.method === "PUT") {
    const { title, author, publisher, year, pages } = req.body;
    try {
      const book = await prisma.book.update({
        where: { id: parseInt(id) },
        data: { title, author, publisher, year: parseInt(year), pages: parseInt(pages) },
      });
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ message: "Error updating book" });
    }
  } else if (req.method === "DELETE") {
    try {
      const book = await prisma.book.delete({ where: { id: parseInt(id) } });
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ message: "Error deleting book" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
