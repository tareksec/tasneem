"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost } from "@/lib/admin/types";
import { BlogEditorForm } from "@/components/admin/blog/BlogEditorForm";
import { Button } from "@/components/admin/ui/button";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = AdminStore.getBlogPostById(id);
      setPost(found || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400">
        <p className="text-sm">Loading article data...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <FileQuestion className="h-12 w-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">Article Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested post could not be located or may have been deleted.
        </p>
        <Link href="/admin/blog">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Blog List</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <BlogEditorForm initialPost={post} isNew={false} />;
}
