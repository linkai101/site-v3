import fs from "fs";
import path from "path";
import matter from "gray-matter";

const portfilioDir = path.join(process.cwd(), "content", "portfolio");

interface Item {
  slug: string;
  title?: string;
  emoji?: string;
  tags?: string;
  href: string;
  content?: string;
  [key: string]: any;
}

export const getPortfolio = async (): Promise<Item[]> => {
  const slugs: string[] = fs.readdirSync(portfilioDir).filter((s) => {
    return path.extname(s).toLowerCase() === ".mdx";
  });

  const portfolioData = slugs.map((s) => {
    const fullPath: string = path.join(portfilioDir, s);
    const fileContents: string = fs.readFileSync(fullPath, "utf8");
    const { data, content }:
      { 
        data: { [key: string]: any };
        content: string
      }
    = matter(fileContents);

    let date: string = (new Date(data.date?.split(' - ')[0])).toString();
    return {
      slug: s.replace(".mdx", ""),
      href: data.href,
      ...data,
      content,
      date
    };
  });

  return portfolioData;
}