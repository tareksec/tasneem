"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { Machine } from "@/lib/types";
import { MachineForm } from "@/components/admin/products/MachineForm";
import { Button } from "@/components/admin/ui/button";

export default function EditMachinePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = AdminStore.getMachineById(id);
      if (found) {
        setMachine(found);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#800020]" />
        <p className="text-xs font-semibold">Loading machine specifications...</p>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200">
        <AlertCircle className="h-12 w-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">Machine Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested machine specifications could not be located or may have been deleted.
        </p>
        <Link href="/admin/products">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Catalog List</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <MachineForm initialMachine={machine} isEditing={true} />;
}
