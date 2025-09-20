"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const projects = [
    {
      title: "GPT Project",
      description: "AI-powered GPT application with advanced features",
      href: "/gpt",
      color: "bg-blue-500",
    },
    {
      title: "Landing Page",
      description: "Modern landing page with responsive design",
      href: "/landing",
      color: "bg-green-500",
    },
    {
      title: "Linktree",
      description: "Personal link collection and sharing platform",
      href: "/linktree",
      color: "bg-purple-500",
    },
    {
      title: "카카오톡",
      description: "KakaoTalk-style chat application with modern UI",
      href: "/kakaotalk",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cursor AI Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of AI-powered applications built with Next.js, TypeScript, and modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Link key={index} href={project.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 ${project.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    View Project
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 dark:text-gray-400">
            Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
