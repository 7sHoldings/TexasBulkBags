"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  sku: string;
  name: string;
  priceFrom: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tbb-quote-list";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let stored: CartItem[] | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      stored = raw ? (JSON.parse(raw) as CartItem[]) : null;
    } catch {
      // ignore malformed storage
    }
    // Mark hydrated and load stored items in a single state-sync pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setItems(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      add: (item, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.slug === item.slug);
          if (existing) {
            return prev.map((p) =>
              p.slug === item.slug ? { ...p, qty: p.qty + qty } : p,
            );
          }
          return [...prev, { ...item, qty }];
        }),
      setQty: (slug, qty) =>
        setItems((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, qty: Math.max(1, qty) } : p)),
        ),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
