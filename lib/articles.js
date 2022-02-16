import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from 'remove-markdown';

const articlesDir = path.join(process.cwd(), "content", "articles");

export const getPinnedArticlesData = async () => { // get pinned articles
  const pinnedArticlesData = (await getArticlesData()).filter(a => {return a.pinned});
  return pinnedArticlesData;
}

export const getArticlesData = async () => {  // passed to /articles
  const slugs = fs.readdirSync(articlesDir).filter((s) => {
    return path.extname(s).toLowerCase() === ".mdx";
  });

  const allArticlesData = slugs.map((s) => {
    const fullPath = path.join(articlesDir, s);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    let sortDate = (new Date(data.date.split(' - ')[0])).toString();
    let present = data.date.split(' - ')[1]?.toLowerCase() === 'present';

    //let description = removeMd(content.split('.').slice(0,2).join('.') // get first 2 sentences
    //  .concat('', content.split('.').length > 2 ? '.' : '')); // add period back if got cut off

    const frontmatter = {
      ...data,
      //description,
      sortDate,
      present
    };
    return {
      slug: s.replace(".mdx", ""),
      ...frontmatter,
    };
  });

  // Return all posts
  return allArticlesData;
}

export const getArticleSlugs = () => { // getStaticPaths()
  const slugs = fs.readdirSync(articlesDir).filter((s) => {
    return path.extname(s).toLowerCase() === ".mdx";
  });

  return slugs.map((s) => {
    return {
      params: {
        slug: s.replace(".mdx", "")
      }
    };
  });
};

export const getArticleContent = (slug) => { // getStaticProps()
  const fullPath = path.join(articlesDir, `${slug}.mdx`);
  const content = fs.readFileSync(fullPath, "utf8");

  return content;
};