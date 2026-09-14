"use client";

import React from "react";
import { BlogEditorForm } from "@/components/admin/blog/BlogEditorForm";

export default function NewBlogPostPage() {
  return <BlogEditorForm isNew={true} />;
}
