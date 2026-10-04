"use client";
import { useEffect, useState } from "react";
import { Trash2, Lock } from "lucide-react";
import { supabase, isSupabaseConfigured, PRODUCT_IMAGES_BUCKET } from "@/lib/supabase";

const ADMIN_PASSWORD = "luxe123";
const AUTH_KEY = "luxe_admin_authed";

const FABRICS = ["Khaddar","Lawn","Cotton","Karandi","Satin","Silk","Velvet","Chiffon","Linen","Organza","Dhanak","Marina","Cambric","Khadi","Jacquard","Wash & Wear","Kurta Cotton"];
const CATEGORIES = ["Women Wear", "Men Wear", "Bedding Essentials"];
const BEDDING_TYPES = ["Bedsheets", "Sofa Covers", "Curtains", "Comforters", "Cushion Covers", "Others"];
const STITCHING = ["Unstitched", "Stitched"];
const SIZES = ["S", "M", "L", "XL", "XXL", "Custom"];

type Row = {
  id: string;
  name: string;
  price: string;
  fabric: string | null;
  description: string | null;
  image_url: string;
  category?: string | null;
  bedding_type?: string | null;
  stitching_type?: string | null;
  sizes?: string | null;
};

const emptyForm = { name: "", price: "", fabric: "Khaddar", description: "", category: "Women Wear", bedding_type: "Bedsheets", stitching_type: "Unstitched" };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  useEffect(() => { if (typeof window!== "undefined" && window.sessionStorage.getItem(AUTH_KEY) === "true") { setAuthed(true); } }, []);
  function handleLogin(e: React.FormEvent) { e.preventDefault(); if (passwordInput === ADMIN_PASSWORD) { window.sessionStorage.setItem(AUTH_KEY, "true"); setAuthed(true); } else { setPasswordError(true); } }
  if (!authed) {
    return (
      <main className="max-w-sm mx-auto px-6 py-24">
        <div className="flex items-center gap-2 mb-6"><Lock size={18} /><h1 className="font-serif text-2xl">Admin Access</h1></div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" autoFocus value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }} placeholder="Admin password" className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm outline-none" />
          {passwordError && <p className="text-xs text-red-600">Incorrect password.</p>}
          <button type="submit" className="w-full py-3 bg-black text-white text-sm">ENTER</button>
        </form>
      </main>
    );
  }
  return <AdminPanel />;
}

function AdminPanel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadRows() {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setRows(data as Row[]);
    setLoading(false);
  }
  useEffect(() => { loadRows(); }, []);
  const toggleSize = (s: string) => { setSelectedSizes(p => p.includes(s)? p.filter(x => x!== s) : [...p, s]); };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setMessage(null);
    if (!supabase) { setMessage({ type: "error", text: "Supabase not connected" }); return; }
    if (!form.name.trim() ||!form.price.trim() ||!file) { setMessage({ type: "error", text: "Name, price, image required" }); return; }
    setSubmitting(true);
    try {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: upErr } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file);
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
      const payload = {
        name: form.name.trim(), price: form.price.trim(), fabric: form.fabric,
        description: form.description.trim() || null, image_url: pub.publicUrl,
        category: form.category, bedding_type: form.category === "Bedding Essentials"? form.bedding_type : null,
        stitching_type: form.category!== "Bedding Essentials"? form.stitching_type : null,
        sizes: form.category!== "Bedding Essentials" && form.stitching_type === "Stitched"? selectedSizes.join(",") : null,
      };
      const { error } = await supabase.from("products").insert([payload]);
      if (error) throw error;
      setMessage({ type: "success", text: "Product added!" }); setForm(emptyForm); setSelectedSizes([]); setFile(null); loadRows();
    } catch (err: any) { setMessage({ type: "error", text: err.message }); } finally { setSubmitting(false); }
  }
  async function handleDelete(id: string) { if (!supabase) return; await supabase.from("products").delete().eq("id", id); setRows(prev => prev.filter(r => r.id!== id)); }

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-10 py-14">
      <h1 className="font-serif text-3xl">Post a New Product</h1>
      {!isSupabaseConfigured && <div className="mt-4 p-4 bg-amber-50 border text-sm">Supabase not connected</div>}
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 bg-white border p-6">
        <div><label className="text-xs">NAME *</label><input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm" /></div>
        <div className="grid grid-cols-2 gap-5">
          <div><label className="text-xs">PRICE (RS.) *</label><input required value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value }))} placeholder="3250" className="mt-1 w-full border px-3 py-2 text-sm" /></div>
          <div><label className="text-xs">CATEGORY *</label><select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm bg-white">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div><label className="text-xs">FABRIC</label><select value={form.fabric} onChange={e => setForm(f => ({...f, fabric: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm bg-white">{FABRICS.map(f => <option key={f}>{f}</option>)}</select></div>
          {form.category === "Bedding Essentials"? (
            <div><label className="text-xs">BEDDING TYPE</label><select value={form.bedding_type} onChange={e => setForm(f => ({...f, bedding_type: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm bg-white">{BEDDING_TYPES.map(b => <option key={b}>{b}</option>)}</select></div>
          ) : (
            <div><label className="text-xs">STITCHING</label><select value={form.stitching_type} onChange={e => setForm(f => ({...f, stitching_type: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm bg-white">{STITCHING.map(s => <option key={s}>{s}</option>)}</select></div>
          )}
        </div>
        {form.category!== "Bedding Essentials" && form.stitching_type === "Stitched" && (
          <div><label className="text-xs">SIZES</label><div className="flex flex-wrap gap-2 mt-1">{SIZES.map(s => <button key={s} type="button" onClick={() => toggleSize(s)} className={`px-3 py-1 border rounded text-sm ${selectedSizes.includes(s)? 'bg-black text-white' : 'bg-white'}`}>{s}</button>)}</div></div>
        )}
        <div><label className="text-xs">DESCRIPTION</label><textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value }))} className="mt-1 w-full border px-3 py-2 text-sm" /></div>
        <div><label className="text-xs">IMAGE *</label><input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0]?? null)} className="mt-1 w-full text-sm" /></div>
        {message && <p className={`text-sm ${message.type === "success"? "text-green-700" : "text-red-600"}`}>{message.text}</p>}
        <button type="submit" disabled={submitting} className="px-7 py-3 bg-black text-white text-sm">{submitting? "POSTING..." : "POST PRODUCT"}</button>
      </form>
      <h2 className="font-serif text-2xl mt-14 mb-5">Live products ({rows.length})</h2>
      {loading? <p>Loading...</p> : <div className="grid gap-3">{rows.map(r => (<div key={r.id} className="flex items-center gap-4 border p-4 bg-white"><img src={r.image_url} alt={r.name} className="w-14 h-14 object-cover" /><div className="flex-1"><p className="text-sm">{r.name}</p><p className="text-xs">{r.category} | {r.fabric} | Rs.{r.price} {r.sizes && `| ${r.sizes}`}</p></div><button onClick={() => handleDelete(r.id)}><Trash2 size={17} /></button></div>))}</div>}
    </main>
  );
}