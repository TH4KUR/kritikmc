import { supabaseAdmin } from "./supabase/supabaseAdmin";

export const DELEGATE_TABLES = [
  "unconfirmed_delegates",
  "activedelegates",
  "active_delegates",
  "passive_delegates",
  "workshop_delegates",
];

export const DEFAULT_DELEGATE_COLUMNS =
  "delegateid,name,email,mobileno,collegename,collegeyear,events,participationtype,paymentconfirmed,screenshotbucketpath,paymentss,upitransactionid,hastopay";

export async function fetchDelegateById(
  delegateId,
  columns = DEFAULT_DELEGATE_COLUMNS
) {
  if (!delegateId) {
    return { delegate: null, table: null, error: null };
  }

  for (const table of DELEGATE_TABLES) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select(columns)
      .eq("delegateid", delegateId)
      .limit(1);

    if (error) {
      return { delegate: null, table, error };
    }

    if (data?.[0]) {
      return { delegate: data[0], table, error: null };
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
