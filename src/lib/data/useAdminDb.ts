"use client";

import * as React from "react";
import { getDb, resetDb, setDb, updateDb, type AdminDB } from "@/lib/data/admin-store";

export function useAdminDb() {
  const [db, setState] = React.useState<AdminDB>(() => getDb());

  // Sync across tabs
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.includes("omniverse_admin_db_v1")) {
        setState(getDb());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const refresh = React.useCallback(() => setState(getDb()), []);

  const mutate = React.useCallback((fn: (db: AdminDB) => AdminDB) => {
    const next = updateDb(fn);
    setState(next);
    return next;
  }, []);

  const overwrite = React.useCallback((next: AdminDB) => {
    setDb(next);
    setState(next);
  }, []);

  const reset = React.useCallback(() => {
    resetDb();
    setState(getDb());
  }, []);

  return { db, refresh, mutate, overwrite, reset };
}

