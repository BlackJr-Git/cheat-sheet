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

import { CalendarDays, ArrowUpRight } from "lucide-react";

const blogArticle = [
  {
    id: 1,
    title: "blog 1",
    description:
      "ceci est un blog qui parle de la programmation et de la programmation",
    href: "#",
    date: "4d ago",
    datetime: "2022-01-01",
    category: { name: "Article", href: "#" },
    author: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "blog 2",
    description:
      "ceci est un blog qui parle de la programmation et de la programmation",
    href: "#",
    date: "4d ago",
    datetime: "2022-01-01",
    category: { name: "Article", href: "#" },
    author: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "blog 3",
    description:
      "ceci est un blog qui parle de la programmation et de la programmation",
    href: "#",
    date: "4d ago",
    datetime: "2022-01-01",
    category: { name: "Article", href: "#" },
    author: {
      name: "Lindsay Walton",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col mt-12">
      <section className="w-full h-[50vh] container flex rounded-xl bg-green-500">
        <div className="w-1/2 h-full">bg-red ceci est un blog</div>
        <div className="w-1/2 h-full">bg-blue</div>
      </section>
      <section className="container flex flex-col md:flex-row gap-4">
        <aside className="w-1/4 bg-green-300">aside</aside>
        <article className="md:w-3/4 flex flex-col gap-4">
          <div className="w-full h-1/3 flex items-center justify-center">
            <MainArticleCard article={blogArticle[0]} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
            {blogArticle.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

function MainArticleCard({
  article,
}: {
  article: {
    title: string;
    description: string;
    href: string;
    date: string;
    datetime: string;
    category: { name: string; href: string };
    author: { name: string; imageUrl: string };
  };
}) {
  return (
    <Card
      className={`bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] 
        bg-cover bg-center relative w-full h-80`}
    >
      {/* <CardHeader className="mt-24">
        <CardTitle>Card title</CardTitle>
      </CardHeader> */}

      {/* <CardContent className="text-white">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </CardContent>

      <CardFooter>
        <CardDescription>Card footer</CardDescription>
      </CardFooter> */}

      <div className="w-full flex flex-col gap-4 p-4 bg-violet-500/10 absolute bottom-0 rounded-b-lg backdrop-blur-2xl">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle>{article?.title}</CardTitle>
            <Link href="#" className="text-violet-900 hover:spin-in-45">
              <ArrowUpRight />
            </Link>
          </div>
          <div>
            <p className="text-black">{article?.description}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <Image
                src={article?.author?.imageUrl}
                alt={`${article?.author?.name} profile picture`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-black">{article?.author?.name}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-white">
                <CalendarDays color="white" />
              </div>
              <p className="text-white">{article?.date}</p>
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
      className={`bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] 
        bg-cover bg-center relative w-full h-96 pt-96`}
    >
      <div className="w-full flex flex-col gap-4 p-4 bg-violet-500/10 absolute bottom-0 rounded-b-lg backdrop-blur-2xl">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle>{article?.title}</CardTitle>
            <Link href="#" className="text-violet-900 hover:spin-in-45">
              <ArrowUpRight />
            </Link>
          </div>
          <div>
            <p className="text-black line-clamp-1 md:line-clamp-2">{article?.description}</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 items-center">
              <Image
                src={article?.author?.imageUrl}
                alt={`${article?.author?.name} profile picture`}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="text-black line-clamp-1">{article?.author?.name}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-white">
                <CalendarDays color="white" size={16} />
              </div>
              <p className="text-white line-clamp-1">{article?.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
