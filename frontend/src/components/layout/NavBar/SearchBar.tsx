import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">

      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search..."
        className="w-64 rounded-lg border bg-slate-50 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}