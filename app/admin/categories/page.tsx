"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/components/admin/ui/toast";
import { MachineCategoryInfo } from "@/lib/types";

const emptyForm = { id: "", name: "", name_bn: "", slug: "", description: "", description_bn: "", icon: "" };

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<MachineCategoryInfo[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isOpen, setIsOpen] = useState(false);

  const loadCategories = async () => {
    const response = await fetch("/api/admin/categories", { cache: "no-store" });
    const result = await response.json();
    if (response.ok && result.success) setCategories(result.categories);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCategories(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const update = (key: keyof typeof emptyForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const openNew = () => { setForm(emptyForm); setIsOpen(true); };
  const openEdit = (category: MachineCategoryInfo) => setForm({ ...emptyForm, ...category });

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/admin/categories", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (!response.ok || !result.success) { showToast(result.error || "Could not save category.", "error"); return; }
    showToast(form.id ? "Category updated" : "Category created", "success");
    setIsOpen(false);
    await loadCategories();
  };

  const remove = async (category: MachineCategoryInfo) => {
    if (!category.id || !confirm(`Delete ${category.name}?`)) return;
    const response = await fetch("/api/admin/categories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: category.id }) });
    const result = await response.json();
    if (!response.ok || !result.success) { showToast(result.error || "Could not delete category.", "error"); return; }
    await loadCategories();
    showToast("Category deleted", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900">Manage Categories</h1><p className="mt-1 text-sm text-slate-500">Create categories for new machinery types.</p></div>
        <button type="button" onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" /> Add New Category</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => <div key={category.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"><div className="flex items-start justify-between gap-3"><div><h2 className="font-bold text-slate-900">{category.name}</h2><p className="text-xs text-slate-500">/{category.slug}</p>{category.name_bn && <p className="mt-1 text-xs text-slate-600">{category.name_bn}</p>}</div><span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{category.id ? "Database" : "Built-in"}</span></div>{category.id && <div className="mt-4 flex gap-2"><button type="button" onClick={() => { openEdit(category); setIsOpen(true); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold"><Pencil className="h-3 w-3" /> Edit</button><button type="button" onClick={() => void remove(category)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700"><Trash2 className="h-3 w-3" /> Delete</button></div>}</div>)}
      </div>
      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><form onSubmit={save} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">{form.id ? "Edit Category" : "Add New Category"}</h2><button type="button" onClick={() => setIsOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button></div>{([['name','Name (English)'],['name_bn','Name (Bengali)'],['slug','Slug'],['icon','Icon (optional)'],['description','Short description'],['description_bn','Short description (Bengali)']] as const).map(([key, label]) => <label key={key} className="block text-xs font-semibold text-slate-700">{label}<input value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={key === 'slug' ? 'auto-generated-from-name' : ''} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-[#800020]" /></label>)}<button type="submit" className="w-full rounded-xl bg-[#800020] py-3 text-sm font-bold text-white">Save Category</button></form></div>}
    </div>
  );
}
