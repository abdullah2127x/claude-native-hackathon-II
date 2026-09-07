"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-muted-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">TaskCortex</h3>
            <p className="text-sm">
              Modern task management for productive teams.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-foreground transition">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/abdullahqureshi27/TaskCortex" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/abdullahqureshi27/TaskCortex/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/abdullahqureshi27" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://x.com/abdullahqur27" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://abdullah-qureshi.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm">
          <p>
            &copy; {currentYear} TaskCortex. All rights reserved.
          </p>
          <p>
            Designed &amp; Built by{" "}
            <a
              href="https://abdullah-qureshi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Abdullah Qureshi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
