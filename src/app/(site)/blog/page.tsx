"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Oxanium } from "next/font/google";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { getBlogArticles } from "@/actions/articleActions";
import { useState, useEffect, use } from "react";

const oxanium = Oxanium({
  subsets: ["latin"], // Spécifiez les sous-ensembles spéciaux
  display: "swap", // Utilisez l'option display pour améliorer le rendu
});

export default function BlogPage() {
  // const entries = await getBlogArticles();
  // console.log(entries?.includes);

  const [article, setArticle] = useState([] as any[]);
  useEffect(() => {
    getBlogArticles().then((entries) => {
      setArticle(entries?.items || []);
      console.log(entries?.items);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col mt-16">
      <section className="w-full md:h-[50vh] container flex md:flex-row flex-col gap-2 rounded-xl bg-green-500/30 border-2 border-green-500">
        <div className="md:w-1/3 h-full flex items-center">
          <Image
            src="/blog-hero-1.svg"
            width={1500}
            height={1500}
            alt="blog"
          ></Image>
        </div>
        <div className="md:w-2/3 h-full flex items-center">
          <h1 className={`md:text-5xl text-3xl font-bold ${oxanium.className}`}>
            Astuce, conseils et outils gratuits : votre source d’inspiration
            pour réussir chaque étape de vos projets.
          </h1>
        </div>
      </section>

      <section className="container flex flex-col md:flex-row gap-4">
        <aside className="md:w-1/4 bg-green-300">aside</aside>
        <article className="md:w-3/4 flex flex-col gap-4 py-4">
          <div className="w-full flex items-center justify-center">
            <MainArticleCard article={article[0]} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
            {article.map((article) => (
              <ArticleCard key={article?.fields?.id} article={article} />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function MainArticleCard({ article }: { article: any }) {
  console.log(`https:${article?.fields?.featuredImage?.fields?.file?.url}`);
  const [featuredImage, setFeaturedImage] = useState("");

  useEffect(() => {
    setFeaturedImage(
      `https:${article?.fields?.featuredImage?.fields?.file?.url}`
    );
  }, [article]);
  return (
    <Card
      className={`
        bg-cover bg-center relative w-full`}
    >
      <div className="w-full h-2/3 overflow-hidden">
        <Image
          src={featuredImage}
          alt={article?.fields?.title}
          width={1500}
          height={1500}
          className="w-full object-fit rounded-xl"
        />
      </div>
      <div className="w-full h-1/3 flex flex-col gap-4 p-4 absolute bg-violet-500/10 bottom-0 rounded-b-lg backdrop-blur-2xl">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle>{article?.fields?.title}</CardTitle>
            <Link
              href={`/blog/${article?.fields?.slug}`}
              className="text-violet-900 hover:spin-in-45"
            >
              <ArrowUpRight />
            </Link>
          </div>
          <div>
            <p className="text-black">
              {article?.fields?.excerpt?.content[0]?.content[0]?.value}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              {/* <Image
                src={article?.author?.imageUrl}
                alt={`${article?.author?.name} profile picture`}
                width={40}
                height={40}
                className="rounded-full"
              /> */}
              {/* <p className="text-black">{article?.author?.name}</p> */}
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-black">
                <CalendarDays color="black" />
              </div>
              <p className="text-black">{article?.sys?.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Card
      style={{
        backgroundImage: `url(${article?.fields?.featuredImage?.fields?.file?.url})`,
      }}
      className={`
        bg-cover bg-center relative w-full h-96 pt-96`}
    >
      <div className="w-full flex flex-col gap-4 p-4 bg-violet-500/10 absolute bottom-0 rounded-b-lg backdrop-blur-2xl">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle>{article?.fields?.title}</CardTitle>
            <Link
              href={`/blog/${article?.fields?.slug}`}
              className="text-violet-900 hover:spin-in-45"
            >
              <ArrowUpRight />
            </Link>
          </div>
          <div>
            <p className="text-black line-clamp-1 md:line-clamp-2">
              {article?.fields?.excerpt?.content[0]?.content[0]?.value}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 items-center">
              {/* <Image
                src={article?.author?.imageUrl}
                alt={`${article?.author?.name} profile picture`}
                width={30}
                height={30}
                className="rounded-full"
              /> */}
              <p className="text-black line-clamp-1">{article?.author?.name}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-black">
                <CalendarDays color="black" size={16} />
              </div>
              <p className="line-clamp-1">{article?.sys?.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
