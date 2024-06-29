import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } else if (req.method === "POST") {
    upload.single('image')(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });
      const { title, author, publisher, year, pages } = req.body;
      try {
        const book = await prisma.book.create({
          data: {
            title,
            author,
            publisher,
            year: parseInt(year),
            pages: parseInt(pages),
            image: `/uploads/${req.file.filename}`
          },
        });
        res.status(201).json(book);
      } catch (error) {
        res.status(400).json({ message: "Error creating book" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
