// Books authored by Prof. GS Rao. One entry per cover image in public/books/.
//
// These books are shown only to demonstrate Prof. Rao's experience and
// published work. They are NOT for sale on this site. Some are published
// by third parties (the publisher's name/logo appears on the cover itself)
// — never caption these as Prakruthi Publications' own titles, and never
// add a price, buy link, rating, "bestseller" label, or availability claim.
//
// title must be read verbatim from text printed on the cover — never
// invent or guess a title. Do not add a description field; nothing beyond
// what is printed on the cover may be claimed about a book.
//
// An empty list hides the section entirely (see Books.tsx).

export interface Book {
  title: string;
  cover: string;
  alt: string;
  order: number;
}

export const books: Book[] = [
  {
    title: "Educational Psychology (SGT | SA)",
    cover: "/books/educational-psychology-kutty.jpg",
    alt: "Educational Psychology (SGT | SA) book cover by G S Rao, published by Kutty Publications",
    order: 1,
  },
  {
    title: "AP TET-2024 Child Development & Pedagogy — TET Paper I & II",
    cover: "/books/ap-tet-2024-child-development-pedagogy-meqa.jpg",
    alt: "AP TET-2024 Child Development & Pedagogy, TET Paper I & II book cover by G S Rao, published by Meqa Competitive Series",
    order: 2,
  },
  {
    title: "Child Development & Pedagogy — TET I & II",
    cover: "/books/child-development-pedagogy-prakruthi.jpg",
    alt: "Child Development & Pedagogy, TET I & II book cover by G S Rao, published by Prakruthi Publications",
    order: 3,
  },
  {
    title: "Psychology Bit Bank — TET I & II — DSC 2024",
    cover: "/books/psychology-bit-bank-sri-krishi.jpg",
    alt: "Psychology Bit Bank, TET I & II, DSC 2024 book cover by G S Rao, published by Sri Krishi Publications",
    order: 4,
  },
  {
    title: "శిశువికాసం & అధ్యాపనం (Child Development & Pedagogy)",
    cover: "/books/shishu-vikasam-adhyapanam-sri-sri-institute.jpg",
    alt: "Shishu Vikasam & Adhyapanam (Child Development & Pedagogy), 2023 Revised Edition book cover by G S Rao, published by Sri Sri Institute",
    order: 5,
  },
];
