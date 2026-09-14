import React from "react";
import { Metadata } from "next";
import { MachineForm } from "@/components/admin/products/MachineForm";

export const metadata: Metadata = {
  title: "Add New Machine | Admin Portal — Tasneem Knit Industry",
  description: "Create a new circular knitting machine specification listing in English and Bengali.",
};

export default function NewProductAdminPage() {
  return <MachineForm isEditing={false} />;
}
