import { supabaseAdmin } from "./supabase/supabaseAdmin";

export const DELEGATE_TABLES = [
  "unconfirmed_delegates",
  "activedelegates",
  "active_delegates",
  "passive_delegates",
  "workshop_delegates",
];

export const ID_TO_TABLE = {
  KUNC: "unconfirmed_delegates",
  KAD: "active_delegates",
  KPD: "passive_delegates",
  KWD: "workshop_delegates",
};

export const DEFAULT_DELEGATE_COLUMNS =
  "delegateid,name,email,mobileno,collegename,collegeyear,events,participationtype,paymentconfirmed,screenshotbucketpath,paymentss,upitransactionid,hastopay";

export async function fetchDelegateById(
  delegateId,
  columns = DEFAULT_DELEGATE_COLUMNS
) {
  if (!delegateId) return { delegate: null, table: null, error: null };

  const queries = DELEGATE_TABLES.map((table) =>
    supabaseAdmin
      .from(table)
      .select(columns)
      .eq("delegateid", delegateId)
      .limit(1)
  );

  // Run all queries at once
  const results = await Promise.all(queries);

  for (let i = 0; i < results.length; i++) {
    const { data, error } = results[i];

    if (error) return { delegate: null, table: DELEGATE_TABLES[i], error };

    if (data?.[0]) {
      return { delegate: data[0], table: DELEGATE_TABLES[i], error: null };
    }
  }

  return { delegate: null, table: null, error: null };
}

export async function fetchDelegateWithFilters(
  filters = [],
  columns = DEFAULT_DELEGATE_COLUMNS
) {
  const normalisedFilters = Array.isArray(filters) ? filters : [];

  for (const table of DELEGATE_TABLES) {
    let query = supabaseAdmin.from(table).select(columns).limit(1);

    normalisedFilters.forEach((applyFilter) => {
      if (typeof applyFilter === "function") {
        query = applyFilter(query);
      }
    });

    const { data, error } = await query;

    if (error) {
      return { delegate: null, table, error };
    }

    if (data?.[0]) {
      return { delegate: data[0], table, error: null };
    }
  }

  return { delegate: null, table: null, error: null };
}
