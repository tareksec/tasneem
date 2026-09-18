"use client";

import { useEffect, useState } from "react";
import { AdminStore } from "@/lib/admin/admin-store";
import type { GalleryItem } from "@/lib/types";

export function usePublishedProjects() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => {
      try {
        setItems(AdminStore.getGalleryItems().filter((item) => item.published));
      } catch {
        setItems([]);
      }
      setLoaded(true);
    };
    refresh();
    window.addEventListener("tasneem-store-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("tasneem-store-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { items, loaded };
}
